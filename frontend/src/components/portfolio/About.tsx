import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { Code2, Server, Database, Cpu } from "lucide-react";
import profile from "@/data/profile.json";
import { SectionHeader } from "./SectionHeader";

const highlights = [
  {
    Icon: Server,
    title: "Backend Development",
    desc: "Building secure REST APIs, authentication systems, and scalable backend applications using Spring Boot."
  },
  {
    Icon: Database,
    title: "Database Design",
    desc: "PostgreSQL database design, entity relationships, schema creation, and query optimization."
  },
  {
    Icon: Cpu,
    title: "Development Tools",
    desc: "Git, GitHub, Docker, Maven, Postman, and modern backend development workflows."
  },
  {
    Icon: Code2,
    title: "Clean Code",
    desc: "Following clean coding practices, SOLID principles, layered architecture, and maintainable code."
  }
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
  eyebrow="About"
  title="Building Reliable Backend Solutions"
  description="A quick overview of my backend development journey, technical skills, and the technologies I work with."
/>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <p className="text-lg leading-relaxed text-foreground/90">{profile.about}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {profile.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-strong rounded-2xl p-4"
                >
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp end={s.value} duration={2} enableScrollSpy scrollSpyOnce />
                    {s.suffix}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass group rounded-2xl p-5 transition-shadow hover:glow-primary"
              >
                <div className="flex items-start gap-3">
                  <div className="glass-strong flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}