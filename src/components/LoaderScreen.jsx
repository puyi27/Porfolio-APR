import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoaderScreen = ({ onComplete }) => {
  const [startSplit, setStartSplit] = useState(false);

  useEffect(() => {
    // Después de 2 segundos, iniciar la apertura de cortinas
    const timer = setTimeout(() => {
      setStartSplit(true);
    }, 2000);
    
    // Después de que las cortinas se abran (1s de animación), desmontar
    const unmountTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
      {/* Top Half */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: startSplit ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-ash origin-top"
      />
      
      {/* Bottom Half */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: startSplit ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-ash origin-bottom flex items-start justify-center"
      >
        {/* Contenedor del monograma / mensaje */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: startSplit ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-6 flex flex-col items-center"
        >
          {/* Línea dorada que se dibuja */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="h-px bg-ember mb-4"
          />
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-mono text-[10px] tracking-[0.4em] uppercase text-ember"
          >
            Sistema Iniciado
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoaderScreen;
