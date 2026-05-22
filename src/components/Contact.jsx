import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const BlueprintGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 50;
      ctx.lineWidth = 1;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Distancia al ratón
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Opacidad base tenue (10%) + iluminación por proximidad
          const maxDist = 350;
          let opacity = 0.03; // Base hiper tenue para no sobrecargar
          if (distance < maxDist) {
            opacity += (1 - distance / maxDist) * 0.15; // Iluminación suave
          }
          
          ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`; // Dorado Champán
          
          // Draw rect
          ctx.strokeRect(x, y, gridSize, gridSize);
          
          // Detalles arquitectónicos (cruces en intersecciones)
          if (distance < maxDist * 0.6) {
            ctx.fillStyle = `rgba(212, 175, 55, ${opacity * 2})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    
    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="bg-transparent text-ash py-32 lg:py-48 px-6 md:px-12 relative min-h-screen flex items-center overflow-hidden">
      
      {/* Rejilla Arquitectónica Animada */}
      <BlueprintGrid />

      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-[1px] bg-ember/20 z-10"
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
            className="flex items-center justify-center lg:justify-end relative"
          >
            {/* Efecto blur de fondo para el form sobre la rejilla */}
            <div className="absolute inset-0 max-w-md bg-white/40 backdrop-blur-xl rounded-xl z-0 pointer-events-none border border-ash/10 shadow-lg"></div>
            
            <form className="w-full max-w-md flex flex-col gap-8 p-8 relative z-10">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder={t('contact.name')} 
                  className="w-full bg-transparent border-b border-ash/40 py-4 px-2 text-ash font-medium placeholder:text-ash/60 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder={t('contact.email')} 
                  className="w-full bg-transparent border-b border-ash/40 py-4 px-2 text-ash font-medium placeholder:text-ash/60 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <textarea 
                  placeholder={t('contact.message')} 
                  rows={4}
                  className="w-full bg-transparent border-b border-ash/40 py-4 px-2 text-ash font-medium placeholder:text-ash/60 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase resize-none interactive"
                />
              </div>
              
              <MagneticButton className="mt-4">
                <button type="button" className="w-full py-4 bg-ash text-ink font-mono text-xs uppercase tracking-[0.3em] hover:bg-ember hover:text-ink transition-colors duration-500 interactive shadow-md">
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
