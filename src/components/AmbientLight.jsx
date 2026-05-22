import { useEffect } from "react";

const AmbientLight = () => {
  return (
    <>
      <style>
        {`
          @keyframes driftMarble {
            0% { transform: scale(1.05) translate(0%, 0%) rotate(0deg); }
            50% { transform: scale(1.15) translate(-1%, 1%) rotate(0.5deg); }
            100% { transform: scale(1.05) translate(1%, -1%) rotate(-0.5deg); }
          }
          .animate-marble {
            animation: driftMarble 45s ease-in-out infinite alternate;
          }
        `}
      </style>
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-ink">
        
        {/* Capa de textura Mármol puro */}
        <div 
          className="absolute inset-[-10%] w-[120%] h-[120%] animate-marble opacity-[0.7]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004 0.008' numOctaves='5' result='n'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.85 0 0 0 0 0.88 0 0 0 0 0.95 0 0 0 4.5 -1.8' in='n' result='c'/%3E%3CfeGaussianBlur stdDeviation='1.5' in='c' result='b'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23F8F9FA'/%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Ligeros toques de color Oro (Ember) y Navy difuminados para enriquecer el mármol */}
        <div className="absolute top-[5%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[5%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0A192F] opacity-[0.04] blur-[120px] mix-blend-multiply"></div>
        
        {/* Filtro extra de grano fotográfico finísimo para darle realismo a la piedra */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        ></div>

      </div>
    </>
  );
};

export default AmbientLight;
