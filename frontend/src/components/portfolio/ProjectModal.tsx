import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Check } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "@/lib/types";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
          >
            <button onClick={onClose} className="glass absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full hover:text-primary" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            {project.image && (
              <div className="aspect-video w-full overflow-hidden rounded-t-3xl">
                <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-gradient">{project.name}</h3>
              <p className="mt-3 text-muted-foreground">{project.longDescription || project.description}</p>
              {project.features && (
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Key features</h4>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Tech stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="glass rounded-lg px-3 py-1 font-mono text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium hover:text-primary">
                  <Github className="h-4 w-4" /> Source
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground hover:glow-primary" style={{ background: "var(--gradient-primary)" }}>
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}