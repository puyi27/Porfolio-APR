import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { FiArrowUpRight } from "react-icons/fi";

const REPOS = [
  {
    name: "quavemind_final",
    description: "TFG de Desarrollo de Aplicaciones Web. Plataforma integral desplegada online.",
    language: "JavaScript",
    github: "https://github.com/puyi27/quavemind_final",
  },
  {
    name: "FailureMap",
    description: "Aplicación interactiva y visual para monitorización de errores (Failure Mapping).",
    language: "TypeScript",
    github: "https://github.com/puyi27/FailureMap",
  },
  {
    name: "StatusPage",
    description: "Servicio de estado y telemetría de APIs para reporte de incidencias en tiempo real.",
    language: "TypeScript",
    github: "https://github.com/puyi27/StatusPage",
  },
  {
    name: "CALENDAR",
    description: "Sistema de gestión de tiempos, citas y organización estructurada.",
    language: "TypeScript",
    github: "https://github.com/puyi27/CALENDAR",
  },
  {
    name: "CAT-LOGO",
    description: "Componentes visuales e identidades creativas con despliegue instantáneo.",
    language: "JavaScript",
    github: "https://github.com/puyi27/CAT-LOGO",
  }
];

const CAROUSEL_ITEMS = [...REPOS, ...REPOS];

const Projects = () => {
  return (
    <section id="proyectos" className="relative py-32 lg:py-48 bg-transparent text-ash overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
            03 // Repositorios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ash tracking-tight">
            Sistemas <br/> Escalables.
          </h2>
        </motion.div>
      </div>

      {/* Contenedor del Carrusel Infinito con Framer Motion */}
      <div className="relative w-full overflow-hidden flex">
        
        {/* Gradientes laterales para suavizar la entrada y salida */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          className="flex w-max py-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {CAROUSEL_ITEMS.map((repo, i) => (
            <div key={i} className="w-[85vw] md:w-[450px] lg:w-[500px] flex-shrink-0 h-[400px] mx-4">
              <TiltCard>
                {/* Toda la tarjeta es clickeable y lleva a GitHub */}
                <a 
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full bg-ink-light border border-ember/20 p-8 md:p-10 flex flex-col relative group hover:border-ember/60 shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-700 rounded-xl cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember mb-2">Código Fuente</span>
                    </div>
                    {/* Flecha indicativa superior */}
                    <div className="text-ash/30 group-hover:text-ember group-hover:rotate-45 transition-all duration-500">
                      <FiArrowUpRight size={28} />
                    </div>
                  </div>

                  <h3 className="text-3xl font-serif text-ash group-hover:text-ember transition-colors duration-700 mb-4 tracking-tight">
                    {repo.name}
                  </h3>
                  
                  <p className="text-sm text-ash/80 leading-relaxed font-light mb-auto">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash bg-ink px-3 py-1.5 border border-ember/20 rounded-sm shadow-sm">
                      {repo.language}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash/50 px-3 py-1.5 rounded-sm flex items-center">
                      Ver Repositorio &rarr;
                    </span>
                  </div>
                </a>
              </TiltCard>
            </div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
};

export default Projects;
