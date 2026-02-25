import { useState } from "react";
import { HelpCircle, X, Download, MessageCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// ============================================================================
// CENTRO DE AYUDA FURNARIUS (FAQs & DOSSIER)
// ============================================================================

const faqs = [
  {
    question: "¿Cómo reservo una fecha para mi evento?",
    answer: "Podés reservar tu fecha mediante una seña del 30% del valor total presupuestado. El saldo restante se cancela hasta 15 días antes del evento.",
  },
  {
    question: "¿Qué zonas de cobertura tienen?",
    answer: "Nuestra base está en Córdoba Capital, pero realizamos eventos en todo el país. Para eventos fuera de Córdoba, se adicionan costos de logística y traslados.",
  },
  {
    question: "¿Con cuánto tiempo de anticipación debo contratar?",
    answer: "Para casamientos y eventos grandes, recomendamos entre 6 y 10 meses. Para eventos corporativos o íntimos, entre 1 y 3 meses suele ser suficiente, sujeto a disponibilidad.",
  },
  {
    question: "¿El mobiliario está incluido en la ambientación?",
    answer: "Depende del pack contratado. Contamos con mobiliario propio de diseño que podemos integrar en la propuesta para lograr una estética cohesiva y exclusiva.",
  },
  {
    question: "¿Puedo pedir un presupuesto personalizado?",
    answer: "¡Por supuesto! Cada evento es único. Podés usar nuestro chatbot (botón de WhatsApp) para una cotización rápida o contactarnos directamente.",
  },
];

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Ayuda y Preguntas frecuentes"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-muted border border-border/50 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-muted/80">
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

      {/* Help Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-full max-w-md bg-charcoal border-r border-border z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-charcoal/95 backdrop-blur-sm">
          <div>
            <h3 className="text-editorial-sm text-cream">
              Centro de Ayuda
            </h3>
            <p className="text-body-sm text-muted-foreground">
              Preguntas frecuentes y recursos
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          
          {/* Dossier Section */}
          <section className="space-y-4">
            <h4 className="text-label text-primary uppercase tracking-widest text-[10px]">
              Recursos de Diseño
            </h4>
            <div className="p-5 rounded-lg bg-muted/30 border border-border/50 space-y-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Download size={24} className="text-primary" />
                </div>
                <div>
                  <h5 className="text-editorial-xs text-cream mb-1">Dossier Furnarius 2026</h5>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">
                    Descargá nuestro catálogo completo con estilos, servicios y mobiliario exclusivo en formato PDF.
                  </p>
                </div>
              </div>
              <a 
                href="/catalogo-furnarius-2026.pdf" 
                download 
                className="btn-luxury-primary w-full flex items-center justify-center gap-2 py-3"
              >
                <Download size={18} />
                Descargar PDF
              </a>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="space-y-4">
            <h4 className="text-label text-primary uppercase tracking-widest text-[10px]">
              Preguntas Frecuentes
            </h4>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-body-sm text-left text-cream hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Contact Alternative */}
          <section className="pt-4 border-t border-border/50">
            <p className="text-body-sm text-muted-foreground text-center mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <Button 
              variant="outline" 
              className="w-full border-primary/30 text-primary hover:bg-primary/5 hover:text-primary-foreground group"
              onClick={() => {
                // Redirigir a WhatsApp o activar el chatbot
                window.open("https://wa.me/5493517051171?text=Hola,%20tengo%20una%20duda%20que%20no%20está%20en%20las%20FAQ", "_blank");
              }}
            >
              <MessageCircle size={18} className="mr-2" />
              Hablar con un asesor
              <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-charcoal/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Furnarius • Creadores de Eventos
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default HelpWidget;
