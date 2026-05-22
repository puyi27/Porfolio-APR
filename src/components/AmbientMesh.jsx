import { motion } from "framer-motion";

const AmbientMesh = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Orb Dorada (Top Left) */}
      <motion.div 
        animate={{ 
          x: [0, 80, 0], 
          y: [0, 60, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-ember/15 mix-blend-multiply filter blur-[120px]"
      />
      
      {/* Orb Azul Marino Profundo (Bottom Right) */}
      <motion.div 
        animate={{ 
          x: [0, -100, 0], 
          y: [0, -80, 0],
          scale: [1, 1.3, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#1E3A8A]/10 mix-blend-multiply filter blur-[140px]"
      />

      {/* Orb de transición suave (Center) */}
      <motion.div 
        animate={{ 
          x: [-60, 60, -60], 
          y: [40, -40, 40],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-ember/10 mix-blend-multiply filter blur-[100px]"
      />

    </div>
  );
};

export default AmbientMesh;
