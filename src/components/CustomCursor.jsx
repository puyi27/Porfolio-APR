import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // MotionValues directos a la GPU (Cero físicas elásticas = Cero sensación de lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    const updateMousePosition = (e) => {
      // Actualización inmediata sin suavizado ni retraso
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "a" ||
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.classList.contains("interactive")
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
    <>
      {/* Punto Central Inmediato */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-ember rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      {/* Anillo Exterior Inmediato (Sin físicas de arrastre) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-ember/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX, // Mismo valor instantáneo que el centro
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
