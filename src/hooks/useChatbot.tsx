import { useState, useCallback, useEffect } from "react";
import {
  ChatState,
  ChatMessage,
  LeadData,
  BotResponse,
  Intent,
  QuotationStep,
} from "@/types/chatbot";
import {
  classifyIntent,
  extractEntities,
  captureDataFromMessage,
  createUserMessage,
  generateWelcomeResponse,
  generateFallbackResponse,
  shouldHandoff,
} from "@/services/chatbotEngine";
import { startQuotationFlow, generateQuotationStepResponse, getNextQuotationStep } from "@/flows/quotationFlow";
import {
  generateEstilosFlowResponse,
  generateDisponibilidadFlowResponse,
  generateLogisticaFlowResponse,
  generateConsultaGeneralResponse,
} from "@/flows/secondaryFlows";
import { generateFaqResponse } from "@/flows/faqFlow";
import { startHandoffFlow } from "@/flows/handoffFlow";
import { generateBackToMenuResponse } from "@/flows/mainMenuFlow";
import { saveLeadData, saveChatState, clearChatData } from "@/utils/leadStorage";
import { openWhatsApp } from "@/services/whatsappService";
import { CHATBOT_LIMITS } from "@/config/chatbotConfig";

// ============================================================================
// CUSTOM HOOK - useChatbot
// ============================================================================

/**
 * Hook principal del chatbot
 * Maneja todo el estado conversacional y la lógica de flujos
 */
export function useChatbot() {
  // Estado inicial
  const [chatState, setChatState] = useState<ChatState>({
    currentFlow: "idle",
    currentStep: undefined,
    leadData: {},
    conversationHistory: [],
    awaitingInput: false,
    context: {},
  });

  const [isTyping, setIsTyping] = useState(false);

  // Inicializar conversación con mensaje de bienvenida conversacional
  useEffect(() => {
    if (chatState.currentFlow === "idle" && chatState.conversationHistory.length === 0) {
      const welcomeResponse = generateWelcomeResponse();
      setChatState((prev) => ({
        ...prev,
        currentFlow: "cotizacion_flow", // Ir directo al flujo de cotización
        currentStep: "tipo_evento", // Primer paso
        conversationHistory: welcomeResponse.messages,
        awaitingInput: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  // Persistir estado en localStorage
  useEffect(() => {
    if (chatState.conversationHistory.length > 0) {
      saveChatState(chatState);
      saveLeadData(chatState.leadData);
    }
  }, [chatState]);

  /**
   * Simula el indicador de "escribiendo..."
   */
  const simulateTyping = useCallback(async () => {
    setIsTyping(true);
    await new Promise((resolve) =>
      setTimeout(resolve, CHATBOT_LIMITS.typingIndicatorDuration)
    );
    setIsTyping(false);
  }, []);

  /**
   * Agrega mensajes al historial
   */
  const addMessages = useCallback((messages: ChatMessage[]) => {
    setChatState((prev) => ({
      ...prev,
      conversationHistory: [
        ...prev.conversationHistory.slice(-CHATBOT_LIMITS.maxHistoryMessages),
        ...messages,
      ],
    }));
  }, []);

  /**
   * Actualiza datos del lead
   */
  const updateLeadData = useCallback((newData: Partial<LeadData>) => {
    setChatState((prev) => ({
      ...prev,
      leadData: {
        ...prev.leadData,
        ...newData,
      },
    }));
  }, []);

  /**
   * Procesa la respuesta del bot y actualiza el estado
   */
  const processBotResponse = useCallback(
    (response: BotResponse) => {
      addMessages(response.messages);

      setChatState((prev) => ({
        ...prev,
        currentStep: response.nextStep as QuotationStep | undefined,
        awaitingInput: true,
      }));

      // Capturar datos si vienen en la respuesta
      if (response.capturedData) {
        updateLeadData(response.capturedData);
      }

      // Handoff si es necesario
      if (response.shouldHandoff) {
        setChatState((prev) => ({ ...prev, currentFlow: "handoff_flow" }));
      }
    },
    [addMessages, updateLeadData]
  );

  /**
   * Maneja el input del usuario
   */
  const handleUserInput = useCallback(
    async (userMessage: string, selectedIntent?: Intent, action?: string) => {
      console.log('[Chatbot] Usuario envió:', userMessage);
      
      // Agregar mensaje del usuario al historial
      const userMsg = createUserMessage(userMessage);
      addMessages([userMsg]);

      setChatState((prev) => ({ ...prev, awaitingInput: false }));

      // Simular typing
      await simulateTyping();

      // Clasificar intención si no viene predefinida
      const intent = selectedIntent || classifyIntent(userMessage).intent;
      console.log('[Chatbot] Intent detectado:', intent);

      // Extraer entidades del mensaje
      const entities = extractEntities(userMessage);
      console.log('[Chatbot] Entidades extraídas:', entities);

      // Capturar datos según el step actual
      if (chatState.currentStep) {
        const capturedData = captureDataFromMessage(
          userMessage,
          chatState.currentStep,
          entities
        );
        updateLeadData(capturedData);
      }

      // Acciones especiales
      if (action === "open_whatsapp") {
        openWhatsApp(chatState.leadData);
        const confirmMsg = createUserMessage(
          "Perfecto, gracias por tu consulta. Te contactaremos pronto."
        );
        addMessages([confirmMsg]);
        return;
      }

      // Verificar si debe hacer handoff
      if (shouldHandoff(intent, chatState)) {
        const response = startHandoffFlow(chatState.leadData);
        processBotResponse(response);
        return;
      }

      // Determinar qué flujo seguir según el intent
      let response: BotResponse;

      switch (intent) {
        case "cotizacion":
          if (chatState.currentFlow === "cotizacion_flow" && chatState.currentStep) {
            // Continuar flujo de cotización
            const nextStep = getNextQuotationStep(chatState.currentStep as QuotationStep);
            response = generateQuotationStepResponse(nextStep, chatState.leadData);
          } else {
            // Iniciar flujo de cotización
            response = startQuotationFlow();
            setChatState((prev) => ({ ...prev, currentFlow: "cotizacion_flow" }));
          }
          break;

        case "catalogo_estilos":
          response = generateEstilosFlowResponse();
          setChatState((prev) => ({ ...prev, currentFlow: "estilos_flow" }));
          break;

        case "disponibilidad":
          response = generateDisponibilidadFlowResponse(chatState.leadData);
          setChatState((prev) => ({ ...prev, currentFlow: "disponibilidad_flow" }));
          break;

        case "logistica":
        case "zonas_cobertura":
          response = generateLogisticaFlowResponse();
          setChatState((prev) => ({ ...prev, currentFlow: "logistica_flow" }));
          break;

        case "faq":
          response = generateFaqResponse();
          setChatState((prev) => ({ ...prev, currentFlow: "faq_flow" }));
          break;

        case "consulta_general":
          response = generateConsultaGeneralResponse();
          break;

        case "contacto_humano":
          response = startHandoffFlow(chatState.leadData);
          setChatState((prev) => ({ ...prev, currentFlow: "handoff_flow" }));
          break;

        case "fallback":
        default:
          response = generateFallbackResponse();
          break;
      }

      // Si el usuario dice "menu" o "volver", regresar al menú principal
      if (userMessage.toLowerCase().includes("menu") || userMessage.toLowerCase().includes("volver")) {
        response = generateBackToMenuResponse();
        setChatState((prev) => ({ ...prev, currentFlow: "menu_principal", currentStep: undefined }));
      }

      console.log('[Chatbot] Generando respuesta...', response);
      processBotResponse(response);
    },
    [
      chatState,
      addMessages,
      simulateTyping,
      updateLeadData,
      processBotResponse,
    ]
  );

  /**
   * Reinicia la conversación
   */
  const resetChat = useCallback(() => {
    clearChatData();
    setChatState({
      currentFlow: "idle",
      currentStep: undefined,
      leadData: {},
      conversationHistory: [],
      awaitingInput: false,
      context: {},
    });
  }, []);

  return {
    messages: chatState.conversationHistory,
    leadData: chatState.leadData,
    isTyping,
    awaitingInput: chatState.awaitingInput,
    currentFlow: chatState.currentFlow,
    handleUserInput,
    resetChat,
  };
}
