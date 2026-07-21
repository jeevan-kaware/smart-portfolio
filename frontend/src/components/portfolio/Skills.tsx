import { motion } from "framer-motion";
import skills from "@/data/skills.json";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="Technical arsenal"
          description="Tools and technologies I use to design, build and ship production systems."
        />
        <div className="space-y-10">
          {skills.categories.map((cat, ci) => (
            <div key={cat.name}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center gap-3 font-display text-sm uppercase tracking-widest text-muted-foreground"
              >
                <span className="h-px w-8 bg-primary/50" />
                {cat.name}
              </motion.h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cat.skills.map((s, i) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (ci * 0.05) + (i * 0.04) }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="glass group flex flex-col items-center gap-3 rounded-2xl p-5 transition-shadow hover:glow-primary"
                    >
                      <Icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{s.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}