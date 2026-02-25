import { BotResponse, ButtonOption, LeadData } from "@/types/chatbot";
import { createBotMessage, hasMinimumDataForHandoff } from "@/services/chatbotEngine";
import { HANDOFF_MESSAGES } from "@/config/chatbotConfig";

// ============================================================================
// FLUJO DE HANDOFF (Derivación a Humano)
// ============================================================================

/**
 * Inicia el flujo de handoff (derivación a asesor humano)
 */
export function startHandoffFlow(leadData: LeadData): BotResponse {
  const hasMinData = hasMinimumDataForHandoff(leadData);

  if (hasMinData) {
    // Ya tiene datos mínimos, ofrecer WhatsApp directo
    const message = createBotMessage(HANDOFF_MESSAGES.readyToHandoff);

    const options: ButtonOption[] = [
      {
        id: "handoff_whatsapp",
        label: "Sí, contactar por WhatsApp",
        value: "send_whatsapp",
        action: "open_whatsapp",
      },
      {
        id: "handoff_cotizar",
        label: "Antes quiero cotizar",
        value: "cotizar",
        intent: "cotizacion",
      },
    ];

    return {
      messages: [createBotMessage(message.content, options)],
      shouldShowOptions: true,
      options,
      shouldHandoff: true,
    };
  }

  // Faltan datos mínimos
  const message = createBotMessage(
    `${HANDOFF_MESSAGES.initiating}\n\n${HANDOFF_MESSAGES.missingData}`
  );

  return {
    messages: [message],
    shouldShowOptions: false,
    shouldHandoff: true,
  };
}

/**
 * Pregunta por datos faltantes para handoff
 */
export function askForMissingHandoffData(leadData: LeadData): BotResponse {
  const missingFields: string[] = [];

  if (!leadData.nombre) missingFields.push("tu nombre");
  if (!leadData.tipo_evento) missingFields.push("tipo de evento");
  if (!leadData.fecha_evento) missingFields.push("fecha del evento");
  if (!leadData.ciudad_zona) missingFields.push("ciudad o zona");

  if (missingFields.length === 0) {
    // Ya tiene todo, proceder a handoff
    return startHandoffFlow(leadData);
  }

  const missingText = missingFields.join(", ");
  const message = createBotMessage(
    `Para conectarte con un asesor, necesito que me digas: ${missingText}.`
  );

  return {
    messages: [message],
    shouldShowOptions: false,
  };
}

/**
 * Genera respuesta cuando se detecta frustración
 */
export function generateFrustrationHandoffResponse(): BotResponse {
  const message = createBotMessage(
    "Entiendo, déjame conectarte con un asesor que puede ayudarte mejor. ¿Preferís que te contactemos por WhatsApp?"
  );

  const options: ButtonOption[] = [
    {
      id: "frust_whatsapp",
      label: "Sí, por WhatsApp",
      value: "send_whatsapp",
      action: "open_whatsapp",
    },
    {
      id: "frust_continuar",
      label: "Seguir con el asistente",
      value: "menu",
    },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
    shouldHandoff: true,
  };
}
