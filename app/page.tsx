import NeuralBackground from "@/components/ui/NeuralBackground";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import HumanStrip from "@/components/sections/HumanStrip";
import SectionDivider from "@/components/ui/SectionDivider";
import Projects from "@/components/sections/Projects";


export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {/* Global animated background */}
      <NeuralBackground />
      <Navbar />

      {/* Sections — we'll add more each commit */}
      <Hero />
      <HumanStrip />
      <SectionDivider label="// my projects" />
      <Projects />

      {/* TODO next commits:
          <Navbar />
          <About />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
          <ChatWidget />
      */}
    </main>
  );
}