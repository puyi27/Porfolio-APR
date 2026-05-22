import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5s para la ceremonia de apertura
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Curva de animación editorial ultra-premium (lenta al empezar, rápida, lenta al frenar)
  const transition = { duration: 1.4, ease: [0.76, 0, 0.24, 1] };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[100] flex pointer-events-none">
          {/* Puerta Izquierda */}
          <motion.div 
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={transition}
            className="w-1/2 h-full bg-[#0a1120] border-r border-ember/10" // Deep Navy
          />
          {/* Puerta Derecha */}
          <motion.div 
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={transition}
            className="w-1/2 h-full bg-[#0a1120] border-l border-ember/10"
          />
          
          {/* Contenido Central Absoluto */}
          <motion.div 
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Texto Trazado Animado */}
            <div className="relative overflow-hidden px-8 py-4">
               {/* Efecto de máscara para revelar el texto suavemente */}
               <motion.div 
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                  transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
               >
                 <span className="font-mono text-xs md:text-sm uppercase tracking-[0.8em] text-ember text-center block" style={{ textShadow: "0px 0px 15px rgba(212,175,55,0.4)" }}>
                   SISTEMA INICIADO
                 </span>
               </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoaderScreen;
