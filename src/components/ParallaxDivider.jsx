import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[30vh] md:h-[50vh] overflow-hidden flex items-center justify-center border-y border-ember/20">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img 
          src="/abstract-bg.png" 
          alt="Estructura Abstracta" 
          className="w-full h-full object-cover opacity-80" 
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/10"></div>
    </section>
  );
};

export default ParallaxDivider;
