import { BotResponse, ButtonOption } from "@/types/chatbot";
import { createBotMessage } from "@/services/chatbotEngine";
import { chatbotConfig, FAQ_NOT_LOADED_MESSAGE } from "@/config/chatbotConfig";

// ============================================================================
// FLUJO DE FAQs MODULARES
// ============================================================================

/**
 * Genera respuesta para FAQs
 */
export function generateFaqResponse(): BotResponse {
  const hasPagos = !!chatbotConfig.faqPagos;
  const hasReserva = !!chatbotConfig.faqReserva;
  const hasCancelaciones = !!chatbotConfig.faqCancelaciones;
  const hasLogistica = !!chatbotConfig.faqLogistica;
  const hasCobertura = !!chatbotConfig.faqCobertura;
  const hasTiempos = !!chatbotConfig.faqTiempos;

  const hasAnyFaq =
    hasPagos ||
    hasReserva ||
    hasCancelaciones ||
    hasLogistica ||
    hasCobertura ||
    hasTiempos;

  if (!hasAnyFaq) {
    // Sin FAQs cargadas
    const message = createBotMessage(FAQ_NOT_LOADED_MESSAGE);

    const options: ButtonOption[] = [
      {
        id: "faq_asesor",
        label: "Hablar con asesor",
        value: "asesor",
        intent: "contacto_humano",
      },
      {
        id: "faq_whatsapp",
        label: "Dejar datos por WhatsApp",
        value: "whatsapp",
      },
    ];

    return {
      messages: [createBotMessage(message.content, options)],
      shouldShowOptions: true,
      options,
    };
  }

  // Construir mensaje con FAQs disponibles
  const lines: string[] = ["Estas son las consultas más comunes:"];

  if (hasPagos) {
    lines.push(`\n💳 Pagos: ${chatbotConfig.faqPagos}`);
  }

  if (hasReserva) {
    lines.push(`\n📝 Reserva: ${chatbotConfig.faqReserva}`);
  }

  if (hasCancelaciones) {
    lines.push(`\n❌ Cancelaciones: ${chatbotConfig.faqCancelaciones}`);
  }

  if (hasLogistica) {
    lines.push(`\n🚚 Logística: ${chatbotConfig.faqLogistica}`);
  }

  if (hasCobertura) {
    lines.push(`\n📍 Cobertura: ${chatbotConfig.faqCobertura}`);
  }

  if (hasTiempos) {
    lines.push(`\n⏱️ Tiempos: ${chatbotConfig.faqTiempos}`);
  }

  lines.push(
    "\n\nSi querés, te derivo con un asesor para confirmarlo con exactitud."
  );

  const message = createBotMessage(lines.join(""));

  const options: ButtonOption[] = [
    {
      id: "faq_asesor",
      label: "Hablar con asesor",
      value: "asesor",
      intent: "contacto_humano",
    },
    {
      id: "faq_volver",
      label: "Volver al menú",
      value: "menu",
    },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
  };
}

/**
 * Respuesta específica cuando se pregunta por pagos
 */
export function generatePagosResponse(): BotResponse {
  if (!chatbotConfig.faqPagos) {
    return generateFaqNotLoadedResponse("pagos");
  }

  const message = createBotMessage(
    `Sobre métodos de pago:\n\n${chatbotConfig.faqPagos}`
  );

  return {
    messages: [message],
    shouldShowOptions: false,
  };
}

/**
 * Respuesta específica cuando se pregunta por reservas
 */
export function generateReservaResponse(): BotResponse {
  if (!chatbotConfig.faqReserva) {
    return generateFaqNotLoadedResponse("reservas");
  }

  const message = createBotMessage(
    `Sobre reservas y señas:\n\n${chatbotConfig.faqReserva}`
  );

  return {
    messages: [message],
    shouldShowOptions: false,
  };
}

/**
 * Respuesta específica cuando se pregunta por cancelaciones
 */
export function generateCancelacionesResponse(): BotResponse {
  if (!chatbotConfig.faqCancelaciones) {
    return generateFaqNotLoadedResponse("cancelaciones");
  }

  const message = createBotMessage(
    `Sobre cancelaciones:\n\n${chatbotConfig.faqCancelaciones}`
  );

  return {
    messages: [message],
    shouldShowOptions: false,
  };
}

/**
 * Respuesta cuando una FAQ específica no está cargada
 */
function generateFaqNotLoadedResponse(topic: string): BotResponse {
  const message = createBotMessage(FAQ_NOT_LOADED_MESSAGE);

  const options: ButtonOption[] = [
    {
      id: `faq_${topic}_asesor`,
      label: "Hablar con asesor",
      value: "asesor",
      intent: "contacto_humano",
    },
    {
      id: `faq_${topic}_whatsapp`,
      label: "Dejar datos por WhatsApp",
      value: "whatsapp",
    },
  ];

  return {
    messages: [createBotMessage(message.content, options)],
    shouldShowOptions: true,
    options,
  };
}
