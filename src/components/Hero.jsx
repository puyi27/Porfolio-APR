import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center w-full px-6 md:px-16 lg:px-24 pt-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Columna Izquierda: Tipografía Editorial */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-ember"></span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-ash/60">
              Ángel Postigo Rodríguez
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.95] text-ash tracking-tight mb-8"
          >
            {t('hero.title1')} <br />
            <span className="italic font-light text-ash/80">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base md:text-lg text-ash/70 max-w-lg leading-relaxed mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-8"
          >
            <a
              href="#proyectos"
              className="flex items-center gap-3 bg-ash text-white px-8 py-4 rounded-sm font-mono text-xs tracking-[0.2em] uppercase hover:bg-ash/90 transition-colors border border-transparent hover:border-ember/50"
            >
              {t('hero.start')}
              <FiArrowDownRight size={16} className="text-ember" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash/60 hover:text-ember transition-colors border-b border-transparent hover:border-ember pb-1"
            >
              {t('hero.projects')} (CV)
            </a>
          </motion.div>
        </div>

        {/* Columna Derecha: Tarjeta de Perfil Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 hidden md:flex justify-end"
        >
          <div className="relative w-72 h-96 glass-panel p-3 group overflow-hidden bg-white/5 backdrop-blur-sm border border-ash/10 rounded-sm">
            {/* Foto del usuario */}
            <div className="w-full h-full relative overflow-hidden bg-ash/5">
              <img
                src="/profile.jpeg" 
                alt="Ángel Postigo"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
              />
              {/* Velo Azul Marino superpuesto que desaparece al hacer hover */}
              <div className="absolute inset-0 bg-ash/20 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>

            {/* Etiqueta flotante dorada */}
            <div className="absolute -left-4 top-12 bg-white border border-ember/30 px-4 py-2 shadow-sm transform -rotate-90 origin-bottom-left">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-ember">
                Full-Stack
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
