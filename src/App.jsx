import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import MarqueeDivider from "./components/MarqueeDivider";
import LoaderScreen from "./components/LoaderScreen";
import AmbientLight from "./components/AmbientLight";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-ink text-ash font-body overflow-x-hidden">
      
      {isLoading && <LoaderScreen onComplete={() => setIsLoading(false)} />}
      
      <CustomCursor />
      
      {/* Fondo animado en vídeo */}
      <video 
        autoPlay loop muted playsInline 
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-multiply pointer-events-none"
      >
        <source src="/fondo-marble-animado.mp4" type="video/mp4" />
      </video>

      {/* Fallback de WebGL Shader en caso de que el video tarde o no esté */}
      <AmbientLight />
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        <MarqueeDivider text="Ingeniería Estructural" />
        
        <About />
        
        <Experience />
        
        <MarqueeDivider text="Backend Architecture" />
        
        <Projects />
        
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
