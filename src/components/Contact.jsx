import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { FiArrowRight } from "react-icons/fi";

const Contact = () => {
  return (
    <section id="contacto" className="bg-transparent text-ash py-32 lg:py-48 px-6 md:px-12 relative min-h-screen flex items-center">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-[1px] bg-ember/20"
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="block font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-6">
              04 // Contacto
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-[0.9] text-ash tracking-tighter mb-12">
              Iniciar <br />
              <span className="text-ember italic">Conexión.</span>
            </h2>
            <p className="text-base font-light text-ash/80 max-w-md leading-relaxed mb-12">
              Buscando nuevos desafíos donde la arquitectura de software y el diseño premium se encuentren. Abierto a posiciones de ingeniería y proyectos complejos.
            </p>
            
            <div className="flex flex-col gap-6 font-mono text-xs uppercase tracking-[0.2em] text-ash/60">
              <MagneticButton className="w-fit">
                <a href="mailto:angelposrod@gmail.com" className="flex items-center gap-4 text-ash hover:text-ember transition-colors interactive">
                  angelposrod@gmail.com <FiArrowRight />
                </a>
              </MagneticButton>
              <MagneticButton className="w-fit">
                <a href="https://linkedin.com/in/angel-postigo-rodriguez" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-ash hover:text-ember transition-colors interactive">
                  LinkedIn Profile <FiArrowRight />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <form className="w-full max-w-md flex flex-col gap-8 bg-ink-light/20 p-8 border border-ember/10 backdrop-blur-sm">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="ID / Nombre" 
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Dirección de Red (Email)" 
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase interactive"
                />
              </div>
              <div className="relative group">
                <textarea 
                  placeholder="Paquete de Datos (Mensaje)" 
                  rows={4}
                  className="w-full bg-transparent border-b border-ash/20 py-4 px-2 text-ash placeholder:text-ash/30 focus:outline-none focus:border-ember transition-colors font-mono text-xs tracking-widest uppercase resize-none interactive"
                />
              </div>
              
              <MagneticButton className="mt-4">
                <button type="button" className="w-full py-4 border border-ember/40 text-ember font-mono text-xs uppercase tracking-[0.3em] hover:bg-ember hover:text-ink transition-colors duration-500 interactive">
                  Transmitir
                </button>
              </MagneticButton>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
