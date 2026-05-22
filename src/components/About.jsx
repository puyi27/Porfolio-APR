import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TiltCard from "./TiltCard";
import { useLanguage } from "../context/LanguageContext";
import confetti from "canvas-confetti";

const TerminalProfile = () => {
  const { t } = useLanguage();
  
  // Terminal sequence that looks like a system boot
  const sequence = [
    `> system.init()`,
    `[OK] Core modules loaded...`,
    `> cat profile.json`,
    `{`,
    `  "id": "24527475E",`,
    `  "name": "Ángel Postigo",`,
    `  "role": "Full Stack Developer",`,
    `  "status": "Resilient & Committed",`,
    `  "bio": "${t('about.bio1')} ${t('about.bio_highlight')} ${t('about.bio2')}"`,
    `}`
  ];

  const codeString = sequence.join('\n');
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(codeString.substring(0, i));
      i++;
      if (i > codeString.length) clearInterval(interval);
    }, 20); // Fast typing
    return () => clearInterval(interval);
  }, [codeString]);

  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#D4AF37', '#ffffff', '#64748B']; // Ember, White, Ash

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        zIndex: 9999
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div 
      className="font-mono text-[10px] sm:text-[11px] text-ash/80 leading-relaxed whitespace-pre-wrap font-light cursor-pointer interactive"
      onClick={triggerConfetti}
      title="Click me!"
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3 bg-ember align-middle ml-1"
      />
    </div>
  );
};

const TechnicalManifesto = () => {
  const skills = [
    { name: "Node.js", rotate: -2 },
    { name: "React", rotate: 3 },
    { name: "TypeScript", rotate: -1 },
    { name: "PostgreSQL", rotate: 4 },
    { name: "Docker", rotate: -3 },
    { name: "Microservices", rotate: 2 },
    { name: "Architecture", rotate: -4 },
    { name: "Java / PHP", rotate: 1 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] flex flex-wrap content-center justify-center gap-4 p-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
          style={{ transform: `rotate(${skill.rotate}deg)` }}
        >
          {/* Sello Tipográfico */}
          <div className="border border-ink/40 text-ink px-4 py-2 font-serif text-xl tracking-tight hover:bg-ink hover:text-white transition-colors duration-500 cursor-pointer interactive">
            {skill.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="bg-transparent text-ash py-32 lg:py-48 px-6 md:px-12 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-[1px] bg-ember/20"
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16"
        >
          <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
            {t('about.subtitle')}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-ash tracking-tight">
            {t('about.title1')} <br/> {t('about.title2')}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Description */}
          <div className="md:col-span-3 lg:col-span-4">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-8 md:p-12 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-ember/50"></div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-ember/5 blur-[100px] rounded-full group-hover:bg-ember/10 transition-all duration-700"></div>
                <p className="text-xl md:text-2xl font-serif leading-[1.6] text-ash tracking-tight pl-4 relative z-10">
                  {t('about.bio1')}<span className="text-ember">{t('about.bio_highlight')}</span>{t('about.bio2')}
                  <br /><br />
                  {t('about.bio3')}
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Animated Code Terminal with Easter Egg */}
          <div className="md:col-span-1 lg:col-span-2">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-6 md:p-8 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col relative min-h-[300px]">
                <div className="flex justify-between items-center mb-6 border-b border-ash/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="font-mono text-[9px] text-ash/40 uppercase">{t('about.terminal')}</span>
                </div>
                <TerminalProfile />
              </div>
            </TiltCard>
          </div>

          {/* Manifiesto Técnico (Sellos Tipográficos) */}
          <div className="md:col-span-2 lg:col-span-2">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col relative min-h-[300px] overflow-hidden bg-cover bg-center">
                {/* Fondo de textura extra sutil si queremos que parezca papel */}
                <div className="absolute top-6 left-6 z-30">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ash/40">Technical Manifesto</span>
                </div>
                <TechnicalManifesto />
              </div>
            </TiltCard>
          </div>

          {/* Idiomas / Language Skills Bento */}
          <div className="md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-8 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] rounded-xl flex flex-col justify-center relative overflow-hidden group transition-all duration-700">
                <span className="font-mono text-[10px] tracking-widest uppercase text-ash/40 mb-4 block">Language Module 01</span>
                <h3 className="text-3xl font-serif text-ash group-hover:text-ember transition-colors duration-500">Spanish</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember mt-2">Native / Mother Tongue</p>
                <div className="absolute -bottom-10 -right-10 text-[10rem] font-serif text-ash/5 pointer-events-none group-hover:-translate-y-4 group-hover:scale-110 transition-transform duration-700">
                  ES
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-8 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] rounded-xl flex flex-col justify-center relative overflow-hidden group transition-all duration-700">
                <span className="font-mono text-[10px] tracking-widest uppercase text-ash/40 mb-4 block">Language Module 02</span>
                <h3 className="text-3xl font-serif text-ash group-hover:text-ember transition-colors duration-500">English</h3>
                <div className="flex gap-4 mt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-ember/20 text-ember rounded-sm">C1 Listening</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-ash/20 text-ash/80 rounded-sm">B2 Speaking</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-[10rem] font-serif text-ash/5 pointer-events-none group-hover:-translate-y-4 group-hover:scale-110 transition-transform duration-700">
                  EN
                </div>
              </div>
            </TiltCard>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
