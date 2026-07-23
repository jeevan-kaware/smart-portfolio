import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { GithubSection } from "@/components/portfolio/GithubSection";
import { Education } from "@/components/portfolio/Education";
import { Certificates } from "@/components/portfolio/Certificates";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ChatBot } from "@/components/portfolio/ChatBot";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jeevan Kaware — Java Backend Developer" },
      { name: "description", content: "Premium portfolio of Jeevan Kumar, a Java Backend Developer specializing in Spring Boot, microservices, and cloud-native systems." },
      { property: "og:title", content: "Jeevan Kumar — Java Backend Developer" },
      { property: "og:description", content: "Portfolio showcasing enterprise-grade backend systems, APIs and open source work." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <LoadingScreen />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubSection />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </div>
  );
}
