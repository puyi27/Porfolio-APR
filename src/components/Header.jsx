import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { name: "Inicio", href: "#inicio" },
  { name: "Sobre Mí", href: "#sobre-mi" },
  { name: "Trayectoria", href: "#trayectoria" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Contacto", href: "#contacto" },
];

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
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
                className="flex items-center gap-3 group cursor-none"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-ember/20 group-hover:border-ember transition-colors duration-500 shadow-sm">
                  <img src="/profile.jpeg" alt="Ángel Postigo" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <span className="font-serif text-xl tracking-tight text-ash group-hover:text-ember transition-colors duration-500">
                  Ángel Postigo.
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {['home', 'about', 'experience', 'projects', 'contact'].map((key) => {
              const href = `#${key === 'home' ? 'inicio' : key === 'about' ? 'sobre-mi' : key === 'experience' ? 'trayectoria' : key === 'projects' ? 'proyectos' : 'contacto'}`;
              return (
                <MagneticButton key={key}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="font-mono text-[10px] uppercase tracking-widest text-ash/70 hover:text-ash transition-colors duration-300 relative group cursor-none"
                  >
                    {t(`header.${key}`)}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-300 ease-out"></span>
                  </a>
                </MagneticButton>
              )
            })}
            
            {/* Language Switcher Desktop */}
            <div className="flex gap-3 items-center ml-8 border-l border-ash/10 pl-8">
              {['es', 'en', 'it', 'de'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${language === lang ? 'text-ember' : 'text-ash/40 hover:text-ash/80'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
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
              {['home', 'about', 'experience', 'projects', 'contact'].map((key) => {
                const href = `#${key === 'home' ? 'inicio' : key === 'about' ? 'sobre-mi' : key === 'experience' ? 'trayectoria' : key === 'projects' ? 'proyectos' : 'contacto'}`;
                return (
                  <a
                    key={key}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="font-serif text-3xl tracking-tight text-ash hover:text-ember transition-colors duration-300 interactive"
                  >
                    {t(`header.${key}`)}
                  </a>
                )
              })}
              
              {/* Language Switcher Mobile */}
              <div className="flex gap-6 mt-12 border-t border-ash/10 pt-12">
                {['es', 'en', 'it', 'de'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`font-mono text-xs uppercase tracking-widest transition-colors ${language === lang ? 'text-ember' : 'text-ash/40'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
