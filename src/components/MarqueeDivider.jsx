import { motion } from "framer-motion";

const MarqueeDivider = ({ text }) => {
  return (
    <section className="py-24 bg-transparent overflow-hidden flex items-center border-y border-ember/5 relative">
      {/* Sombra interior global para acentuar la hendidura arquitectónica */}
      <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        <h2 
          className="text-[15vw] md:text-[10vw] font-serif text-transparent tracking-tighter uppercase px-8 select-none"
          style={{
            /* Efecto Bajorrelieve (Engraved / Stamped) sobre el mármol */
            WebkitTextStroke: "1px rgba(212, 175, 55, 0.1)", // Ember ligero
            textShadow: "inset 2px 2px 5px rgba(0,0,0,0.5), 1px 1px 1px rgba(255,255,255,0.1)"
          }}
        >
          {text} • {text} • {text} • {text} • 
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeDivider;
