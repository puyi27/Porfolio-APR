import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  
  // Posición base
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Física de muelle súper suave (Fluid inercia)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.1 };
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

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-ash/10 pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[2px]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? (isHoveringProject ? 80 : 48) : 24,
        height: isHovering ? (isHoveringProject ? 80 : 48) : 24,
        backgroundColor: isHovering ? "rgba(248, 249, 250, 0.95)" : "rgba(100,116,139,0.1)", // F8F9FA is ink
        border: isHovering ? "none" : "1px solid rgba(100,116,139,0.3)",
        mixBlendMode: isHovering ? (isHoveringProject ? "normal" : "exclusion") : "normal"
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
