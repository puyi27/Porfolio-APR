import { motion } from "framer-motion";
import { useState, useId, useRef, useEffect } from "react";
import TiltCard from "./TiltCard";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

// Componente Interno para la Imagen Líquida
const LiquidImage = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const id = useId(); 
  
  return (
    <div 
      className="w-full h-full relative overflow-hidden bg-ink"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0">
        <filter id={`liquid-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G">
            <animate 
              attributeName="scale" 
              values={isHovered ? "0;15" : "15;0"} 
              dur="0.6s" 
              fill="freeze" 
              begin={isHovered ? "indefinite" : "0s"} 
            />
          </feDisplacementMap>
        </filter>
      </svg>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          style={{ filter: isHovered ? `url(#liquid-${id})` : 'none', transition: 'filter 0.6s ease' }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-ash/5 to-transparent"></div>
      )}
    </div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const scrollRef = useRef(null);

  const REPOS = [
    {
      name: "quavemind_final",
      description: t('projects.repo1_desc'),
      language: "JavaScript",
      github: "https://github.com/puyi27/quavemind_final",
      image: "/quavemind.png?v=2"
    },
    {
      name: "StatusPage",
      description: t('projects.repo3_desc'),
      language: "TypeScript",
      github: "https://github.com/puyi27/StatusPage",
      image: "/statuspage.png?v=2"
    },
    {
      name: "CALENDAR",
      description: t('projects.repo4_desc'),
      language: "TypeScript",
      github: "https://github.com/puyi27/CALENDAR",
      image: "/calendar.png?v=2"
    },
    {
      name: "CAT-LOGO",
      description: t('projects.repo5_desc'),
      language: "JavaScript",
      github: "https://github.com/puyi27/CAT-LOGO",
      image: "/agency.png?v=2"
    }
  ];

  // Cuadruplicamos los items para asegurar un scroll infinito fluido incluso en pantallas ultra anchas
  const CAROUSEL_ITEMS = [...REPOS, ...REPOS, ...REPOS, ...REPOS];

  useEffect(() => {
    let animationId;
    let isInteracting = false;
    let scrollPos = 0;
    
    const slider = scrollRef.current;
    if(!slider) return;

    const autoScroll = () => {
      // Si el usuario no está interactuando (táctil o click), avanzamos automáticamente
      if(!isInteracting) {
         scrollPos += 0.8; // Velocidad del scroll automático
         
         // Si llegamos a la mitad del contenido clonado, volvemos al principio sin que se note
         if(scrollPos >= slider.scrollWidth / 2) {
            scrollPos = 0;
         }
         slider.scrollLeft = scrollPos;
      } else {
         // Si está interactuando, sincronizamos nuestra posición interna con su scroll nativo
         scrollPos = slider.scrollLeft;
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    
    autoScroll();
    
    const handleInteractStart = () => isInteracting = true;
    const handleInteractEnd = () => isInteracting = false;
    
    // Listeners para touch (móvil) y rueda del ratón nativa
    slider.addEventListener('touchstart', handleInteractStart, { passive: true });
    slider.addEventListener('touchend', handleInteractEnd);
    
    let wheelTimeout;
    const handleWheel = () => {
       isInteracting = true;
       clearTimeout(wheelTimeout);
       wheelTimeout = setTimeout(handleInteractEnd, 150);
    };
    slider.addEventListener('wheel', handleWheel, { passive: true });

    // Lógica para drag nativo con ratón (click and drag) en escritorio
    let isDown = false;
    let startX;
    let startScrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      isInteracting = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      startScrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      isInteracting = false;
      slider.style.cursor = 'grab';
    };
    const onMouseUp = () => {
      isDown = false;
      isInteracting = false;
      slider.style.cursor = 'grab';
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Multiplicador de velocidad de arrastre
      slider.scrollLeft = startScrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener('touchstart', handleInteractStart);
      slider.removeEventListener('touchend', handleInteractEnd);
      slider.removeEventListener('wheel', handleWheel);
      
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return (
    <section id="proyectos" className="relative py-32 lg:py-48 bg-transparent text-ash overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
            {t('projects.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ash tracking-tight">
            {t('projects.title1')} <br/> {t('projects.title2')}
          </h2>
        </motion.div>
      </div>

      {/* Contenedor del Carrusel Infinito Nativo */}
      <div className="relative w-full overflow-hidden interactive group">
        
        {/* Gradientes laterales */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>

        {/* Scroll Container nativo. Ocultamos la barra de scroll y permitimos rebosamiento horizontal */}
        <div 
          ref={scrollRef}
          className="flex w-full py-12 overflow-x-auto cursor-grab"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />
          
          {CAROUSEL_ITEMS.map((repo, i) => (
            <div key={i} className="w-[85vw] md:w-[400px] lg:w-[450px] flex-shrink-0 mx-4">
              <TiltCard>
                <a 
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card block w-full h-[450px] bg-ink-light border border-ember/20 flex flex-col relative hover:border-ember/60 shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-700 rounded-xl overflow-hidden"
                >
                  
                  {/* Image Header con efecto Líquido */}
                  <div className="h-48 w-full relative overflow-hidden border-b border-ember/10 flex-shrink-0">
                    <LiquidImage src={repo.image} alt={repo.name} />
                  </div>

                  <div className="p-8 flex flex-col flex-grow bg-ink">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember mb-2">{t('projects.source_code')}</span>
                      </div>
                      <div className="text-ash/30 group-hover:text-ember group-hover:rotate-45 transition-all duration-500">
                        <FiArrowUpRight size={24} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif text-ash group-hover:text-ember transition-colors duration-700 mb-3 tracking-tight truncate">
                      {repo.name}
                    </h3>
                    
                    <p className="text-sm text-ash/80 leading-relaxed font-light line-clamp-3 pointer-events-none">
                      {repo.description}
                    </p>

                    <div className="mt-auto pt-6 flex flex-wrap gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash bg-ink-light px-3 py-1.5 border border-ember/20 rounded-sm shadow-sm pointer-events-none">
                        {repo.language}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash/50 px-3 py-1.5 rounded-sm flex items-center pointer-events-none">
                        {t('projects.view_repo')}
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Projects;
