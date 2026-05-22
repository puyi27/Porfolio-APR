import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  const EXPERIENCE_DATA = [
    {
      year: t('experience.job1_year'),
      title: t('experience.job1_title'),
      company: t('experience.job1_company'),
      description: t('experience.job1_desc'),
      tech: ["Java", "JavaScript", "PHP", "Web Architectures"]
    },
    {
      year: t('experience.job2_year'),
      title: t('experience.job2_title'),
      company: t('experience.job2_company'),
      description: t('experience.job2_desc'),
      tech: ["Telemetry", "Agile", "Dashboards", "Hardware Integration"]
    },
    {
      year: t('experience.job3_year'),
      title: t('experience.job3_title'),
      company: t('experience.job3_company'),
      description: t('experience.job3_desc'),
      tech: ["Logic", "Mathematics", "Technology"]
    }
  ];

  return (
    <section id="trayectoria" className="py-32 lg:py-48 bg-transparent text-ash relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
            {t('experience.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-ash tracking-tight">
            {t('experience.title1')} <br className="hidden md:block" /> {t('experience.title2')}
          </h2>
        </motion.div>

        <div className="flex flex-col border-b border-ember/20">
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col lg:flex-row lg:items-start py-12 md:py-16 border-t border-ember/20 hover:bg-ember/[0.02] transition-colors duration-500 px-4 -mx-4 rounded-xl lg:rounded-none lg:mx-0 lg:px-0"
            >
              {/* Timeline Year */}
              <div className="w-full lg:w-1/4 mb-6 lg:mb-0 pt-2">
                <div className="flex items-center gap-4 lg:block">
                  <span className="font-mono text-sm md:text-base text-ember tracking-widest">{item.year}</span>
                  <div className="h-[1px] flex-grow bg-ember/20 lg:hidden"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full lg:w-3/4 flex flex-col lg:pl-12">
                <h3 className="text-2xl md:text-4xl font-serif text-ash mb-3 group-hover:text-ember transition-colors duration-500">
                  {item.title}
                </h3>
                <h4 className="font-mono text-xs uppercase tracking-widest text-ash/50 mb-8">
                  {item.company}
                </h4>
                
                <p className="text-base md:text-lg text-ash/70 leading-relaxed font-light mb-10 max-w-3xl">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {item.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ash/80 px-3 py-1.5 rounded-full border border-ember/20 bg-ink/50 group-hover:border-ember/50 group-hover:text-ember transition-colors duration-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
