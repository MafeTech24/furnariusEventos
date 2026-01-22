import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";

const featuredClients = [
  { name: "AutoCity", logo: null }, // Real client - placeholder text
  { name: "Fiorella", logo: null }, // Real client - placeholder text
];

const additionalClients = [
  { name: "Marca 1", placeholder: true },
  { name: "Marca 2", placeholder: true },
  { name: "Marca 3", placeholder: true },
  { name: "Marca 4", placeholder: true },
];

const testimonials = [
  {
    quote:
      "Furnarius superó todas nuestras expectativas. La atención al detalle y el diseño del mobiliario fueron impecables.",
    author: "Nombre Cliente",
    company: "Empresa",
    placeholder: true,
  },
  {
    quote:
      "Trabajar con ellos fue una experiencia increíble. Entendieron exactamente lo que queríamos y lo elevaron a otro nivel.",
    author: "Nombre Cliente",
    company: "Evento Personal",
    placeholder: true,
  },
];

const NuestrosClientes = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-label text-primary mb-4 animate-fade-in-up">
              Nuestros Clientes
            </p>
            <h1
              className="text-editorial-lg text-cream mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Marcas y personas que confían en nosotros
            </h1>
            <p
              className="text-body text-muted-foreground max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Desde empresas líderes hasta celebraciones íntimas, cada proyecto
              es una oportunidad para crear experiencias memorables.
            </p>
          </div>
        </div>
      </section>

      {/* Clientes Destacados */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Clientes Destacados</p>
            <h2 className="text-editorial-md text-cream">
              Alianzas que nos enorgullecen
            </h2>
          </div>

          <div className="flex items-center justify-center gap-16 lg:gap-24 flex-wrap">
            {featuredClients.map((client, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-40 h-24 flex items-center justify-center border border-border/30 rounded-sm bg-charcoal/50 group-hover:border-primary/30 transition-colors duration-500">
                  <span className="text-3xl font-serif text-cream/60 group-hover:text-cream transition-colors duration-500">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Más Marcas */}
      <section className="py-16 bg-charcoal border-y border-border/30">
        <div className="container-luxury">
          <p className="text-label text-center text-muted-foreground mb-8">
            También confían en nosotros
          </p>
          <div className="flex items-center justify-center gap-12 lg:gap-16 flex-wrap">
            {additionalClients.map((client, index) => (
              <div
                key={index}
                className="text-cream/30 hover:text-cream/50 transition-colors duration-300"
              >
                <span className="text-xl font-serif tracking-wider">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-body-sm text-muted-foreground mt-6">
            (Logos editables - agregar cuando estén disponibles)
          </p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Testimonios</p>
            <h2 className="text-editorial-md text-cream">
              Lo que dicen de nosotros
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative p-8 bg-charcoal/50 border border-border/30 rounded-sm"
              >
                <Quote
                  size={32}
                  className="text-primary/20 absolute top-6 right-6"
                />
                <p className="text-body text-cream/80 mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-body-sm text-muted-foreground">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-cream">
                      {testimonial.author}
                    </p>
                    <p className="text-body-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                {testimonial.placeholder && (
                  <p className="text-xs text-muted-foreground/50 mt-4">
                    (Placeholder - editable)
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal border-t border-border/30">
        <div className="container-luxury text-center">
          <h2 className="text-editorial-md text-cream mb-6">
            ¿Querés ser parte de nuestra historia?
          </h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto mb-10">
            Cada cliente es un nuevo desafío y una oportunidad para crear algo
            extraordinario. Conversemos sobre tu próximo evento.
          </p>
          <Link
            to="/contacto"
            className="btn-luxury-primary inline-flex items-center gap-2"
          >
            Contactanos
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NuestrosClientes;
