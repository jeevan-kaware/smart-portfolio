import { useState } from "react";
import projectsData from "@/data/project.json";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionHeader } from "./SectionHeader";
import type { Project } from "@/lib/types";
import { motion } from "framer-motion";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [tab, setTab] = useState<"backend" | "frontend">("backend");
  const list = (tab === "backend" ? projectsData.featured : projectsData.frontend) as unknown as Project[];

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A curated set of backend systems and interfaces I've designed and built."
        />

        <div className="mb-10 flex justify-center">
          <div className="glass inline-flex rounded-full p-1">
            {(["backend", "frontend"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`relative rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors ${
                  tab === k ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === k && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                <span className="relative z-10">{k}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}