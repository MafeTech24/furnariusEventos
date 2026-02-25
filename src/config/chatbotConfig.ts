import { ChatbotConfig, ButtonOption } from "@/types/chatbot";

// ============================================================================
// CONFIGURACIÓN CENTRALIZADA DEL CHATBOT
// ============================================================================

/**
 * Configuración del chatbot Furnarius
 * Todas las variables editables están centralizadas aquí
 */
export const chatbotConfig: ChatbotConfig = {
  // ========================================
  // INFORMACIÓN DEL NEGOCIO
  // ========================================
  whatsappNumber: "1111111111", // TEMPORAL PARA VIDEO: 111-1111111
  asesorName: "Equipo Furnarius",

  // ========================================
  // PLACEHOLDERS DE FAQs
  // ========================================
  // Estos campos se completarán cuando el dueño proporcione la info
  ciudadesCobertura: undefined,
  tiemposRespuesta: undefined,
  linkCatalogo: undefined,
  linkInstagram: undefined,

  faqPagos: undefined,
  faqReserva: undefined,
  faqCancelaciones: undefined,
  faqLogistica: undefined,
  faqCobertura: undefined,
  faqTiempos: undefined,
};

/**
 * Mensajes de bienvenida conversacionales (SIN MENÚ)
 */
export const WELCOME_MESSAGE =
  "¡Hola! 👋 Soy el asistente virtual de Furnarius. Estoy acá para ayudarte a planificar tu evento y conseguir una cotización personalizada.";

export const WELCOME_FOLLOW_UP = "Contame, ¿qué tipo de evento estás planeando?";

/**
 * Opciones del menú principal (mantenidas para fallback, pero no se muestran en bienvenida)
 */
export const MAIN_MENU_OPTIONS: ButtonOption[] = [
  {
    id: "opt_cotizar",
    label: "Cotizar mi evento",
    value: "cotizar",
    intent: "cotizacion",
  },
  {
    id: "opt_estilos",
    label: "Ver estilos / inspiración",
    value: "estilos",
    intent: "catalogo_estilos",
  },
  {
    id: "opt_disponibilidad",
    label: "Disponibilidad por fecha",
    value: "disponibilidad",
    intent: "disponibilidad",
  },
  {
    id: "opt_logistica",
    label: "Logística y cobertura",
    value: "logistica",
    intent: "logistica",
  },
  {
    id: "opt_humano",
    label: "Hablar con un asesor",
    value: "asesor",
    intent: "contacto_humano",
  },
];

/**
 * Mensajes de fallback cuando no se entiende la intención
 */
export const FALLBACK_MESSAGES = [
  "No estoy seguro de entenderte. ¿Podrías reformular tu pregunta?",
  "Disculpa, no logro interpretar eso. ¿Querés que te ayude con alguna de estas opciones?",
  "Mmm, no estoy captando bien tu consulta. Tal vez pueda ayudarte mejor si elegís una opción:",
];

/**
 * Límites y reglas del chatbot
 */
export const CHATBOT_LIMITS = {
  // El bot NO debe inventar estos datos
  noInventar: ["precios", "disponibilidad", "políticas", "condiciones contractuales"],

  // Máximo de emojis por mensaje
  maxEmojisPerMessage: 1,

  // Tiempo de simulación de "escribiendo..." (ms)
  typingIndicatorDuration: 800,

  // Número máximo de mensajes en historial (para performance)
  maxHistoryMessages: 100,
};

/**
 * Mensajes de handoff (derivación a humano)
 */
export const HANDOFF_MESSAGES = {
  initiating: "Perfecto, te conecto con un asesor. Déjame confirmar algunos datos antes.",
  missingData:
    "Para que el asesor pueda ayudarte mejor, necesito algunos datos rápidos:",
  readyToHandoff:
    "Listo. ¿Querés que te contactemos por WhatsApp? Te paso tu consulta directo al equipo.",
};

/**
 * Copy específico para el flujo de cotización
 */
export const QUOTATION_FLOW_COPY = {
  start: "Genial. ¿Qué tipo de evento es?",
  fecha: "¿Para qué fecha es? (si no la tenés exacta, decime el mes aproximado)",
  ciudad: "¿En qué ciudad/zona sería el evento?",
  invitados: "¿Cuántos invitados estimás?",
  lugar: "¿Dónde es el evento?",
  necesidad: "¿Qué necesitás principalmente?",
  estilo: "¿Qué estilo te gusta?",
  referencias:
    "Si tenés fotos o referencias, describímelas o pegá links. Con eso afinamos mucho la propuesta.",
  presupuesto: "¿Tenés un rango de presupuesto estimado?",
  resumen: "Perfecto. Con esto ya puedo armarte una propuesta inicial.",
};

/**
 * Placeholder para FAQs no cargadas
 */
export const FAQ_NOT_LOADED_MESSAGE =
  "Todavía estoy cargando esa info para confirmártela sin errores. ¿Querés que te derive con un asesor ahora o preferís dejarme tus datos y te respondemos por WhatsApp?";
