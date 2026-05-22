import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ceremonia de apertura de 2.5 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex">
          {/* Cortina Izquierda */}
          <motion.div 
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="w-1/2 h-full bg-[#0a192f] border-r border-ember/20 shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20"
          />
          {/* Cortina Derecha */}
          <motion.div 
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="w-1/2 h-full bg-[#0a192f] border-l border-ember/20 shadow-[-5px_0_30px_rgba(0,0,0,0.5)] z-20"
          />

          {/* Contenido Central (El Monolito) */}
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            {/* Trazado de monograma "A" en oro */}
            <div className="relative flex items-center justify-center mb-8 h-24 w-24">
              <svg width="100" height="100" viewBox="0 0 100 100" className="absolute drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <motion.path 
                  d="M 20 80 L 50 20 L 80 80 M 35 60 L 65 60" 
                  fill="transparent"
                  strokeWidth="2"
                  stroke="#D4AF37"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="mt-8 overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-ember drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              >
                SISTEMA INICIADO
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoaderScreen;
