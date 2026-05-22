import { useEffect } from "react";

const AmbientLight = () => {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-ink">
      
      {/* 
        Video Background 
        La etiqueta video reproducirá automáticamente (muted y loop) el archivo .mp4
      */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.85] mix-blend-multiply"
      >
        <source src="/marble-animation.mp4" type="video/mp4" />
        {/* Fallback a la imagen estática por si el video no carga */}
        <img src="/marble-bg.jpg" alt="Marble Background" className="w-full h-full object-cover" />
      </video>

      {/* Capa de ruido fotográfico para que el vídeo se vea integrado e hiperrealista */}
      <div 
        className="absolute inset-0 opacity-[0.2] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

    </div>
  );
};

export default AmbientLight;
