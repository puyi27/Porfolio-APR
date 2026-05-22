import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const REPOS = [
    {
      name: "quavemind_final",
      description: t('projects.repo1_desc'),
      language: "JavaScript",
      github: "https://github.com/puyi27/quavemind_final",
      image: "/quavemind.png"
    },
    {
      name: "FailureMap",
      description: t('projects.repo2_desc'),
      language: "TypeScript",
      github: "https://github.com/puyi27/FailureMap",
      image: "/statuspage.png"
    },
    {
      name: "StatusPage",
      description: t('projects.repo3_desc'),
      language: "TypeScript",
      github: "https://github.com/puyi27/StatusPage",
      image: "/statuspage.png"
    },
    {
      name: "CAT-LOGO",
      description: t('projects.repo5_desc'),
      language: "JavaScript",
      github: "https://github.com/puyi27/CAT-LOGO",
      image: "/agency.png"
    }
  ];

  const CAROUSEL_ITEMS = [...REPOS, ...REPOS];

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
            {t('projects.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ash tracking-tight">
            {t('projects.title1')} <br/> {t('projects.title2')}
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
            <div key={i} className="w-[85vw] md:w-[400px] lg:w-[450px] flex-shrink-0 mx-4">
              <TiltCard>
                {/* Toda la tarjeta es clickeable y lleva a GitHub */}
                <a 
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-[450px] bg-ink-light border border-ember/20 flex flex-col relative group hover:border-ember/60 shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-700 rounded-xl cursor-pointer overflow-hidden"
                >
                  
                  {/* Image Header */}
                  <div className="h-48 w-full relative overflow-hidden bg-ink border-b border-ember/10 flex-shrink-0">
                    {repo.image ? (
                      <img src={repo.image} alt={repo.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-ash/5 to-transparent"></div>
                    )}
                    <div className="absolute inset-0 bg-ink/20 mix-blend-multiply"></div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember mb-2">{t('projects.source_code')}</span>
                      </div>
                      {/* Flecha indicativa superior */}
                      <div className="text-ash/30 group-hover:text-ember group-hover:rotate-45 transition-all duration-500">
                        <FiArrowUpRight size={24} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif text-ash group-hover:text-ember transition-colors duration-700 mb-3 tracking-tight truncate">
                      {repo.name}
                    </h3>
                    
                    <p className="text-sm text-ash/80 leading-relaxed font-light line-clamp-3">
                      {repo.description}
                    </p>

                    <div className="mt-auto pt-6 flex flex-wrap gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash bg-ink px-3 py-1.5 border border-ember/20 rounded-sm shadow-sm">
                        {repo.language}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash/50 px-3 py-1.5 rounded-sm flex items-center">
                        {t('projects.view_repo')}
                      </span>
                    </div>
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
