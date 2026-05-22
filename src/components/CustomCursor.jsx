import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Posición base
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Física de inercia ULTRA-TENSA (cero sensación de lag pero orgánico)
  const springConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-lg"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 16 : 80,
        height: isHovering ? 16 : 80,
        backgroundColor: isHovering ? "#D4AF37" : "transparent", // Ember solid on hover
        border: isHovering ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: isHovering ? "none" : "invert(1) grayscale(1) blur(2px)",
        WebkitBackdropFilter: isHovering ? "none" : "invert(1) grayscale(1) blur(2px)"
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    />
  );
};

export default CustomCursor;
