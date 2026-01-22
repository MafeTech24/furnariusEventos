import { useState } from "react";
import { HelpCircle, X, FileText, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer:
      "Recomendamos reservar con al menos 30 días de anticipación para eventos personales y 45-60 días para eventos corporativos, especialmente en temporada alta.",
  },
  {
    question: "¿Qué incluye el servicio de ambientación?",
    answer:
      "Incluye diseño conceptual, mobiliario de diseño propio, iluminación, decoración, montaje y desmontaje completo. Cada proyecto se adapta a tus necesidades específicas.",
  },
  {
    question: "¿Trabajan fuera de Córdoba?",
    answer:
      "Sí, realizamos eventos en toda la provincia de Córdoba y zonas aledañas. Para eventos fuera de la ciudad, consultar disponibilidad y costos de traslado.",
  },
  {
    question: "¿Cómo es el proceso de cotización?",
    answer:
      "Agendamos una reunión para conocer tus necesidades, luego enviamos una propuesta detallada con opciones y presupuesto. Sin compromiso.",
  },
  {
    question: "¿Tienen catálogo de mobiliario?",
    answer:
      "Sí, contamos con un dossier completo con nuestro mobiliario de diseño propio. Podés descargarlo desde esta sección.",
  },
];

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const pdfUrl = "/catalogo-furnarius-2026.pdf"; // Placeholder - replace with actual PDF URL

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-full max-w-md bg-charcoal border-r border-border z-50 transform transition-transform duration-500 ease-out-expo ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-editorial-sm text-cream">¿Cómo podemos ayudarte?</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-muted-foreground hover:text-cream transition-colors duration-300"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
          {/* Download PDF Button */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 mb-6 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-body font-medium text-cream">Ver Dossier</p>
              <p className="text-body-sm text-muted-foreground">
                Catálogo de mobiliario y servicios
              </p>
            </div>
          </a>

          {/* FAQ Section */}
          <h4 className="text-label text-cream mb-4">Preguntas Frecuentes</h4>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="flex items-center justify-between w-full p-4 text-left text-body text-cream hover:bg-muted/30 transition-colors duration-300"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={18} className="text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <p className="px-4 pb-4 text-body-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpWidget;
