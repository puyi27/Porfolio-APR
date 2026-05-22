import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2 segundos de ceremonia de apertura
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          
          {/* Cortina Superior Navy */}
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0f172a] z-10" // Color base Navy (slate-900)
          />
          
          {/* Cortina Inferior Navy */}
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0f172a] z-10" 
          />

          {/* Contenido Central: El Monolito */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 flex flex-col items-center justify-center"
          >
             {/* Línea dorada dibujándose */}
             <motion.div
               initial={{ width: 0 }}
               animate={{ width: "240px" }}
               transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
               className="h-[1px] bg-[#D4AF37] opacity-80 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
             />
             
             {/* Texto de precisión apareciendo debajo de la línea */}
             <motion.span
               initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
               className="font-mono text-[9px] tracking-[0.5em] text-[#D4AF37] uppercase mt-4"
             >
               Sistema Iniciado
             </motion.span>
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoaderScreen;
