import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  
  // Posición base
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Muelle ultratenso: casi sin lag, pero con suficiente suavizado para sentirse "pesado" como cristal
  const springConfig = { damping: 40, stiffness: 600, mass: 0.05 };
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

  const isHoverState = isHovering || isHoveringProject;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        backdropFilter: isHoverState ? "none" : "invert(1) grayscale(1)",
        WebkitBackdropFilter: isHoverState ? "none" : "invert(1) grayscale(1)",
      }}
      animate={{
        width: isHoverState ? 12 : 56,
        height: isHoverState ? 12 : 56,
        backgroundColor: isHoverState ? "#D4AF37" : "rgba(255, 255, 255, 0.05)",
        border: isHoverState ? "none" : "1px solid rgba(255,255,255,0.15)",
        boxShadow: isHoverState ? "0 0 20px rgba(212,175,55,0.5)" : "none"
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    />
  );
};

export default CustomCursor;
