import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { Github, Star, BookOpen, Activity, Users } from "lucide-react";
import github from "@/data/github.json";
import profile from "@/data/profile.json";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { Icon: BookOpen, label: "Repositories", key: "repositories" as const },
  { Icon: Star, label: "Stars", key: "stars" as const },
  { Icon: Users, label: "Followers", key: "followers" as const },
  { Icon: Activity, label: "Contributions", key: "contributions" as const },
] as const;

export function GithubSection() {
  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="GitHub"
          title="Coding activity"
          description="A pulse of open source contributions and daily craft."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ Icon, label, key }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center hover:glow-primary"
            >
              <Icon className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-3 font-display text-3xl font-bold text-gradient">
                <CountUp end={github.stats[key]} duration={2} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">Top languages</h3>
            <div className="space-y-3">
              {github.languages.map((l) => (
                <div key={l.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-muted-foreground">{l.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass group flex flex-col items-center justify-center rounded-3xl p-8 text-center transition-shadow hover:glow-primary"
          >
            <Github className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
            <h3 className="mt-4 font-display text-xl font-semibold">Follow on GitHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">See my latest projects, PRs, and open source contributions.</p>
            <span className="mt-4 inline-flex rounded-full px-4 py-1.5 text-xs font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>@{github.username}</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}