import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useRef } from "react";

// Fondo Animado: Rejilla Arquitectónica / Blueprint B2B
const BlueprintGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      // Necesitamos las coordenadas relativas al canvas (sección Contacto)
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial resize to match parent
    handleResize();

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      
      const gridSize = 50; 
      ctx.lineWidth = 1;
      
      // Dibujar verticales
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        
        const distToMouse = Math.abs(x - mouseX);
        const opacity = Math.max(0.01, 0.2 - (distToMouse / 300));
        
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`; // Champagne Gold
        ctx.stroke();
      }

      // Dibujar horizontales
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        
        const distToMouse = Math.abs(y - mouseY);
        const opacity = Math.max(0.01, 0.2 - (distToMouse / 300));
        
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`; 
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0 mix-blend-screen" />;
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="bg-transparent text-ash py-32 lg:py-48 px-6 md:px-12 relative min-h-screen flex items-center overflow-hidden">
      <BlueprintGrid />
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-[1px] bg-ember/20"
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
              {t('contact.subtitle')}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-[0.9] text-ash tracking-tighter mb-12">
              {t('contact.title1')} <br />
              <span className="text-ember italic">{t('contact.title2')}</span>
            </h2>
            <p className="text-base font-light text-ash/80 max-w-md leading-relaxed mb-12">
              {t('contact.desc')}
            </p>
            
            <div className="flex flex-col gap-6 font-mono text-xs uppercase tracking-[0.2em] text-ash/60">
              <MagneticButton className="w-fit">
                <a href="mailto:angelposrod@gmail.com" className="flex items-center gap-4 text-ash hover:text-ember transition-colors interactive">
                  angelposrod@gmail.com <FiArrowRight />
                </a>
              </MagneticButton>
              <MagneticButton className="w-fit">
                <a href="https://linkedin.com/in/angel-postigo-rodriguez" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-ash hover:text-ember transition-colors interactive">
                  LinkedIn Profile <FiArrowRight />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <form className="w-full max-w-md flex flex-col gap-8 bg-ink-light/20 p-8 border border-ember/10 backdrop-blur-sm">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder={t('contact.name')} 
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder={t('contact.email')} 
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <textarea 
                  placeholder={t('contact.message')} 
                  rows={4}
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase resize-none interactive"
                />
              </div>
              
              <MagneticButton className="mt-4">
                <button type="button" className="w-full py-4 border border-ember/40 text-ember font-mono text-xs uppercase tracking-[0.3em] hover:bg-ember hover:text-ink transition-colors duration-500 interactive">
                  {t('contact.send')}
                </button>
              </MagneticButton>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
