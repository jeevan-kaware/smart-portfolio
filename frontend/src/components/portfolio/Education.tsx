import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import educationData from "@/data/education.json";
import { SectionHeader } from "./SectionHeader";

export function Education() {
  const education = educationData.items;
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Journey" title="Education" description="The academic milestones that shaped me." />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />
          {education.map((e, i) => (
            <motion.div
              key={`${e.degree}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative mb-8 flex flex-col md:mb-14 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
            >
              <div className="absolute left-2 top-3 h-4 w-4 rounded-full border-2 border-background md:left-auto md:right-0 md:translate-x-1/2" style={{ background: "var(--gradient-primary)" }} />
              {i % 2 !== 0 && <div className="absolute left-2 top-3 h-4 w-4 rounded-full border-2 border-background md:left-0 md:-translate-x-1/2 md:right-auto" style={{ background: "var(--gradient-primary)" }} />}
              <div className="glass ml-10 rounded-2xl p-6 hover:glow-primary md:ml-0">
                <div className="flex items-start gap-3">
                  <div className="glass-strong flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
                    <p className="text-sm text-primary">{e.institution}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {e.period}</span>
                    </div>
                    {e.description && <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>}
                    {e.grade && <span className="glass mt-3 inline-block rounded-md px-2 py-0.5 font-mono text-xs text-primary">{e.grade}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}