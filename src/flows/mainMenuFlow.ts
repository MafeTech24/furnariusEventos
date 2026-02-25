import { BotResponse } from "@/types/chatbot";
import { generateWelcomeResponse } from "@/services/chatbotEngine";

// ============================================================================
// FLUJO DEL MENÚ PRINCIPAL
// ============================================================================

/**
 * Genera la respuesta del menú principal
 * Mismo que el welcome, con las 5 opciones principales
 */
export function generateMainMenuResponse(): BotResponse {
  return generateWelcomeResponse();
}

/**
 * Genera mensaje de retorno al menú
 */
export function generateBackToMenuResponse(): BotResponse {
  const welcomeResponse = generateWelcomeResponse();

  // Modificar el mensaje para indicar que es un retorno
  welcomeResponse.messages[0].content =
    "¿En qué más te puedo ayudar? Elegí una opción:";

  return welcomeResponse;
}
