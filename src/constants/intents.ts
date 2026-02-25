import { Intent } from "@/types/chatbot";

// ============================================================================
// MAPEO DE KEYWORDS A INTENCIONES
// ============================================================================

/**
 * Keywords para clasificación de intenciones
 * Cada intent tiene un array de palabras/frases clave que lo activan
 */
export const INTENT_KEYWORDS: Record<Intent, string[]> = {
  consulta_general: [
    "qué hace furnarius",
    "qué hacen",
    "servicios",
    "sobre ustedes",
    "quiénes son",
    "información",
    "me pueden contar",
  ],

  cotizacion: [
    "cotizar",
    "cotización",
    "presupuesto",
    "precio",
    "cuánto cuesta",
    "cuanto cuesta",
    "cuánto sale",
    "cuanto sale",
    "valor",
    "tarifa",
    "quiero contratar",
    "necesito",
  ],

  disponibilidad: [
    "disponibilidad",
    "disponible",
    "fecha",
    "tienen libre",
    "está libre",
    "reservar",
    "agendar",
    "para el",
    "para la fecha",
  ],

  tipos_eventos: [
    "qué eventos",
    "que eventos",
    "tipos de eventos",
    "qué tipo de evento",
    "casamientos",
    "cumpleaños",
    "bodas",
    "corporativos",
    "15 años",
  ],

  catalogo_estilos: [
    "estilos",
    "estilo",
    "catálogo",
    "catalogo",
    "ver opciones",
    "inspiración",
    "inspiracion",
    "ideas",
    "diseños",
    "diseños",
    "fotos",
    "galería",
    "galeria",
    "ejemplos",
    "minimalista",
    "boho",
    "glam",
    "romántico",
    "romantico",
  ],

  logistica: [
    "logística",
    "logistica",
    "entrega",
    "armado",
    "desarmado",
    "montaje",
    "desmontaje",
    "instalación",
    "instalacion",
    "cómo funciona",
    "como funciona",
    "horarios",
  ],

  zonas_cobertura: [
    "zona",
    "zonas",
    "cobertura",
    "dónde trabajan",
    "donde trabajan",
    "ciudades",
    "provincia",
    "van a",
    "llegan a",
    "atienden",
  ],

  contacto_humano: [
    "hablar",
    "asesor",
    "persona",
    "alguien",
    "urgente",
    "llamame",
    "llámame",
    "contacto",
    "teléfono",
    "telefono",
    "whatsapp",
    "necesito ayuda",
    "atención",
    "atencion",
  ],

  faq: [
    "pregunta",
    "frecuente",
    "dudas",
    "consulta",
    "pago",
    "pagos",
    "reserva",
    "seña",
    "cancelación",
    "cancelacion",
    "cancelar",
    "políticas",
    "politicas",
    "condiciones",
  ],

  reprogramacion: [
    "reprogramar",
    "cambiar fecha",
    "mover",
    "posponer",
    "adelantar",
    "modificar",
  ],

  seguimiento: [
    "seguimiento",
    "ya consulté",
    "ya consulte",
    "ya pregunté",
    "ya pregunte",
    "retomar",
    "continuar",
  ],

  fallback: [], // Sin keywords específicas, es el catch-all
};

/**
 * Palabras que indican urgencia alta
 */
export const URGENCY_KEYWORDS = {
  alta: ["urgente", "ya", "rápido", "rapido", "cuanto antes", "pronto"],
  media: ["próximamente", "proximamente", "en unos días", "en unos dias"],
  baja: ["viendo opciones", "averiguando", "explorando"],
};

/**
 * Palabras que indican frustración (trigger handoff)
 */
export const FRUSTRATION_KEYWORDS = [
  "no entendés",
  "no entendes",
  "no me ayudas",
  "no sirve",
  "mal servicio",
  "esto no funciona",
  "quiero hablar con",
  "dame a alguien",
];
