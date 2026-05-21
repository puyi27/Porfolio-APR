const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-ember/20 py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left font-mono">
          <span className="text-[10px] uppercase tracking-[0.2em] text-ash/60">© {new Date().getFullYear()} Ángel Postigo.</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-ember/80">All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em]">
          <a href="#inicio" className="text-ash/60 hover:text-ember transition-colors duration-500">
            Volver Arriba
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
