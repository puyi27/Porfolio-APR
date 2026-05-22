import { motion } from "framer-motion";
import { FiArrowDownRight, FiDownload } from "react-icons/fi";
import MagneticButton from "./MagneticButton";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Animación de texto letra a letra (Staggered Reveal)
const StaggeredText = ({ text, delay = 0 }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Efecto de texto revuelto (Cyber/Scramble)
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};


const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-transparent pt-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Layout en 2 columnas para simetría perfecta */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full">
          
          {/* COLUMNA IZQUIERDA: Texto Principal */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-ember"></div>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-ember">
                <ScrambleText text="Ángel Postigo Rodríguez" />
              </span>
            </motion.div>

            {/* Botón Descargar CV */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <a 
                  href="/cv.pdf" 
                  download="CV_Angel_Postigo.pdf"
                  className="inline-flex items-center gap-4 border border-ember/30 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ash hover:bg-ember hover:text-ink transition-colors duration-500 interactive group"
                >
                  {t('hero.download_cv')} <FiDownload className="group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </MagneticButton>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-[7vw] lg:text-[6.5rem] font-serif leading-[0.9] text-ash tracking-tighter relative z-30 whitespace-nowrap">
              <span className="block overflow-hidden pb-2">
                <StaggeredText text={t('hero.title1')} delay={0.1} />
              </span>
              <span className="block text-ash/60 ml-8 md:ml-24 overflow-hidden pb-2 italic">
                <StaggeredText text={t('hero.title2')} delay={0.3} />
              </span>
            </h1>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl relative z-30"
            >
              <p className="text-lg md:text-xl font-light text-ash/80 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-4 flex items-center gap-8 relative z-30"
            >
              <MagneticButton>
                <a 
                  href="#contacto" 
                  className="group flex items-center gap-4 bg-ash text-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-ember transition-colors duration-500 interactive"
                >
                  <span>{t('hero.start')}</span>
                  <FiArrowDownRight className="group-hover:rotate-45 transition-transform duration-500" size={18} />
                </a>
              </MagneticButton>
              
              <a 
                href="#proyectos"
                className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ash/60 hover:text-ash transition-colors duration-500 interactive group"
              >
                <div className="w-8 h-[1px] bg-ash/30 group-hover:w-12 group-hover:bg-ash transition-all duration-500"></div>
                {t('hero.projects')}
              </a>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Foto y Sello Circular */}
          <div className="flex justify-center lg:justify-end items-center relative order-1 lg:order-2">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] flex items-center justify-center z-20"
            >
              {/* Foto central equilibrada */}
              <div className="absolute inset-8 md:inset-10 lg:inset-12 rounded-full overflow-hidden border-2 border-ember/30 z-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] group">
                <img src="/profile.jpeg" alt="Ángel Postigo" className="w-full h-full object-cover group-hover:grayscale transition-all duration-700" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-ink/10 transition-colors duration-700"></div>
              </div>

              {/* Anillo de texto giratorio simétrico */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-ember overflow-visible">
                  {/* El radio del path reducido para que el texto no se corte en el viewBox */}
                  <path id="circlePath" d="M 50, 50 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" fill="none" />
                  <text fontSize="8.5" letterSpacing="4.5">
                    <textPath href="#circlePath" className="uppercase font-mono">
                      Full Stack Engineer • Ángel Postigo •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Indicador de scroll animado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ash/50 rotate-90 origin-left translate-y-8">{t('hero.scroll')}</span>
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-ember to-transparent relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full bg-ember"></div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
