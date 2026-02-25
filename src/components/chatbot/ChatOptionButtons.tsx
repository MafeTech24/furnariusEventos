import { ButtonOption } from "@/types/chatbot";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// COMPONENTE: ChatOptionButtons (Botones de Opciones Rápidas)
// ============================================================================

interface ChatOptionButtonsProps {
  options: ButtonOption[];
  onSelect: (option: ButtonOption) => void;
  disabled?: boolean;
}

export function ChatOptionButtons({
  options,
  onSelect,
  disabled = false,
}: ChatOptionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, staggerChildren: 0.05 }}
      className="flex flex-col gap-2 mb-6"
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={cn(
            "px-4 py-3 text-left text-body rounded-lg border transition-all duration-300",
            "hover:border-primary/50 hover:bg-primary/10",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-muted/30 border-border text-cream"
          )}
        >
          {option.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
