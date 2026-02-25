import { BotResponse, ButtonOption, LeadData } from "@/types/chatbot";
import { createBotMessage } from "@/services/chatbotEngine";
import { chatbotConfig } from "@/config/chatbotConfig";

// ============================================================================
// FLUJOS SECUNDARIOS
// ============================================================================

/**
 * Flujo: Ver estilos / inspiración
 */
export function generateEstilosFlowResponse(): BotResponse {
  const message = createBotMessage(
    "Contame qué buscás y te orientamos: ¿preferís algo más minimalista, cálido-boho, glam o romántico?"
  );

  const options: ButtonOption[] = [
    { id: "style_minimal", label: "Minimalista", value: "Minimalista" },
    { id: "style_boho", label: "Cálido-Boho", value: "Boho" },
    { id: "style_glam", label: "Glam", value: "Glam" },
    { id: "style_romantico", label: "Romántico", value: "Romántico" },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
  };
}

/**
 * Flujo: Disponibilidad por fecha
 */
export function generateDisponibilidadFlowResponse(
  leadData: LeadData
): BotResponse {
  const hasMissingData =
    !leadData.fecha_evento ||
    !leadData.ciudad_zona ||
    !leadData.tipo_evento;

  if (hasMissingData) {
    const message = createBotMessage(
      "Puedo revisar tu fecha, pero para confirmarla necesitamos: fecha + ciudad + tipo de evento. ¿Me los pasás?"
    );
    return {
      messages: [message],
      shouldShowOptions: false,
    };
  }

  // Nunca prometer disponibilidad
  const message = createBotMessage(
    "Perfecto, tengo los datos de tu evento. Lo verificamos y te respondemos por WhatsApp con la disponibilidad exacta. ¿Te parece?"
  );

  const options: ButtonOption[] = [
    {
      id: "disp_whatsapp",
      label: "Sí, contactarme por WhatsApp",
      value: "send_whatsapp",
      action: "open_whatsapp",
    },
    {
      id: "disp_continuar",
      label: "Prefiero cotizar primero",
      value: "cotizar",
      intent: "cotizacion",
    },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
  };
}

/**
 * Flujo: Logística y cobertura
 */
export function generateLogisticaFlowResponse(): BotResponse {
  const hasCobertura = !!chatbotConfig.ciudadesCobertura;
  const hasLogistica = !!chatbotConfig.faqLogistica;
  const hasTiempos = !!chatbotConfig.tiemposRespuesta;

  if (!hasCobertura && !hasLogistica && !hasTiempos) {
    // No hay info cargada - derivar
    const message = createBotMessage(
      "Todavía estoy cargando esa info para confirmártela sin errores. ¿Querés que te derive con un asesor ahora o preferís dejarme tus datos y te respondemos por WhatsApp?"
    );

    const options: ButtonOption[] = [
      {
        id: "log_asesor",
        label: "Hablar con asesor ahora",
        value: "asesor",
        intent: "contacto_humano",
      },
      {
        id: "log_whatsapp",
        label: "Dejar datos para WhatsApp",
        value: "whatsapp",
      },
    ];

    return {
      messages: [createBotMessage(message.content, options)],
      shouldShowOptions: true,
      options,
    };
  }

  // Construir mensaje con info disponible
  const lines: string[] = ["Acá va la info de logística:"];

  if (hasCobertura) {
    lines.push(`\n📍 Cobertura: ${chatbotConfig.ciudadesCobertura}`);
  }

  if (hasLogistica) {
    lines.push(`\n🚚 Logística: ${chatbotConfig.faqLogistica}`);
  }

  if (hasTiempos) {
    lines.push(`\n⏱️ Tiempos: ${chatbotConfig.tiemposRespuesta}`);
  }

  lines.push("\n¿Necesitás algo más?");

  const message = createBotMessage(lines.join(""));

  return {
    messages: [message],
    shouldShowOptions: false,
  };
}

/**
 * Flujo: Consulta general sobre Furnarius
 */
export function generateConsultaGeneralResponse(): BotResponse {
  const message = createBotMessage(
    "Furnarius es una productora y ambientadora de eventos especializada en mobiliario, decoración y estética. Diseñamos experiencias únicas con nuestro mobiliario propio y un equipo creativo dedicado. ¿Querés cotizar tu evento o ver nuestros estilos?"
  );

  const options: ButtonOption[] = [
    {
      id: "gen_cotizar",
      label: "Cotizar mi evento",
      value: "cotizar",
      intent: "cotizacion",
    },
    {
      id: "gen_estilos",
      label: "Ver estilos",
      value: "estilos",
      intent: "catalogo_estilos",
    },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
  };
}
