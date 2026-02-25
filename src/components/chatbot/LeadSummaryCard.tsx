import { LeadData } from "@/types/chatbot";
import { motion } from "framer-motion";
import { Check, Edit2 } from "lucide-react";

// ============================================================================
// COMPONENTE: LeadSummaryCard (Resumen de Lead antes de enviar)
// ============================================================================

interface LeadSummaryCardProps {
  leadData: LeadData;
  onSendWhatsApp: () => void;
  onEditData: () => void;
  onContactAsesor: () => void;
}

export function LeadSummaryCard({
  leadData,
  onSendWhatsApp,
  onEditData,
  onContactAsesor,
}: LeadSummaryCardProps) {
  const fields = [
    { label: "Tipo", value: leadData.tipo_evento },
    { label: "Fecha", value: leadData.fecha_evento },
    { label: "Ciudad/zona", value: leadData.ciudad_zona },
    { label: "Invitados", value: leadData.invitados_estimados },
    { label: "Lugar", value: leadData.lugar },
    { label: "Necesidad", value: leadData.necesidad_principal },
    { label: "Estilo", value: leadData.estilo_deseado },
    { label: "Presupuesto", value: leadData.presupuesto_rango },
    { label: "Referencias", value: leadData.referencias_fotos },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-charcoal border border-border rounded-lg p-6 mb-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Check size={20} className="text-primary" />
        <h4 className="text-label text-cream">Resumen de tu evento</h4>
      </div>

      {/* Lista de datos */}
      <div className="space-y-2 mb-6">
        {fields.map(
          (field) =>
            field.value && (
              <div key={field.label} className="flex items-start gap-2">
                <span className="text-body-sm text-muted-foreground min-w-[100px]">
                  {field.label}:
                </span>
                <span className="text-body text-cream">
                  {field.value}
                </span>
              </div>
            )
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onSendWhatsApp}
          className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-body font-medium"
        >
          <Check size={18} />
          Enviar por WhatsApp
        </button>

        <div className="flex gap-2">
          <button
            onClick={onEditData}
            className="flex-1 px-4 py-2 bg-muted/30 hover:bg-muted/50 text-cream rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-body-sm border border-border"
          >
            <Edit2 size={16} />
            Editar datos
          </button>

          <button
            onClick={onContactAsesor}
            className="flex-1 px-4 py-2 bg-muted/30 hover:bg-muted/50 text-cream rounded-lg transition-all duration-300 text-body-sm border border-border"
          >
            Hablar con asesor
          </button>
        </div>
      </div>
    </motion.div>
  );
}
