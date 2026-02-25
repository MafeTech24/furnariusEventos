import {
  BotResponse,
  ButtonOption,
  ChatMessage,
  LeadData,
  QuotationStep,
} from "@/types/chatbot";
import { createBotMessage, generateLeadSummary } from "@/services/chatbotEngine";
import { QUOTATION_FLOW_COPY } from "@/config/chatbotConfig";

// ============================================================================
// FLUJO DE COTIZACIÓN - FLOW ESTRELLA
// ============================================================================

/**
 * Opciones para cada paso del flujo de cotización
 */
const QUOTATION_OPTIONS = {
  tipo_evento: [
    { id: "evt_casamiento", label: "Casamiento", value: "Casamiento" },
    { id: "evt_cumple", label: "Cumpleaños", value: "Cumpleaños" },
    { id: "evt_corporativo", label: "Corporativo", value: "Corporativo" },
    { id: "evt_lanzamiento", label: "Lanzamiento", value: "Lanzamiento" },
    { id: "evt_otro", label: "Otro", value: "Otro" },
  ],

  lugar: [
    { id: "loc_salon", label: "Salón", value: "Salón" },
    { id: "loc_casa", label: "Casa", value: "Casa" },
    { id: "loc_aire", label: "Aire libre", value: "Aire libre" },
    { id: "loc_otro", label: "Otro", value: "Otro" },
  ],

  necesidad: [
    { id: "need_mobiliario", label: "Mobiliario", value: "Mobiliario" },
    { id: "need_decoracion", label: "Decoración", value: "Decoración" },
    {
      id: "need_completo",
      label: "Ambientación completa",
      value: "Ambientación completa",
    },
    {
      id: "need_asesoria",
      label: "Asesoría estética",
      value: "Asesoría estética",
    },
  ],

  estilo: [
    { id: "style_minimal", label: "Minimalista", value: "Minimalista" },
    { id: "style_boho", label: "Boho", value: "Boho" },
    { id: "style_glam", label: "Glam", value: "Glam" },
    { id: "style_industrial", label: "Industrial", value: "Industrial" },
    { id: "style_romantico", label: "Romántico", value: "Romántico" },
    { id: "style_nosure", label: "No estoy seguro", value: "No estoy seguro" },
  ],

  presupuesto: [
    { id: "budget_basico", label: "Básico", value: "Básico" },
    { id: "budget_medio", label: "Medio", value: "Medio" },
    { id: "budget_premium", label: "Premium", value: "Premium" },
    {
      id: "budget_whatsapp",
      label: "Prefiero contarlo por WhatsApp",
      value: "Prefiero contarlo por WhatsApp",
    },
  ],
};

/**
 * Obtiene el siguiente paso en el flujo de cotización
 */
export function getNextQuotationStep(
  currentStep: QuotationStep | undefined
): QuotationStep {
  const stepOrder: QuotationStep[] = [
    "tipo_evento",
    "fecha",
    "ciudad",
    "invitados",
    "lugar",
    "necesidad",
    "estilo",
    "referencias",
    "presupuesto",
    "resumen",
  ];

  if (!currentStep) return "tipo_evento";

  const currentIndex = stepOrder.indexOf(currentStep);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= stepOrder.length) return "confirmacion";

  return stepOrder[nextIndex];
}

/**
 * Genera la respuesta para cada paso del flujo de cotización
 */
export function generateQuotationStepResponse(
  step: QuotationStep,
  leadData: LeadData
): BotResponse {
  let message: ChatMessage;
  let options: ButtonOption[] | undefined;

  switch (step) {
    case "tipo_evento":
      message = createBotMessage(
        QUOTATION_FLOW_COPY.start,
        QUOTATION_OPTIONS.tipo_evento
      );
      options = QUOTATION_OPTIONS.tipo_evento;
      break;

    case "fecha":
      message = createBotMessage(QUOTATION_FLOW_COPY.fecha);
      // Sin opciones - input libre
      break;

    case "ciudad":
      message = createBotMessage(QUOTATION_FLOW_COPY.ciudad);
      // Sin opciones - input libre
      break;

    case "invitados":
      message = createBotMessage(QUOTATION_FLOW_COPY.invitados);
      // Sin opciones - input libre (número)
      break;

    case "lugar":
      message = createBotMessage(
        QUOTATION_FLOW_COPY.lugar,
        QUOTATION_OPTIONS.lugar
      );
      options = QUOTATION_OPTIONS.lugar;
      break;

    case "necesidad":
      message = createBotMessage(
        QUOTATION_FLOW_COPY.necesidad,
        QUOTATION_OPTIONS.necesidad
      );
      options = QUOTATION_OPTIONS.necesidad;
      break;

    case "estilo":
      message = createBotMessage(
        QUOTATION_FLOW_COPY.estilo,
        QUOTATION_OPTIONS.estilo
      );
      options = QUOTATION_OPTIONS.estilo;
      break;

    case "referencias":
      message = createBotMessage(QUOTATION_FLOW_COPY.referencias);
      // Opción de skip
      options = [
        { id: "ref_skip", label: "Omitir este paso", value: "Ninguna" },
      ];
      break;

    case "presupuesto":
      message = createBotMessage(
        QUOTATION_FLOW_COPY.presupuesto,
        QUOTATION_OPTIONS.presupuesto
      );
      options = QUOTATION_OPTIONS.presupuesto;
      break;

    case "resumen":
      const summary = generateLeadSummary(leadData);
      const summaryMessage = `${QUOTATION_FLOW_COPY.resumen}\n\n${summary}\n\n¿Querés que lo enviemos al equipo por WhatsApp para cotizar más rápido?`;
      message = createBotMessage(summaryMessage);
      options = [
        {
          id: "summary_send",
          label: "Sí, enviar por WhatsApp",
          value: "send_whatsapp",
          action: "open_whatsapp",
        },
        {
          id: "summary_edit",
          label: "Agregar un dato",
          value: "edit_data",
        },
        {
          id: "summary_asesor",
          label: "Hablar con asesor",
          value: "asesor",
          intent: "contacto_humano",
        },
      ];
      break;

    default:
      message = createBotMessage("Continuemos con tu cotización.");
  }

  return {
    messages: [message],
    shouldShowOptions: !!options,
    options,
    nextStep: getNextQuotationStep(step),
  };
}

/**
 * Inicia el flujo de cotización
 */
export function startQuotationFlow(): BotResponse {
  return generateQuotationStepResponse("tipo_evento", {});
}
