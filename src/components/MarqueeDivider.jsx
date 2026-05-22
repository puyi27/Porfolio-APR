import { motion } from "framer-motion";

const MarqueeDivider = ({ text }) => {
  const content = `${text} • ${text} • ${text} • ${text} • `;
  
  return (
    <section className="py-24 bg-transparent overflow-hidden flex items-center">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap w-max"
      >
        <div className="flex">
          <h2 
            className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-4 select-none"
            style={{
              color: "rgba(10, 25, 47, 0.02)",
              textShadow: "1px 1px 1px rgba(255, 255, 255, 0.9), -1px -1px 1px rgba(10, 25, 47, 0.15)"
            }}
          >
            {content}
          </h2>
        </div>
        <div className="flex">
          <h2 
            className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-4 select-none"
            style={{
              color: "rgba(10, 25, 47, 0.02)",
              textShadow: "1px 1px 1px rgba(255, 255, 255, 0.9), -1px -1px 1px rgba(10, 25, 47, 0.15)"
            }}
          >
            {content}
          </h2>
        </div>
      </motion.div>
    </section>
  );
};

export default MarqueeDivider;
