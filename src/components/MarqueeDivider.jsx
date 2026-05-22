import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const MarqueeDivider = ({ text }) => {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.05 * (delta / 16);
    // Añadimos la velocidad de scroll al movimiento base
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.current += moveBy;
  });

  return (
    <section className="py-24 bg-transparent overflow-hidden flex items-center">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {/* Efecto Bajorrelieve grabado en el mármol usando text-shadow sutil */}
        <h2 
          className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-8 select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(100, 116, 139, 0.1)", // Ash muy tenue
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.05), -1px -1px 2px rgba(255, 255, 255, 0.9)" // Engraved effect en el mármol
          }}
        >
          {text} • {text} • {text} • {text} • {text} • {text} •
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeDivider;
