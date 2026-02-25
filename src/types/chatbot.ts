// ============================================================================
// CHATBOT TYPE DEFINITIONS
// ============================================================================

/**
 * Intenciones del chatbot (Intents)
 * Clasificación de la intención del usuario basada en su mensaje
 */
export type Intent =
  | "consulta_general"
  | "cotizacion"
  | "disponibilidad"
  | "tipos_eventos"
  | "catalogo_estilos"
  | "logistica"
  | "zonas_cobertura"
  | "contacto_humano"
  | "faq"
  | "reprogramacion"
  | "seguimiento"
  | "fallback";

/**
 * Tipos de eventos que maneja Furnarius
 */
export type EventType =
  | "Casamiento"
  | "Cumpleaños"
  | "Corporativo"
  | "Lanzamiento"
  | "Otro";

/**
 * Tipos de lugar del evento
 */
export type VenueType = "Salón" | "Casa" | "Aire libre" | "Otro";

/**
 * Necesidad principal del cliente
 */
export type MainNeed =
  | "Mobiliario"
  | "Decoración"
  | "Ambientación completa"
  | "Asesoría estética";

/**
 * Estilos de decoración disponibles
 */
export type DecorStyle =
  | "Minimalista"
  | "Boho"
  | "Glam"
  | "Industrial"
  | "Romántico"
  | "No estoy seguro";

/**
 * Rangos de presupuesto (sin valores específicos)
 */
export type BudgetRange =
  | "Básico"
  | "Medio"
  | "Premium"
  | "Prefiero contarlo por WhatsApp"
  | "No especificado";

/**
 * Nivel de urgencia del lead
 */
export type UrgencyLevel = "baja" | "media" | "alta";

/**
 * Canal de contacto preferido
 */
export type ContactPreference = "whatsapp" | "llamada" | "email";

/**
 * Datos del lead capturados durante la conversación
 * Se van completando progresivamente
 */
export interface LeadData {
  // Información básica
  nombre?: string;
  telefono?: string;
  email?: string;

  // Detalles del evento
  tipo_evento?: EventType | string;
  fecha_evento?: string; // Puede ser fecha exacta o "junio 2026"
  ciudad_zona?: string;
  invitados_estimados?: number;
  lugar?: VenueType | string;

  // Necesidades y preferencias
  necesidad_principal?: MainNeed | string;
  estilo_deseado?: DecorStyle | string;
  presupuesto_rango?: BudgetRange;
  referencias_fotos?: string; // URLs, descripciones o "ninguna"

  // Metadata
  urgencia?: UrgencyLevel;
  preferencia_contacto?: ContactPreference;
  consentimiento_contacto?: boolean;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

/**
 * Estado del flujo conversacional
 */
export type FlowState =
  | "idle" // Sin conversación activa
  | "menu_principal" // En el menú principal
  | "cotizacion_flow" // En flujo de cotización
  | "estilos_flow" // En flujo de estilos
  | "disponibilidad_flow" // En flujo de disponibilidad
  | "logistica_flow" // En flujo de logística
  | "faq_flow" // En flujo de FAQs
  | "handoff_flow" // Derivando a humano
  | "completed"; // Flujo completado

/**
 * Paso actual dentro del flujo de cotización
 */
export type QuotationStep =
  | "tipo_evento"
  | "fecha"
  | "ciudad"
  | "invitados"
  | "lugar"
  | "necesidad"
  | "estilo"
  | "referencias"
  | "presupuesto"
  | "resumen"
  | "confirmacion";

/**
 * Estado de la conversación
 */
export interface ChatState {
  currentFlow: FlowState;
  currentStep?: QuotationStep | string;
  leadData: LeadData;
  conversationHistory: ChatMessage[];
  lastIntent?: Intent;
  awaitingInput: boolean;
  context: Record<string, unknown>; // Contexto adicional flexible
}

/**
 * Tipo de mensaje en el chat
 */
export type MessageType = "user" | "bot" | "system";

/**
 * Estructura de un mensaje del chat
 */
export interface ChatMessage {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  options?: ButtonOption[]; // Opciones de respuesta rápida
  metadata?: Record<string, unknown>;
}

/**
 * Opción de botón para respuestas rápidas
 */
export interface ButtonOption {
  id: string;
  label: string;
  value: string | number;
  intent?: Intent;
  action?: string; // Acción especial (ej: "open_whatsapp", "show_summary")
}

/**
 * Respuesta del motor conversacional
 */
export interface BotResponse {
  messages: ChatMessage[];
  shouldShowOptions?: boolean; // Ahora es opcional
  options?: ButtonOption[];
  nextStep?: QuotationStep | string;
  shouldHandoff?: boolean; // Si debe derivar a humano
  capturedData?: Partial<LeadData>; // Datos extraídos del mensaje del usuario
}

/**
 * Configuración de variables del chatbot
 */
export interface ChatbotConfig {
  // Información del negocio
  whatsappNumber: string;
  asesorName: string;

  // Variables de FAQs (placeholders)
  ciudadesCobertura?: string;
  tiemposRespuesta?: string;
  linkCatalogo?: string;
  linkInstagram?: string;

  // FAQs específicas
  faqPagos?: string;
  faqReserva?: string;
  faqCancelaciones?: string;
  faqLogistica?: string;
  faqCobertura?: string;
  faqTiempos?: string;
}

/**
 * Resultado de la clasificación de intención
 */
export interface IntentClassification {
  intent: Intent;
  confidence: number; // 0-1
  entities?: Record<string, string | number>; // Entidades extraídas
}
