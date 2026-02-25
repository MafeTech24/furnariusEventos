import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";


const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Quiénes Somos", path: "/quienes-somos" },
  { label: "Servicios", path: "/servicios" },
  //{ label: "Nuestros Clientes", path: "/nuestros-clientes" },
  { label: "Contacto", path: "/contacto" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        isScrolled
          ? "bg-charcoal-deep/90 backdrop-blur-md border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            to="/#hero-video1"
            className="relative z-10 flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          >
            <img
  src="/logo-furnarius.png"
  alt="Furnarius"
  className="h-10 md:h-12 w-auto invert"
/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-body-sm transition-colors duration-300 hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-cream/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          {/* <div className="hidden lg:block">
            <Link
              to="/contacto"
              className="btn-luxury-primary text-xs px-6 py-3"
            >
              Hablemos
            </Link>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 text-cream hover:text-primary transition-colors duration-300"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-charcoal-deep/98 backdrop-blur-lg transition-all duration-500 ease-out-expo ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-editorial-sm transition-all duration-300 hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-cream/80"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="btn-luxury-primary mt-4"
          >
            Hablemos
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
