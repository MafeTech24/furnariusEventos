import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

// Images
import outdoorLounge from "@/assets/gallery/outdoor-lounge.png";
import eventLights from "@/assets/gallery/event-lights.png";
import tableSetting from "@/assets/gallery/table-setting.png";

const values = [
  {
    title: "Diseño Original",
    description:
      "Mobiliario y ambientación de diseño propio, creados exclusivamente para cada proyecto.",
  },
  {
    title: "Atención Personalizada",
    description:
      "Acompañamiento en cada etapa, desde la conceptualización hasta el desmontaje.",
  },
  {
    title: "Calidad Premium",
    description:
      "Materiales de primera calidad y acabados impecables en cada pieza.",
  },
  {
    title: "Experiencia Integral",
    description:
      "Servicio completo: diseño, producción, logística, montaje y supervisión.",
  },
];

const process = [
  {
    step: "01",
    title: "Escuchamos",
    description:
      "Conocemos tu visión, necesidades y expectativas en una reunión inicial sin compromiso.",
  },
  {
    step: "02",
    title: "Diseñamos",
    description:
      "Creamos una propuesta conceptual y visual adaptada a tu evento, con opciones de mobiliario y ambientación.",
  },
  {
    step: "03",
    title: "Ejecutamos",
    description:
      "Nos encargamos de todo: producción, logística, montaje y desmontaje. Vos solo disfrutás.",
  },
];

const QuienesSomos = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-label text-primary mb-4 animate-fade-in-up">
              Quiénes Somos
            </p>
            <h1
              className="text-editorial-lg text-cream mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Creadores de experiencias que trascienden
            </h1>
            <p
              className="text-body text-muted-foreground max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Desde Córdoba, transformamos espacios en escenarios únicos. Somos
              especialistas en diseño, producción y ambientación de eventos,
              con mobiliario de diseño propio que marca la diferencia.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-editorial items-center">
            <div>
              <p className="text-label text-primary mb-4">Nuestra Historia</p>
              <h2 className="text-editorial-md text-cream mb-6">
                Donde la creatividad encuentra su forma
              </h2>
              <p className="text-body text-muted-foreground mb-6">
                Furnarius nació de la pasión por crear espacios memorables.
                Comenzamos diseñando mobiliario único para eventos propios, y
                pronto descubrimos que nuestra visión resonaba con quienes
                buscaban algo diferente.
              </p>
              <p className="text-body text-muted-foreground mb-8">
                Hoy somos referentes en Córdoba en producción de eventos con
                identidad propia. Cada proyecto es una oportunidad para
                innovar, sorprender y crear momentos que perduran en la
                memoria.
              </p>
              <div className="divider-gold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="img-editorial aspect-editorial rounded-sm overflow-hidden">
                <img
                  src={eventLights}
                  alt="Evento con iluminación"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="img-editorial aspect-editorial rounded-sm overflow-hidden mt-8">
                <img
                  src={outdoorLounge}
                  alt="Mobiliario exterior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">
              Propuesta de Valor
            </p>
            <h2 className="text-editorial-md text-cream">
              Lo que nos diferencia
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle
                    size={20}
                    className="text-primary flex-shrink-0 mt-1"
                  />
                  <h3 className="text-body font-medium text-cream">
                    {value.title}
                  </h3>
                </div>
                <p className="text-body-sm text-muted-foreground pl-9">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Cómo Trabajamos</p>
            <h2 className="text-editorial-md text-cream">
              Un proceso simple, resultados extraordinarios
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="relative p-8 border border-border/50 rounded-sm hover:border-primary/30 transition-colors duration-500"
              >
                <span className="text-6xl font-serif text-primary/20 absolute top-4 right-6">
                  {item.step}
                </span>
                <h3 className="text-editorial-sm text-cream mb-4 relative z-10">
                  {item.title}
                </h3>
                <p className="text-body-sm text-muted-foreground relative z-10">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 img-editorial aspect-wide rounded-sm overflow-hidden">
              <img
                src={tableSetting}
                alt="Mesa elegante"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="img-editorial aspect-wide lg:aspect-auto rounded-sm overflow-hidden">
              <img
                src={eventLights}
                alt="Iluminación de evento"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal-deep border-t border-border/30">
        <div className="container-luxury text-center">
          <h2 className="text-editorial-md text-cream mb-6">
            ¿Listo para crear algo único?
          </h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto mb-10">
            Conversemos sobre tu próximo evento y cómo podemos transformarlo
            en una experiencia inolvidable.
          </p>
          <Link
            to="/contacto"
            className="btn-luxury-primary inline-flex items-center gap-2"
          >
            Hablemos
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default QuienesSomos;
