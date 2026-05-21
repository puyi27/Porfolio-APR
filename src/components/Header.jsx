import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { name: "Inicio", href: "#inicio" },
  { name: "Sobre Mí", href: "#sobre-mi" },
  { name: "Trayectoria", href: "#trayectoria" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? "bg-ink/80 backdrop-blur-md shadow-sm border-b border-ember/10 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="px-6 md:px-10 flex justify-between items-center h-full">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <MagneticButton>
              <a
                href="#inicio"
                onClick={(e) => handleNavClick(e, "#inicio")}
                className="flex items-center group cursor-none"
              >
                <span className="font-serif text-xl tracking-tight text-ash group-hover:text-ember transition-colors duration-500">
                  Ángel Postigo.
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <MagneticButton key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-[10px] uppercase tracking-widest text-ash/70 hover:text-ash transition-colors duration-300 relative group cursor-none"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-300 ease-out"></span>
                </a>
              </MagneticButton>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ash focus:outline-none p-2 interactive"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-light flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col gap-8 items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-3xl tracking-tight text-ash hover:text-ember transition-colors duration-300 interactive"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
