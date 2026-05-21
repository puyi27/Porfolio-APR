import { useEffect, useRef } from "react";

const CodeField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement.offsetWidth;
    let height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");
    const fontSize = 14;
    let columns = width / fontSize;
    let drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(250, 250, 250, 0.1)"; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(197, 160, 89, 0.4)"; // Champagne gold
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize > 0) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      columns = width / fontSize;
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-50 z-0"
    />
  );
};

export default CodeField;
