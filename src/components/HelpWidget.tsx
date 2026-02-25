import { useState, useRef, useEffect } from "react";
import { HelpCircle, X, Send } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";
import { ChatMessage } from "@/components/chatbot/ChatMessage";
import { ChatOptionButtons } from "@/components/chatbot/ChatOptionButtons";
import { LeadSummaryCard } from "@/components/chatbot/LeadSummaryCard";
import { TypingIndicator } from "@/components/chatbot/TypingIndicator";
import { ButtonOption } from "@/types/chatbot";
import { openWhatsApp } from "@/services/whatsappService";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// CHATBOT CONVERSACIONAL FURNARIUS
// ============================================================================

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    leadData,
    isTyping,
    awaitingInput,
    currentFlow,
    handleUserInput,
    resetChat,
  } = useChatbot();

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus en input cuando se abra el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Manejar selección de botón
  const handleOptionSelect = (option: ButtonOption) => {
    // Acciones especiales
    if (option.action === "open_whatsapp") {
      openWhatsApp(leadData);
      handleUserInput(option.label, option.intent, option.action);
      return;
    }

    if (option.value === "send_whatsapp") {
      setShowSummary(true);
      return;
    }

    if (option.value === "edit_data") {
      setShowSummary(false);
      handleUserInput("Quiero editar los datos", "cotizacion");
      return;
    }

    if (option.value === "menu") {
      setShowSummary(false);
      handleUserInput("Volver al menú principal");
      return;
    }

    // Enviar como mensaje normal
    handleUserInput(option.label, option.intent);
  };

  // Manejar envío de texto
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    handleUserInput(inputValue);
    setInputValue("");
  };

  // Manejar Enter en input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Obtener opciones del último mensaje
  const lastMessage = messages[messages.length - 1];
  const showOptions = lastMessage?.options && awaitingInput && !isTyping;

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Ayuda"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-muted rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-muted/80">
          <HelpCircle size={24} className="text-cream" />
        </div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-full max-w-md bg-charcoal border-r border-border z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-charcoal/95 backdrop-blur-sm">
          <div>
            <h3 className="text-editorial-sm text-cream">
              Asistente Furnarius
            </h3>
            <p className="text-body-sm text-muted-foreground">
              Cotizá tu evento en minutos
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-muted-foreground hover:text-cream transition-colors duration-300"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Lead Summary Card */}
          {showSummary && currentFlow === "cotizacion_flow" && (
            <LeadSummaryCard
              leadData={leadData}
              onSendWhatsApp={() => {
                openWhatsApp(leadData);
                setShowSummary(false);
                handleUserInput(
                  "Gracias, enviado por WhatsApp",
                  undefined,
                  "open_whatsapp"
                );
              }}
              onEditData={() => {
                setShowSummary(false);
                handleUserInput("Quiero editar los datos", "cotizacion");
              }}
              onContactAsesor={() => {
                setShowSummary(false);
                handleUserInput("Hablar con un asesor", "contacto_humano");
              }}
            />
          )}

          {/* Option Buttons */}
          {showOptions && !showSummary && (
            <ChatOptionButtons
              options={lastMessage.options!}
              onSelect={handleOptionSelect}
              disabled={!awaitingInput}
            />
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-charcoal/95 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribí tu mensaje..."
              disabled={!awaitingInput || isTyping}
              className="flex-1 px-4 py-3 bg-muted/30 border border-border rounded-lg text-body text-cream placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !awaitingInput || isTyping}
              className="px-4 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
              <Send size={20} />
            </button>
          </div>

          {/* Reset button (small) */}
          <button
            onClick={() => {
              resetChat();
              setShowSummary(false);
            }}
            className="mt-2 text-body-sm text-muted-foreground hover:text-cream transition-colors duration-300"
          >
            Reiniciar conversación
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default HelpWidget;
