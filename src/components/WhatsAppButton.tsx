import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

// ============================================================================
// BOTÓN WHATSAPP CON CHATBOT INTEGRADO
// ============================================================================

const WhatsAppButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      {/* Botón flotante verde de WhatsApp */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <MessageCircle size={28} className="text-white" />
        </div>
      </button>

      {/* Panel del chatbot */}
      <ChatbotPanel
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
};

export default WhatsAppButton;
