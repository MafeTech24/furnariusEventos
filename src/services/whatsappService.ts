import { LeadData } from "@/types/chatbot";
import { chatbotConfig } from "@/config/chatbotConfig";

// ============================================================================
// SERVICIO DE INTEGRACIÓN WHATSAPP
// ============================================================================

/**
 * Genera mensaje prearmado para WhatsApp
 */
export function generateWhatsAppMessage(leadData: LeadData): string {
  const lines: string[] = ["Hola Furnarius, quiero cotizar un evento."];

  if (leadData.nombre) lines.push(`Nombre: ${leadData.nombre}`);
  if (leadData.tipo_evento) lines.push(`Tipo: ${leadData.tipo_evento}`);
  if (leadData.fecha_evento) lines.push(`Fecha: ${leadData.fecha_evento}`);
  if (leadData.ciudad_zona) lines.push(`Ciudad/Zona: ${leadData.ciudad_zona}`);
  if (leadData.invitados_estimados)
    lines.push(`Invitados: ${leadData.invitados_estimados}`);
  if (leadData.lugar) lines.push(`Lugar: ${leadData.lugar}`);
  if (leadData.necesidad_principal)
    lines.push(`Necesidad: ${leadData.necesidad_principal}`);
  if (leadData.estilo_deseado) lines.push(`Estilo: ${leadData.estilo_deseado}`);
  if (leadData.presupuesto_rango)
    lines.push(`Presupuesto: ${leadData.presupuesto_rango}`);
  if (leadData.referencias_fotos)
    lines.push(`Referencias: ${leadData.referencias_fotos}`);

  lines.push("Gracias.");

  return lines.join("\n");
}

/**
 * Genera URL de WhatsApp con mensaje prearmado
 */
export function generateWhatsAppURL(leadData: LeadData): string {
  const message = generateWhatsAppMessage(leadData);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = chatbotConfig.whatsappNumber;

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Abre WhatsApp en nueva pestaña con mensaje prearmado
 */
export function openWhatsApp(leadData: LeadData): void {
  const url = generateWhatsAppURL(leadData);
  window.open(url, "_blank", "noopener,noreferrer");
}
