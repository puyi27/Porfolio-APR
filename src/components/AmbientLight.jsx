import { useEffect, useRef } from "react";

const AmbientLight = () => {
  const lightRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lightRef.current) {
            lightRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(10, 25, 47, 0.04), transparent 60%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={lightRef}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
    />
  );
};

export default AmbientLight;
