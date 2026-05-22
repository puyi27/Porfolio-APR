import React from "react";

const MarqueeDivider = ({ text }) => {
  const content = `${text} • ${text} • ${text} • ${text} • `;
  
  return (
    <section className="py-24 bg-transparent overflow-hidden flex items-center">
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div 
        className="flex whitespace-nowrap w-max"
        style={{
          animation: "infinite-scroll 40s linear infinite",
          willChange: "transform"
        }}
      >
        <div className="flex">
          <h2 
            className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-4 select-none"
            style={{
              color: "rgba(22, 58, 110, 0.04)",
              textShadow: "2px 2px 3px rgba(255, 255, 255, 1), -2px -2px 4px rgba(22, 58, 110, 0.25)"
            }}
          >
            {content}
          </h2>
        </div>
        <div className="flex">
          <h2 
            className="text-[15vw] md:text-[10vw] font-serif tracking-tighter uppercase px-4 select-none"
            style={{
              color: "rgba(22, 58, 110, 0.04)",
              textShadow: "2px 2px 3px rgba(255, 255, 255, 1), -2px -2px 4px rgba(22, 58, 110, 0.25)"
            }}
          >
            {content}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MarqueeDivider;
