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
            animation: blob 25s infinite alternate ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: -8s;
          }
          .animation-delay-4000 {
            animation-delay: -16s;
          }
        `}
      </style>
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-transparent">
        
        {/* Capa de textura sutil (Grano fotográfico para simular el papel/mármol) */}
        <div 
          className="absolute inset-0 opacity-[0.3] z-20 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        ></div>

        {/* Orbes de acuarela móviles (Light Mode Aurora) */}
        
        {/* Orbe 1: Navy/Azul Profundo - muy diluido */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] rounded-full bg-[#0A192F] opacity-[0.06] blur-[120px] animate-blob"></div>
        
        {/* Orbe 2: Oro/Champagne */}
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] min-w-[400px] min-h-[400px] rounded-full bg-[#D4AF37] opacity-[0.07] blur-[130px] animate-blob animation-delay-2000"></div>
        
        {/* Orbe 3: Gris perla / Plata para dar textura de veteado marmóreo */}
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] rounded-full bg-[#94A3B8] opacity-[0.08] blur-[140px] animate-blob animation-delay-4000"></div>

      </div>
    </>
  );
};

export default AmbientLight;
