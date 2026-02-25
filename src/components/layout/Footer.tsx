import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";


const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/furnariuseventos/",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/furnariusequipamiento",
    label: "Facebook",
  },
  // {
  //   icon: Youtube,
  //   href: "#", // Placeholder
  //   label: "YouTube",
  // },
  // {
  //   icon: Linkedin,
  //   href: "#", // Placeholder
  //   label: "LinkedIn",
  // },
];

const footerLinks = [
  { label: "Inicio", path: "/" },
  { label: "Quiénes Somos", path: "/quienes-somos" },
  { label: "Servicios", path: "/servicios" },
  //{ label: "Nuestros Clientes", path: "/nuestros-clientes" },
  { label: "Contacto", path: "/contacto" },
];

const Footer = () => {
  return (
    <footer className="bg-charcoal-deep border-t border-border/30">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          {/* Brand Column */}
<div className="lg:col-span-2">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
    {/* Logo Enlazado al Video */}
    <a href="./#hero-video1"
      className="relative z-10 flex-shrink-0 transition-opacity duration-300 hover:opacity-80"
    >
      <img
        src="/logo-furnarius.png"
        alt="Furnarius"
        className="h-20 md:h-24 w-auto invert" 
      />
    </a>

    {/* Texto al lado del logo */}
    <p className="text-body text-muted-foreground max-w-md pt-2">
      Creadores de experiencias únicas. Diseño, producción y
      ambientación de eventos que trascienden lo ordinario.
    </p>
  </div>

  {/* Redes Sociales */}
  <div className="flex items-center gap-5">
    {socialLinks.map((social) => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        aria-label={social.label}
      >
        <social.icon size={30} />
      </a>
    ))}
  </div>
</div>

          {/* Navigation */}
          <div>
            <h4 className="text-label text-cream mb-6">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-label text-cream mb-6">Contacto</h4>
            <ul className="space-y-3 text-body-sm text-muted-foreground">
              <li>
                <a
                  href="Contacto"
                  className="hover:text-primary transition-colors duration-300"
                >
                  furnariuseventos@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:1111111111"
                  className="hover:text-primary transition-colors duration-300"
                >
                  111-1111111
                </a>
              </li>
              <li>Córdoba, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-muted-foreground">
            © {new Date().getFullYear()} Furnarius. Todos los derechos
            reservados.
          </p>
          <p className="text-body-sm text-muted-foreground">
            Creadores de Eventos en Córdoba, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
