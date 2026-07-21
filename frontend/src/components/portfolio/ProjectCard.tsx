import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, onOpen, index = 0 }: { project: Project; onOpen: () => void; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl transition-shadow hover:glow-primary"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.image ? (
          <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: "var(--gradient-primary)", opacity: 0.15 }}>
            <span className="font-display text-4xl font-bold text-gradient opacity-70">{project.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="glass-strong rounded-md px-2 py-0.5 font-mono text-[11px] text-primary">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="glass flex h-9 w-9 items-center justify-center rounded-lg hover:text-primary" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="glass flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium hover:text-primary">
            <ExternalLink className="h-3.5 w-3.5" /> Demo
          </a>
          <button onClick={onOpen} className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary hover:gap-2 transition-all">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}