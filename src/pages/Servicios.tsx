import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Lightbox from "@/components/Lightbox";

// Images
import outdoorLounge from "@/assets/gallery/outdoor-lounge.png";
import weddingCeremony from "@/assets/gallery/wedding-ceremony.png";
import eventLights from "@/assets/gallery/event-lights.png";
import ambientBubbles from "@/assets/gallery/ambient-bubbles.png";
import neonPlants from "@/assets/gallery/neon-plants.png";
import tableSetting from "@/assets/gallery/table-setting.png";

const institutionalGallery = [
  { src: eventLights, alt: "Evento institucional con iluminación" },
  { src: neonPlants, alt: "Decoración corporativa" },
  { src: ambientBubbles, alt: "Ambientación de evento empresarial" },
];

const personalGallery = [
  { src: weddingCeremony, alt: "Ceremonia de casamiento" },
  { src: tableSetting, alt: "Mesa elegante para celebración" },
  { src: outdoorLounge, alt: "Lounge para evento personal" },
];

const institutionalServices = [
  "Lanzamientos de productos y marca",
  "Conferencias y congresos",
  "Fiestas corporativas y aniversarios",
  "Activaciones de marketing y BTL",
  "Galas y premiaciones",
  "Eventos de networking",
];

const personalCategories = [
  {
    title: "Casamientos",
    description:
      "Desde la ceremonia hasta la fiesta, diseñamos cada momento de tu día especial.",
  },
  {
    title: "Cumpleaños & Aniversarios",
    description:
      "Celebraciones que reflejan tu personalidad, con ambientación única y memorable.",
  },
  {
    title: "Fiestas de 15 años",
    description:
      "El paso a la adultez merece un escenario extraordinario.",
  },
  {
    title: "Celebraciones Íntimas",
    description:
      "Baby showers, despedidas, reuniones familiares con un toque especial.",
  },
];

const Servicios = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<
    { src: string; alt: string }[]
  >([]);

  const openLightbox = (
    gallery: { src: string; alt: string }[],
    index: number
  ) => {
    setActiveGallery(gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-charcoal">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-label text-primary mb-4 animate-fade-in-up">
              Nuestros Servicios
            </p>
            <h1
              className="text-editorial-lg text-cream mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Creamos el escenario perfecto para cada ocasión
            </h1>
            <p
              className="text-body text-muted-foreground max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Ya sea un evento corporativo que impacte o una celebración
              personal que emocione, diseñamos experiencias integrales con
              mobiliario exclusivo y atención al detalle.
            </p>
          </div>
        </div>
      </section>

      {/* Eventos Institucionales */}
      <section
        id="institucionales"
        className="section-padding bg-charcoal-deep"
      >
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-editorial items-start">
            <div>
              <p className="text-label text-primary mb-4">
                Eventos Institucionales
              </p>
              <h2 className="text-editorial-md text-cream mb-6">
                Potenciá tu marca con eventos memorables
              </h2>
              <p className="text-body text-muted-foreground mb-8">
                Los eventos corporativos son una extensión de tu identidad de
                marca. Diseñamos espacios que comunican tus valores, impactan a
                tus audiencias y generan conexiones duraderas.
              </p>

              <h3 className="text-body font-medium text-cream mb-4">
                ¿Qué incluye nuestro servicio?
              </h3>
              <ul className="space-y-3 mb-8">
                {institutionalServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-body-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>

              <Link
                to="/contacto"
                className="btn-luxury-primary inline-flex items-center gap-2"
              >
                Cotizar evento corporativo
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {institutionalGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(institutionalGallery, index)}
                  className={`img-editorial rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary ${
                    index === 0 ? "col-span-2 aspect-wide" : "aspect-square"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-charcoal py-2">
        <div className="container-luxury">
          <div className="divider-gold mx-auto" />
        </div>
      </div>

      {/* Eventos Personales */}
      <section id="personales" className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-editorial items-start">
            {/* Gallery - Left on desktop */}
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {personalGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(personalGallery, index)}
                  className={`img-editorial rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary ${
                    index === 0 ? "col-span-2 aspect-wide" : "aspect-square"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-label text-primary mb-4">Eventos Personales</p>
              <h2 className="text-editorial-md text-cream mb-6">
                Celebraciones que reflejan tu esencia
              </h2>
              <p className="text-body text-muted-foreground mb-8">
                Cada celebración es única como vos. Creamos ambientes que
                cuentan tu historia, con mobiliario de diseño y una estética
                que trasciende las tendencias.
              </p>

              <div className="space-y-6 mb-8">
                {personalCategories.map((category, index) => (
                  <div
                    key={index}
                    className="pl-4 border-l-2 border-primary/30"
                  >
                    <h3 className="text-body font-medium text-cream mb-1">
                      {category.title}
                    </h3>
                    <p className="text-body-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/contacto"
                className="btn-luxury-primary inline-flex items-center gap-2"
              >
                Cotizar evento personal
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Video Background */}
        <div className="video-bg-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={outdoorLounge}
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video-3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal-deep/85" />

        {/* Content */}
        <div className="relative z-10 container-luxury text-center">
          <h2 className="text-editorial-md text-cream mb-6">
            ¿Qué evento tenés en mente?
          </h2>
          <p className="text-body text-cream/70 max-w-xl mx-auto mb-10">
            No importa el tamaño o el tipo de evento, nos adaptamos a tus
            necesidades. Contanos tu idea y recibí una propuesta personalizada.
          </p>
          <Link to="/contacto" className="btn-luxury-primary">
            Solicitar Cotización
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={activeGallery}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
};

export default Servicios;
