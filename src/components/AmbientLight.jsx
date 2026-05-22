import { useEffect } from "react";

const AmbientLight = () => {
  return (
    <>
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(4vw, -4vh) scale(1.1); }
            66% { transform: translate(-3vw, 3vh) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 20s infinite alternate ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: -5s;
          }
          .animation-delay-4000 {
            animation-delay: -10s;
          }
        `}
      </style>
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-ink">
        
        {/* Capa de ruido (grain) para textura editorial premium */}
        <div 
          className="absolute inset-0 opacity-[0.06] z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        ></div>

        {/* Orbes de luz desenfocados (Efecto Aurora) */}
        {/* Orbe 1: Ember/Oro sutil */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] rounded-full bg-[#d4af37] opacity-[0.05] blur-[120px] animate-blob"></div>
        
        {/* Orbe 2: Navy / Azul profundo */}
        <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] min-w-[400px] min-h-[400px] rounded-full bg-[#0a192f] opacity-[0.5] blur-[150px] animate-blob animation-delay-2000"></div>
        
        {/* Orbe 3: Gris pálido/Plateado */}
        <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] rounded-full bg-[#cbd5e1] opacity-[0.03] blur-[140px] animate-blob animation-delay-4000"></div>

        {/* Viñeteado para integrar y no distraer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030712_100%)] opacity-80 z-10 pointer-events-none"></div>
      </div>
    </>
  );
};

export default AmbientLight;
