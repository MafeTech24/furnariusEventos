import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber = "5493517051171", // Placeholder - editable
  message = "Hola, quiero cotizar un evento con Furnarius.", // Placeholder - editable
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <MessageCircle size={28} className="text-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-charcoal px-4 py-2 rounded-lg whitespace-nowrap text-body-sm text-cream shadow-lg">
            Hablemos por WhatsApp
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
