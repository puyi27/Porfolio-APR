import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

import { useLanguage } from "../context/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  const EXPERIENCE_DATA = [
    {
      year: t('experience.job2_year'),
      title: t('experience.job2_title'),
      company: t('experience.job2_company'),
      description: t('experience.job2_desc'),
      tech: ["Node.js", "React", "Docker", "Sistemas Distribuidos"]
    },
    {
      year: t('experience.job1_year'),
      title: t('experience.job1_title'),
      company: t('experience.job1_company'),
      description: t('experience.job1_desc'),
      tech: ["PHP", "Java", "JavaScript", "HTML5/CSS3"]
    },
    {
      year: t('experience.job3_year'),
      title: t('experience.job3_title'),
      company: t('experience.job3_company'),
      description: t('experience.job3_desc'),
      tech: ["Lógica", "Matemáticas", "Tecnología"]
    }
  ];

  return (
    <section id="trayectoria" className="py-32 lg:py-48 bg-transparent text-ash relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32 text-center md:text-left"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
            {t('experience.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ash tracking-tight">
            {t('experience.title1')} <br className="hidden md:block" /> {t('experience.title2')}
          </h2>
        </motion.div>

        {/* Contenedor del Timeline Simple */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Línea central estática sencilla */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-ember/20 md:-translate-x-1/2"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {EXPERIENCE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Nodo central (aparece y desaparece) */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-ink border-2 border-ember rounded-full -translate-x-1/2 z-10"
                  />
                  
                  {/* Espaciador para equilibrar el flex en Desktop */}
                  <div className="hidden md:block md:w-1/2"></div>
                  
                  {/* Contenido (Tarjeta que aparece y desaparece) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <TiltCard>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-ink-light border border-ember/10 p-8 shadow-md hover:shadow-lg hover:shadow-ember/5 transition-all duration-500 rounded-xl group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-ash/10 group-hover:bg-ember/50 transition-colors duration-500"></div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-xs text-ember tracking-widest">{item.year}</span>
                          <div className="h-[1px] flex-grow bg-ember/10"></div>
                        </div>

                        <h3 className="text-2xl font-serif text-ash mb-2 group-hover:text-ember transition-colors duration-500">{item.title}</h3>
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-ash/50 mb-6">{item.company}</h4>
                        
                        <p className="text-sm text-ash/80 leading-relaxed font-light mb-8">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t, i) => (
                            <span key={i} className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash bg-ember/5 px-2 py-1 rounded-sm border border-ember/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </TiltCard>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
