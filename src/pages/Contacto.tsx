import { useState } from "react";
import { Send, MessageCircle, Check, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoEvento: string;
  fechaEstimada: string;
  mensaje: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const Contacto = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoEvento: "",
    fechaEstimada: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission - replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // TODO: Connect to backend/edge function to save lead and send email
      console.log("Form submitted:", formData);
      setStatus("success");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoEvento: "",
        fechaEstimada: "",
        mensaje: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const whatsappUrl =
    "https://wa.me/5493517051171?text=Hola,%20quiero%20cotizar%20un%20evento%20con%20Furnarius.";

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-label text-primary mb-4 animate-fade-in-up">
              Contacto
            </p>
            <h1
              className="text-editorial-lg text-cream mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Hablemos de tu próximo evento
            </h1>
            <p
              className="text-body text-muted-foreground max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Completá el formulario o contactanos directamente por WhatsApp.
              Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-editorial">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-body-sm text-cream mb-2"
                    >
                      Nombre y apellido <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body-sm text-cream mb-2"
                    >
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-body-sm text-cream mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="+54 9 351 555-5555"
                    />
                  </div>

                  {/* Tipo de evento */}
                  <div>
                    <label
                      htmlFor="tipoEvento"
                      className="block text-body-sm text-cream mb-2"
                    >
                      Tipo de evento
                    </label>
                    <select
                      id="tipoEvento"
                      name="tipoEvento"
                      value={formData.tipoEvento}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream focus:outline-none focus:border-primary transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="institucional">
                        Evento Institucional
                      </option>
                      <option value="personal">Evento Personal</option>
                    </select>
                  </div>
                </div>

                {/* Fecha estimada */}
                <div>
                  <label
                    htmlFor="fechaEstimada"
                    className="block text-body-sm text-cream mb-2"
                  >
                    Fecha estimada del evento
                  </label>
                  <input
                    type="date"
                    id="fechaEstimada"
                    name="fechaEstimada"
                    value={formData.fechaEstimada}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream focus:outline-none focus:border-primary transition-colors duration-300"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-body-sm text-cream mb-2"
                  >
                    Mensaje <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-charcoal border border-border rounded-sm text-cream placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                    placeholder="Contanos sobre tu evento: tipo de celebración, cantidad de invitados, lugar, ideas que tenés en mente..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-luxury-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-sm text-green-400">
                    <Check size={20} />
                    <p className="text-body-sm">
                      ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive">
                    <AlertCircle size={20} />
                    <div>
                      <p className="text-body-sm">
                        Hubo un error al enviar el mensaje.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="text-body-sm underline hover:no-underline mt-1"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* WhatsApp CTA */}
              <div className="p-6 bg-charcoal border border-border/50 rounded-sm">
                <h3 className="text-editorial-sm text-cream mb-4">
                  ¿Preferís WhatsApp?
                </h3>
                <p className="text-body-sm text-muted-foreground mb-6">
                  Escribinos directamente y te respondemos al instante.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-outline w-full inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </a>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-charcoal border border-border/50 rounded-sm">
                <h3 className="text-editorial-sm text-cream mb-4">
                  Datos de contacto
                </h3>
                <ul className="space-y-4 text-body-sm text-muted-foreground">
                  <li>
                    <span className="block text-label text-cream/70 mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:info@furnarius.com.ar"
                      className="hover:text-primary transition-colors duration-300"
                    >
                      info@furnarius.com.ar
                    </a>
                  </li>
                  <li>
                    <span className="block text-label text-cream/70 mb-1">
                      Teléfono
                    </span>
                    <a
                      href="tel:+5493517051171"
                      className="hover:text-primary transition-colors duration-300"
                    >
                      351 705-1171
                    </a>
                  </li>
                  <li>
                    <span className="block text-label text-cream/70 mb-1">
                      Ubicación
                    </span>
                    Córdoba, Argentina
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground/50 mt-4">
                  (Placeholders editables)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
