import { useEffect, useRef } from "react";

const AmbientLight = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;
    let particles = [];
    
    // Configuración adaptativa
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 30 : 70; // Menos partículas en móvil para rendimiento
    const maxDistance = isMobile ? 100 : 180; 
    const mouseRadius = 250; 

    let mouse = { x: null, y: null };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Movimiento ultra lento
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseRadius = Math.random() * 1.2 + 0.5;
        this.radius = this.baseRadius;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRadius - distance) / mouseRadius;
            
            // Repulsión magnética sutil
            this.x -= forceDirectionX * force * 0.5;
            this.y -= forceDirectionY * force * 0.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 175, 55, 0.4)"; // Color Ember (Oro pálido)
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance * 1.5) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - distance / (maxDistance * 1.5))})`;
             ctx.lineWidth = 0.5;
             ctx.moveTo(particles[i].x, particles[i].y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Canvas animado */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-70"
      />
      {/* Capa de viñeteado para dar profundidad e integrar con el fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030712_100%)] opacity-80 pointer-events-none"></div>
    </div>
  );
};

export default AmbientLight;
