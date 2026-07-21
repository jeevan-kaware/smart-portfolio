import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Github, Download, Menu, X } from "lucide-react";
import profile from "@/data/profile.json";

const links = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "education", label: "Education" },
  { to: "certificates", label: "Certificates" },
  { to: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3 shadow-elegant" : "py-5"
      }`}
      style={scrolled ? { boxShadow: "var(--shadow-elegant)" } : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <ScrollLink
          to="home"
          smooth
          duration={600}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-xl" style={{ background: "var(--gradient-primary)" }} />
            <div className="absolute inset-[2px] flex items-center justify-center rounded-xl bg-background font-display text-sm font-bold text-gradient">
              JK
            </div>
          </div>
          <span className="hidden font-display text-lg font-semibold sm:block">Jeevan.dev</span>
        </ScrollLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <ScrollLink
              key={l.to}
              to={l.to}
              smooth
              duration={600}
              spy
              offset={-80}
              activeClass="!text-primary"
              className="cursor-pointer rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </ScrollLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:glow-primary"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong mt-3 border-t border-border lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <ScrollLink
                key={l.to}
                to={l.to}
                smooth
                duration={600}
                offset={-80}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </ScrollLink>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}