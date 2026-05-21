import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TiltCard from "./TiltCard";

const TypewriterCode = () => {
  const codeString = `// Arquitectura Backend Node.js\nconst server = new CoreService({\n  resilience: 'RabbitMQ',\n  cache: 'Redis',\n  telemetry: true\n});\n\nawait server.init();\nconsole.log('Sistema Escalable Online.');`;
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(codeString.substring(0, i));
      i++;
      if (i > codeString.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [codeString]);

  return (
    <div className="font-mono text-[10px] sm:text-xs text-ash/80 leading-relaxed whitespace-pre font-light">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3 bg-ember align-middle ml-1"
      />
    </div>
  );
};

const SKILLS_DATA = {
  backend: [
    { name: "Node.js", level: 95 },
    { name: "Express", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "PostgreSQL", level: 80 }
  ],
  frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TailwindCSS", level: 95 },
    { name: "Framer Motion", level: 80 }
  ],
  devops: [
    { name: "Docker", level: 75 },
    { name: "RabbitMQ", level: 70 },
    { name: "Redis", level: 70 },
    { name: "AWS", level: 65 }
  ]
};

const About = () => {
  const [activeTab, setActiveTab] = useState("backend");

  return (
    <section id="sobre-mi" className="bg-transparent text-ash py-32 lg:py-48 px-6 md:px-12 relative">
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
            01 // Sobre Mí
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-ash tracking-tight">
            Lógica & <br/> Estructura.
          </h2>
        </motion.div>

        {/* Bento Grid con Volumen y Sombras */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Description */}
          <div className="md:col-span-3 lg:col-span-4">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-8 md:p-12 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-ember/50"></div>
                <p className="text-xl md:text-2xl font-serif leading-[1.6] text-ash tracking-tight pl-4">
                  Estudiante disciplinado y adaptable de <span className="text-ember">Desarrollo de Aplicaciones Web</span> con gran ambición de ampliar mi conjunto de habilidades profesionales en el ecosistema Full Stack.
                  <br /><br />
                  Soy una persona resiliente y comprometida. Complemento mi formación técnica con experiencia internacional real en Italia, colaborando en el desarrollo de módulos de telemetría y paneles analíticos industriales. Mi objetivo es aportar valor a través de código estructurado y trabajo en equipo.
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Animated Code Terminal */}
          <div className="md:col-span-1 lg:col-span-2">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-6 md:p-8 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col relative min-h-[250px]">
                <div className="flex gap-2 mb-6 border-b border-ash/10 pb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-ash/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-ash/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-ash/20"></div>
                  <span className="ml-4 font-mono text-[9px] text-ash/40 uppercase">Terminal // root@server</span>
                </div>
                <TypewriterCode />
              </div>
            </TiltCard>
          </div>

          {/* UI Dashboard Tabs for Skills */}
          <div className="md:col-span-2 lg:col-span-2">
            <TiltCard>
              <div className="h-full bg-ink-light border border-ember/10 p-6 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-700 rounded-xl flex flex-col relative min-h-[250px]">
                
                {/* Tabs Header */}
                <div className="flex gap-4 border-b border-ash/10 mb-6 pb-2">
                  {["backend", "frontend", "devops"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-mono text-[10px] uppercase tracking-[0.1em] pb-2 transition-colors relative ${activeTab === tab ? "text-ember" : "text-ash/40 hover:text-ash/80"}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[1px] bg-ember" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tabs Content (Bars) */}
                <div className="flex flex-col gap-4 flex-grow justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      {SKILLS_DATA[activeTab].map((skill, i) => (
                        <div key={skill.name} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-end">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-ash/80">{skill.name}</span>
                            <span className="font-mono text-[9px] text-ember/60">{skill.level}%</span>
                          </div>
                          {/* Progress Bar UI */}
                          <div className="w-full h-[2px] bg-ink rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-ember/50 to-ember"
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
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
