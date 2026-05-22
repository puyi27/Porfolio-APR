import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  
  // Posición base instántanea (Zero-Lag) directamente atada a framer-motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    const updateMousePosition = (e) => {
      // Directamente al DOM sin físicas para latencia CERO
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isProject = target.closest(".project-card");
      
      if (isProject) {
        setIsHoveringProject(true);
        setIsHovering(true);
      } else if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive")
      ) {
        setIsHovering(true);
        setIsHoveringProject(false);
      } else {
        setIsHovering(false);
        setIsHoveringProject(false);
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
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      // Animaciones de estado (tamaño y color) con físicas tensas y rápidas
      animate={{
        width: isHoveringProject ? 80 : (isHovering ? 48 : 32),
        height: isHoveringProject ? 80 : (isHovering ? 48 : 32),
        backgroundColor: isHoveringProject ? "rgba(212, 175, 55, 1)" : (isHovering ? "rgba(212, 175, 55, 0.2)" : "rgba(255, 255, 255, 0.1)"),
        backdropFilter: isHoveringProject ? "none" : "invert(1) grayscale(1) blur(1px)",
        WebkitBackdropFilter: isHoveringProject ? "none" : "invert(1) grayscale(1) blur(1px)",
        border: isHoveringProject ? "none" : (isHovering ? "1px solid rgba(212, 175, 55, 0.8)" : "1px solid rgba(100, 116, 139, 0.3)")
      }}
      transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.2 }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringProject ? 1 : 0 }}
        className="text-[10px] text-ink font-mono tracking-widest font-bold"
      >
        VIEW
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
