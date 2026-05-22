import { useEffect } from "react";

const AmbientLight = () => {
  return (
    <>
      <style>
        {`
          @keyframes tide {
            0% { transform: scale(1.05) translate(0%, 0%); }
            50% { transform: scale(1.1) translate(-1.5%, 1.5%); }
            100% { transform: scale(1.05) translate(1%, -1%); }
          }
          .animate-tide {
            animation: tide 40s ease-in-out infinite alternate;
          }
        `}
      </style>
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-ink">
        
        {/* Filtro SVG Mágico: Distorsión de Líquido / Marea */}
        <svg className="hidden">
          <filter id="liquidTide">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.005" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.003 0.005; 0.005 0.003; 0.003 0.005" dur="30s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Imagen de fondo con la distorsión líquida (Marea) */}
        {/* Usamos el filtro SVG para deformar la imagen de mármol como si fuera líquido */}
        <div 
          className="absolute inset-[-10%] w-[120%] h-[120%] animate-tide opacity-[0.85]"
          style={{
            backgroundImage: `url("/marble-bg.jpg?v=3")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'url(#liquidTide)'
          }}
        ></div>

        {/* Fallback de color por si la imagen tarda en cargar */}
        <div className="absolute inset-0 bg-ink -z-10"></div>

        {/* Capa de ruido fotográfico finísimo para integrar colores y dar textura real */}
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
