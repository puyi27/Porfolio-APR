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
          className="text-[15vw] md:text-[10vw] font-serif uppercase px-8 select-none tracking-tighter"
          style={{
            color: "rgba(245, 245, 250, 0.1)", // Color del mármol
            textShadow: "1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(100,116,139,0.15)" // Efecto bajorrelieve
          }}
        >
          {text} • {text} • {text} • {text} • 
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeDivider;
