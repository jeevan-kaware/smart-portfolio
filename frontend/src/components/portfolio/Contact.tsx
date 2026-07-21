import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import profile from "@/data/profile.json";
import { SectionHeader } from "./SectionHeader";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Too short").max(1000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  setStatus("sent");
  setForm({
    name: "",
    email: "",
    message: "",
  });

  setTimeout(() => setStatus("idle"), 3500);

} catch (err) {

  console.error("Contact API Error:", err);

  setStatus("error");
}
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title="Let's build together" description="Have a project in mind or want to say hi? My inbox is open." />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <h3 className="font-display text-2xl font-semibold">Reach out</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fastest response: email or LinkedIn.</p>

            <div className="mt-6 space-y-3">
              <a href={`mailto:${profile.email}`} className="glass-strong flex items-center gap-3 rounded-xl p-3 transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> <span className="text-sm">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`} className="glass-strong flex items-center gap-3 rounded-xl p-3 transition-colors hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> <span className="text-sm">{profile.phone}</span>
              </a>
              <div className="glass-strong flex items-center gap-3 rounded-xl p-3">
                <MapPin className="h-4 w-4 text-primary" /> <span className="text-sm">{profile.location}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="glass-strong flex h-10 w-10 items-center justify-center rounded-xl hover:text-primary" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="glass-strong flex h-10 w-10 items-center justify-center rounded-xl hover:text-primary" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="glass-strong w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="glass-strong w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  maxLength={255}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="glass-strong w-full resize-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell me about your project..."
                  maxLength={1000}
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.01] hover:glow-primary disabled:opacity-60"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? "Sending..." : status === "sent" ? "Message sent!" : "Send message"}
              </button>
              {status === "error" && <p className="text-center text-xs text-destructive">Something went wrong. Please try again.</p>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}