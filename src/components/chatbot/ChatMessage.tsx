import { ChatMessage as ChatMessageType } from "@/types/chatbot";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// COMPONENTE: ChatMessage (Mensaje Individual)
// ============================================================================

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === "bot";
  const isSystem = message.type === "system";

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center my-4"
      >
        <div className="px-4 py-2 bg-muted/30 rounded-lg text-body-sm text-muted-foreground text-center max-w-xs">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isBot
            ? "bg-muted/50 text-cream rounded-tl-sm"
            : "bg-primary/20 text-cream rounded-tr-sm border border-primary/30"
        )}
      >
        <div className="text-body whitespace-pre-line">{message.content}</div>

        {/* Timestamp opcional */}
        <div
          className={cn(
            "text-body-sm mt-1 opacity-50",
            isBot ? "text-muted-foreground" : "text-primary"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
}
