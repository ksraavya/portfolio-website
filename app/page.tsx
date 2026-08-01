import NeuralBackground from "@/components/ui/NeuralBackground";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import HumanStrip from "@/components/sections/HumanStrip";
import SectionDivider from "@/components/ui/SectionDivider";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {/* Global animated background */}
      <NeuralBackground />
      <Navbar />

      {/* Sections */}
      <Hero />
      <HumanStrip />
      <SectionDivider label="// my projects" />
      <Projects />
      <SectionDivider label="// experience" />
      <Experience />
      <SectionDivider label="// achievements" />
      <Achievements />
      <SectionDivider label="// contact me" />
      <Contact />
    </main>
  );
}