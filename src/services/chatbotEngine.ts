import {
  Intent,
  IntentClassification,
  LeadData,
  ChatState,
  BotResponse,
  ChatMessage,
  ButtonOption,
  QuotationStep,
} from "@/types/chatbot";
import {
  INTENT_KEYWORDS,
  URGENCY_KEYWORDS,
  FRUSTRATION_KEYWORDS,
} from "@/constants/intents";
import {
  FALLBACK_MESSAGES,
  MAIN_MENU_OPTIONS,
  WELCOME_MESSAGE,
  WELCOME_FOLLOW_UP,
} from "@/config/chatbotConfig";
import { v4 as uuidv4 } from "uuid";

// ============================================================================
// MOTOR CONVERSACIONAL - CHATBOT ENGINE
// ============================================================================

/**
 * Clasifica la intención del usuario basándose en su mensaje
 */
export function classifyIntent(userMessage: string): IntentClassification {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // Verificar frustración (trigger inmediato de handoff)
  const hasFrustration = FRUSTRATION_KEYWORDS.some((keyword) =>
    normalizedMessage.includes(keyword)
  );
  if (hasFrustration) {
    return { intent: "contacto_humano", confidence: 1.0 };
  }

  // Buscar coincidencias en keywords para cada intent
  const intentScores: Record<Intent, number> = {} as Record<Intent, number>;

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (intent === "fallback") continue;

    const matches = keywords.filter((keyword) =>
      normalizedMessage.includes(keyword)
    );
    intentScores[intent as Intent] = matches.length;
  }

  // Encontrar el intent con mayor score
  const sortedIntents = Object.entries(intentScores).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA
  );

  const [topIntent, topScore] = sortedIntents[0] || ["fallback", 0];

  // Si no hay matches, es fallback
  if (topScore === 0) {
    return { intent: "fallback" as Intent, confidence: 0 };
  }

  // Calcular confianza basada en número de matches
  const confidence = Math.min(topScore / 3, 1.0);

  return { intent: topIntent as Intent, confidence };
}

/**
 * Extrae entidades del mensaje del usuario
 * NLU básico para capturar números, fechas, etc.
 */
export function extractEntities(message: string): Record<string, string | number> {
  const entities: Record<string, string | number> = {};
  const normalizedMessage = message.toLowerCase();

  // Extraer números (para invitados)
  const numberMatch = message.match(/\d+/);
  if (numberMatch) {
    entities.number = parseInt(numberMatch[0], 10);
  }

  // Detectar meses (para fecha)
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const mesMatch = meses.find((mes) => normalizedMessage.includes(mes));
  if (mesMatch) {
    entities.mes = mesMatch;
  }

  // Detectar año
  const yearMatch = message.match(/20\d{2}/);
  if (yearMatch) {
    entities.year = parseInt(yearMatch[0], 10);
  }

  // Detectar urgencia
  for (const [level, keywords] of Object.entries(URGENCY_KEYWORDS)) {
    if (keywords.some((kw) => normalizedMessage.includes(kw))) {
      entities.urgency = level;
      break;
    }
  }

  return entities;
}

/**
 * Determina qué datos capturar del mensaje según el step actual
 */
export function captureDataFromMessage(
  message: string,
  currentStep: QuotationStep | string,
  entities: Record<string, string | number>
): Partial<LeadData> {
  const capturedData: Partial<LeadData> = {};

  switch (currentStep) {
    case "tipo_evento":
      capturedData.tipo_evento = message;
      break;

    case "fecha":
      // Combinar mes + año si están disponibles
      if (entities.mes && entities.year) {
        capturedData.fecha_evento = `${entities.mes} ${entities.year}`;
      } else if (entities.mes) {
        capturedData.fecha_evento = entities.mes as string;
      } else {
        capturedData.fecha_evento = message;
      }
      break;

    case "ciudad":
      capturedData.ciudad_zona = message;
      break;

    case "invitados":
      if (entities.number) {
        capturedData.invitados_estimados = entities.number as number;
      }
      break;

    case "lugar":
      capturedData.lugar = message;
      break;

    case "necesidad":
      capturedData.necesidad_principal = message;
      break;

    case "estilo":
      capturedData.estilo_deseado = message;
      break;

    case "referencias":
      capturedData.referencias_fotos = message || "Ninguna";
      break;

    case "presupuesto":
      capturedData.presupuesto_rango = message as any;
      break;

    default:
      // Intentar capturar nombre si se detecta
      if (message.toLowerCase().includes("me llamo") || message.toLowerCase().includes("soy")) {
        const nameMatch = message.match(/(?:me llamo|soy)\s+([a-záéíóúñ\s]+)/i);
        if (nameMatch) {
          capturedData.nombre = nameMatch[1].trim();
        }
      }
  }

  // Capturar urgencia si se detectó
  if (entities.urgency) {
    capturedData.urgencia = entities.urgency as any;
  }

  return capturedData;
}

/**
 * Crea un mensaje del bot
 */
export function createBotMessage(
  content: string,
  options?: ButtonOption[]
): ChatMessage {
  return {
    id: uuidv4(),
    type: "bot",
    content,
    timestamp: new Date(),
    options,
  };
}

/**
 * Crea un mensaje del usuario
 */
export function createUserMessage(content: string): ChatMessage {
  return {
    id: uuidv4(),
    type: "user",
    content,
    timestamp: new Date(),
  };
}

/**
 * Genera el mensaje de bienvenida conversacional (SIN MENÚ)
 */
export function generateWelcomeResponse(): BotResponse {
  return {
    messages: [
      createBotMessage(WELCOME_MESSAGE),
      createBotMessage(WELCOME_FOLLOW_UP),
    ],
    nextStep: "tipo_evento", // Ir directo a calificación
  };
}

/**
 * Genera respuesta de fallback cuando no se entiende al usuario
 */
export function generateFallbackResponse(): BotResponse {
  const randomFallback =
    FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];

  // Ofrecer 3 opciones principales
  const quickOptions: ButtonOption[] = [
    MAIN_MENU_OPTIONS[0], // Cotizar
    MAIN_MENU_OPTIONS[1], // Estilos
    MAIN_MENU_OPTIONS[4], // Asesor
  ];

  return {
    messages: [createBotMessage(randomFallback, quickOptions)],
    shouldShowOptions: true,
    options: quickOptions,
  };
}

/**
 * Genera resumen del lead en formato de bullets
 */
export function generateLeadSummary(leadData: LeadData): string {
  const lines: string[] = ["Resumen de tu evento:"];

  if (leadData.tipo_evento) lines.push(`• Tipo: ${leadData.tipo_evento}`);
  if (leadData.fecha_evento) lines.push(`• Fecha: ${leadData.fecha_evento}`);
  if (leadData.ciudad_zona) lines.push(`• Ciudad/zona: ${leadData.ciudad_zona}`);
  if (leadData.invitados_estimados)
    lines.push(`• Invitados: ${leadData.invitados_estimados}`);
  if (leadData.lugar) lines.push(`• Lugar: ${leadData.lugar}`);
  if (leadData.necesidad_principal)
    lines.push(`• Necesidad: ${leadData.necesidad_principal}`);
  if (leadData.estilo_deseado) lines.push(`• Estilo: ${leadData.estilo_deseado}`);
  if (leadData.presupuesto_rango)
    lines.push(`• Presupuesto: ${leadData.presupuesto_rango}`);
  if (leadData.referencias_fotos)
    lines.push(`• Referencias: ${leadData.referencias_fotos}`);

  return lines.join("\n");
}

/**
 * Verifica si el lead tiene datos mínimos para handoff
 */
export function hasMinimumDataForHandoff(leadData: LeadData): boolean {
  return !!(
    leadData.tipo_evento &&
    leadData.fecha_evento &&
    leadData.ciudad_zona
  );
}

/**
 * Determina si se debe hacer handoff basado en el intent y contexto
 */
export function shouldHandoff(
  intent: Intent,
  chatState: ChatState
): boolean {
  // Siempre handoff si pide contacto humano
  if (intent === "contacto_humano") return true;

  // Handoff si está en flujo de handoff
  if (chatState.currentFlow === "handoff_flow") return true;

  // No handoff en otros casos
  return false;
}
