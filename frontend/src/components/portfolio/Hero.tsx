import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, Download, Mail, ArrowDown, Sparkles } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { SiSpringboot, SiPostgresql, SiDocker } from "react-icons/si";
import profile from "@/data/profile.json";
import profileImage from "@/assets/images/profile.png";
const floatingIcons = [
  { Icon: FaJava, x: "8%", y: "20%", delay: 0 },
  { Icon: SiSpringboot, x: "88%", y: "28%", delay: 1 },
  { Icon: SiPostgresql, x: "12%", y: "72%", delay: 2 },
  { Icon: SiDocker, x: "84%", y: "68%", delay: 1.5 },
];

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden text-primary/20 lg:block"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon className="h-16 w-16" />
        </motion.div>
      ))}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Open to Software Development Opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            Hi, I'm <br />
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex items-center gap-2 font-mono text-xl md:text-2xl"
          >
            
            <TypeAnimation
              sequence={[
                "Java Backend Developer", 2000,
                "Software Engineer", 2000,
                "Backend Engineer", 2000,
                "Java Developer", 2000,
                "Spring Boot Developer", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-primary"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] hover:glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <ScrollLink
              to="contact"
              smooth
              duration={700}
              offset={-80}
              className="glass inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium hover:text-primary"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </ScrollLink>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="glass flex h-11 w-11 items-center justify-center rounded-xl hover:glow-primary" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="glass flex h-11 w-11 items-center justify-center rounded-xl hover:glow-cyan" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-[280px] md:w-[380px] lg:w-[440px]"
        >
          <div className="absolute inset-0 rounded-full opacity-70 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="glass-strong relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-primary/30">
           <img
  src={profileImage}
  alt="Jeevan Kaware"
  className="h-full w-full object-cover object-top"
/>
          </div>
          <motion.div
            className="glass absolute -bottom-3 -left-4 flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaJava className="h-5 w-5 text-primary" />
            <span className="font-mono">Java 21</span>
          </motion.div>
          <motion.div
            className="glass absolute -top-2 -right-4 flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <SiSpringboot className="h-5 w-5 text-accent" />
            <span className="font-mono">Spring Boot</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ScrollLink to="about" smooth duration={700} offset={-80} className="flex cursor-pointer flex-col items-center gap-1 text-xs text-muted-foreground">
          <span>Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </ScrollLink>
      </motion.div>
    </section>
  );
}