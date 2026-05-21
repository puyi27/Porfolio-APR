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
  return (
    <div className="relative min-h-screen bg-ink bg-grid-pattern text-ash selection:bg-ember selection:text-ink font-body">
      
      <LoaderScreen />
      <CustomCursor />
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
