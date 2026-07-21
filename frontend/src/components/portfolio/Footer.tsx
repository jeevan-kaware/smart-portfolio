import { Github, Linkedin, Heart } from "lucide-react";
import profile from "@/data/profile.json";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-lg" style={{ background: "var(--gradient-primary)" }} />
            <div className="absolute inset-[2px] flex items-center justify-center rounded-lg bg-background font-display text-xs font-bold text-gradient">JK</div>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with <Heart className="mx-1 inline h-3 w-3 text-primary" /> & Java.
          </span>
        </div>
        <div className="flex gap-2">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="glass flex h-9 w-9 items-center justify-center rounded-lg hover:text-primary" aria-label="GitHub"><Github className="h-4 w-4" /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="glass flex h-9 w-9 items-center justify-center rounded-lg hover:text-primary" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}