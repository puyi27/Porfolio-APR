import { motion } from "framer-motion";

const MarqueeDivider = ({ text }) => {
  return (
    <section className="py-24 bg-transparent overflow-hidden flex items-center">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        <h2 
          className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-8 select-none"
          style={{
            color: "rgba(10, 25, 47, 0.02)", // Casi transparente
            textShadow: "1px 1px 1px rgba(255, 255, 255, 0.9), -1px -1px 1px rgba(10, 25, 47, 0.15)" // Efecto bajorrelieve
          }}
        >
          {text} • {text} • {text} • {text} • 
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeDivider;
