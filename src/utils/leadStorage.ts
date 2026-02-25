import { LeadData, ChatState } from "@/types/chatbot";

// ============================================================================
// UTILIDADES DE ALMACENAMIENTO DE LEADS
// ============================================================================

const STORAGE_PREFIX = "furnarius_chatbot_";
const LEAD_DATA_KEY = `${STORAGE_PREFIX}lead_data`;
const CHAT_STATE_KEY = `${STORAGE_PREFIX}chat_state`;

/**
 * Guarda datos del lead en localStorage
 */
export function saveLeadData(leadData: LeadData): void {
  try {
    const dataWithTimestamp = {
      ...leadData,
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(LEAD_DATA_KEY, JSON.stringify(dataWithTimestamp));
  } catch (error) {
    console.error("Error saving lead data:", error);
  }
}

/**
 * Recupera datos del lead desde localStorage
 */
export function getLeadData(): LeadData | null {
  try {
    const data = localStorage.getItem(LEAD_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving lead data:", error);
    return null;
  }
}

/**
 * Guarda estado del chat en localStorage
 */
export function saveChatState(chatState: ChatState): void {
  try {
    localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(chatState));
  } catch (error) {
    console.error("Error saving chat state:", error);
  }
}

/**
 * Recupera estado del chat desde localStorage
 */
export function getChatState(): ChatState | null {
  try {
    const data = localStorage.getItem(CHAT_STATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving chat state:", error);
    return null;
  }
}

/**
 * Limpia datos del lead y estado del chat
 */
export function clearChatData(): void {
  try {
    localStorage.removeItem(LEAD_DATA_KEY);
    localStorage.removeItem(CHAT_STATE_KEY);
  } catch (error) {
    console.error("Error clearing chat data:", error);
  }
}

/**
 * Obtiene todos los leads guardados (para analytics futuro)
 */
export function getAllLeads(): LeadData[] {
  try {
    const allLeads: LeadData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX) && key.includes("lead_")) {
        const data = localStorage.getItem(key);
        if (data) {
          allLeads.push(JSON.parse(data));
        }
      }
    }
    return allLeads;
  } catch (error) {
    console.error("Error retrieving all leads:", error);
    return [];
  }
}
