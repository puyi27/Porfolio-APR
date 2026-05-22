import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const StampedLabel = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.1, rotate: Math.random() * 4 - 2 }}
    whileInView={{ opacity: 1, scale: 1, rotate: Math.random() * 2 - 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ type: "spring", stiffness: 200, damping: 15, delay }}
    className="inline-block border-2 border-ash text-ash font-mono text-xs md:text-sm uppercase tracking-[0.2em] px-4 py-2 mix-blend-multiply transform hover:-translate-y-1 hover:bg-ash hover:text-ink transition-colors duration-300 interactive shadow-sm"
    style={{ borderRadius: "2px" }}
  >
    {children}
  </motion.div>
);

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="bg-transparent py-32 lg:py-48 px-6 md:px-12 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto border-t border-ash/20 pt-16 relative">
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-ash/40 uppercase tracking-widest">
          DOC. REF: 001 // MANIFIESTO
        </div>
        
        <h2 className="text-5xl md:text-8xl font-serif text-ash tracking-tighter mb-16 mix-blend-multiply">
          {t('about.title1')} <span className="italic">{t('about.title2')}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-7">
            <p className="text-xl md:text-3xl font-light text-ash/90 leading-[1.6] mix-blend-multiply mb-12">
              {t('about.bio1')}<span className="font-semibold text-ash">{t('about.bio_highlight')}</span>{t('about.bio2')}
              <br /><br />
              {t('about.bio3')}
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-12 pt-4">
            {/* Technical Stack Stamps */}
            <div>
              <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6 border-b border-ash/10 pb-4">
                Classified Core Stack
              </span>
              <div className="flex flex-wrap gap-3">
                <StampedLabel delay={0.1}>Node.js</StampedLabel>
                <StampedLabel delay={0.2}>React</StampedLabel>
                <StampedLabel delay={0.3}>Java</StampedLabel>
                <StampedLabel delay={0.4}>PHP</StampedLabel>
                <StampedLabel delay={0.5}>TypeScript</StampedLabel>
                <StampedLabel delay={0.6}>JavaScript</StampedLabel>
                <StampedLabel delay={0.7}>HTML5</StampedLabel>
                <StampedLabel delay={0.8}>CSS3</StampedLabel>
              </div>
            </div>
            
            {/* Language Modules */}
            <div>
              <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6 border-b border-ash/10 pb-4">
                Language Protocols
              </span>
              <div className="flex flex-wrap gap-3">
                <StampedLabel delay={0.1}>ES (Native)</StampedLabel>
                <StampedLabel delay={0.2}>EN (C1/B2)</StampedLabel>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6 border-b border-ash/10 pb-4">
                Behavioral Traits
              </span>
              <div className="flex flex-wrap gap-3">
                <StampedLabel delay={0.1}>Resilient</StampedLabel>
                <StampedLabel delay={0.2}>Team-oriented</StampedLabel>
                <StampedLabel delay={0.3}>Adaptable</StampedLabel>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default About;
