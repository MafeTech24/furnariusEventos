import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Lightbox from "@/components/Lightbox";

// Gallery images
import outdoorLounge from "@/assets/gallery/outdoor-lounge.png";
import weddingCeremony from "@/assets/gallery/wedding-ceremony.png";
import eventLights from "@/assets/gallery/event-lights.png";
import ambientBubbles from "@/assets/gallery/ambient-bubbles.png";
import neonPlants from "@/assets/gallery/neon-plants.png";
import tableSetting from "@/assets/gallery/table-setting.png";

const galleryImages = [
  { src: outdoorLounge, alt: "Lounge exterior con mobiliario de diseño" },
  { src: weddingCeremony, alt: "Ceremonia de casamiento al aire libre" },
  { src: eventLights, alt: "Evento con iluminación dramática" },
  { src: ambientBubbles, alt: "Ambientación con globos y luces" },
  { src: neonPlants, alt: "Decoración con neones y plantas" },
  { src: tableSetting, alt: "Mesa elegante con cristalería" },
];

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="hero-video1" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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
            <source src="/videos/hero-video-1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="relative z-10 container-luxury text-center stagger-children">
          <p className="text-label text-primary mb-6">Creadores de Eventos</p>
          <h1 className="text-editorial-xl text-cream mb-6">Furnarius</h1>
          <p className="text-body text-cream/80 max-w-2xl mx-auto mb-10">
            Transformamos espacios en experiencias inolvidables. Diseño,
            producción y mobiliario exclusivo para eventos que trascienden lo
            ordinario.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contacto" className="btn-luxury-primary">
              Hablemos
            </Link>
            <Link to="/servicios" className="btn-luxury-outline">
              Ver Servicios
            </Link>
          </div>
        </div>
       
      </section>

      {/* Quiénes Somos Teaser */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-editorial items-center">
            <div className="order-2 lg:order-1">
              <p className="text-label text-primary mb-4">Quiénes Somos</p>
              <h2 className="text-editorial-lg text-cream mb-6">
                Diseñamos experiencias que perduran
              </h2>
              <p className="text-body text-muted-foreground mb-8 max-w-lg">
                Somos un equipo apasionado por crear ambientes únicos. Cada
                evento es una oportunidad para transformar espacios comunes en
                escenarios extraordinarios, con mobiliario de diseño propio y
                atención al detalle.
              </p>
              <Link
                to="/quienes-somos"
                className="btn-luxury-ghost group inline-flex items-center gap-2"
              >
                Conocer más
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="img-editorial aspect-editorial rounded-sm overflow-hidden">
                <img
                  src={tableSetting}
                  alt="Detalle de mesa elegante"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Nuestros Servicios</p>
            <h2 className="text-editorial-lg text-cream">
              Dos mundos, una misma pasión
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Eventos Institucionales */}
            <div className="card-luxury group">
              <div className="img-editorial aspect-wide">
                <img
                  src={eventLights}
                  alt="Evento institucional"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-editorial-sm text-cream mb-4">
                  Eventos Institucionales
                </h3>
                <ul className="space-y-2 text-body-sm text-muted-foreground mb-6">
                  <li>• Lanzamientos de marca</li>
                  <li>• Conferencias y congresos</li>
                  <li>• Fiestas corporativas</li>
                  <li>• Activaciones de marketing</li>
                </ul>
                <Link
                  to="/servicios"
                  className="btn-luxury-ghost group/btn inline-flex items-center gap-2 px-0"
                >
                  Ver más
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Eventos Personales */}
            <div className="card-luxury group">
              <div className="img-editorial aspect-wide">
                <img
                  src={weddingCeremony}
                  alt="Evento personal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-editorial-sm text-cream mb-4">
                  Eventos Personales
                </h3>
                <ul className="space-y-2 text-body-sm text-muted-foreground mb-6">
                  <li>• Casamientos</li>
                  <li>• Cumpleaños y aniversarios</li>
                  <li>• Fiestas de 15 años</li>
                  <li>• Celebraciones íntimas</li>
                </ul>
                <Link
                  to="/servicios"
                  className="btn-luxury-ghost group/btn inline-flex items-center gap-2 px-0"
                >
                  Ver más
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Destacados */}
      <section className="py-16 bg-charcoal border-y border-border/30">
        <div className="container-luxury">
          <p className="text-label text-center text-muted-foreground mb-8">
            Confían en Nosotros
          </p>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            {/* AutoCity Logo Placeholder */}
            <div className="text-cream/40 hover:text-cream/70 transition-colors duration-300">
              <span className="text-2xl font-serif tracking-wider">
                AutoCity
              </span>
            </div>
            {/* Fiorella Logo Placeholder */}
            <div className="text-cream/40 hover:text-cream/70 transition-colors duration-300">
              <span className="text-2xl font-serif tracking-wider">
                Fiorella
              </span>
            </div>
          </div>
        </div>
      </section>

    {/* Galería Destacada */}
      <section className="section-padding bg-charcoal-deep">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Nuestro Trabajo</p>
            <h2 className="text-editorial-lg text-cream">
              Momentos que creamos
            </h2>
          </div>

          {/* Forzamos 1 columna en móvil (w-full) y 3 en desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="w-full aspect-[4/5] md:aspect-square rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-charcoal-deep"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </button>
            ))}
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
            poster={ambientBubbles}
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video-2.mp4" type="video/mp4" />
          </video>
        </div>
       
        {/* Content */}
        <div className="relative z-10 container-luxury text-center">
          <h2 className="text-editorial-lg text-cream mb-6">
            ¿Tenés un evento en mente?
          </h2>
          <p className="text-body text-cream/70 max-w-xl mx-auto mb-10">
            Cada proyecto comienza con una conversación. Contanos tu idea y
            hagamos realidad el evento que imaginás.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contacto" className="btn-luxury-primary">
              Hablemos
            </Link>
            <a
              href="https://wa.me/1111111111?text=Hola,%20quiero%20cotizar%20un%20evento%20con%20Furnarius."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
};

export default Index;
