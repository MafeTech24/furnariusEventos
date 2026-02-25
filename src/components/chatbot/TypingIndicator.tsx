import { motion } from "framer-motion";

// ============================================================================
// COMPONENTE: TypingIndicator (Indicador de "escribiendo...")
// ============================================================================

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-muted/50 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.4,
          }}
        />
      </div>
    </div>
  );
}
