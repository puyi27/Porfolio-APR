import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de sistema
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center text-ash font-mono overflow-hidden"
        >
          {/* Patrón de fondo para el loader */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundSize: "50px 50px",
            backgroundImage: "linear-gradient(to right, rgba(10,25,47,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,25,47,0.1) 1px, transparent 1px)"
          }}></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            <div className="relative flex items-center justify-center w-16 h-16">
              <div className="absolute inset-0 border border-ember/20 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-ember rounded-full animate-spin"></div>
              <div className="w-1.5 h-1.5 bg-ember rounded-full animate-pulse"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-ember">
                SYSTEM.INIT()
              </div>
              <div className="text-sm md:text-base font-serif uppercase tracking-widest text-ash">
                Ángel Postigo
              </div>
            </div>
            
            {/* Barra de progreso de mentira */}
            <div className="w-48 h-[1px] bg-ember/20 mt-4 overflow-hidden relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-ember"
              />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderScreen;
