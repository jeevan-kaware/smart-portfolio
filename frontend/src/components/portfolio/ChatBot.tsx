import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

const suggested = [
  "What are your top skills?",
  "Tell me about your projects.",
  "How can I contact you?",
];

function mockReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("skill")) return "I specialize in Java, Spring Boot, PostgreSQL, Docker and AWS — with a focus on scalable REST APIs and microservices.";
  if (s.includes("project")) return "I've built enterprise APIs, microservice platforms, and event-driven systems. Check the Projects section for details.";
  if (s.includes("contact") || s.includes("email")) return "You can reach me via the Contact form below, or directly through the email listed there.";
  if (s.includes("experience") || s.includes("year")) return "I've been building backend systems professionally for several years, focused on Spring Boot and cloud-native architectures.";
  if (s.includes("resume") || s.includes("cv")) return "You can download my resume from the top navigation bar.";
  return "Great question! Feel free to explore the site — About, Skills, and Projects have most of what recruiters ask about.";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! I'm Jeevan's AI assistant. Ask me anything about his skills, projects or experience." },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || mockReply(q) }]);
    } catch {
  setMessages((m) => [
    ...m,
    {
      role: "assistant",
      content: "Sorry, AI service is currently unavailable."
    }
  ]);
} finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-lg glow-primary"
        style={{ background: "var(--gradient-primary)" }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong fixed bottom-24 right-6 z-40 flex h-[520px] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <div className="flex items-center gap-3 border-b border-border/50 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">Ask about Jeevan</div>
                <div className="text-xs text-muted-foreground">AI assistant • usually replies instantly</div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
                    {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="glass flex h-7 w-7 items-center justify-center rounded-lg"><Bot className="h-3.5 w-3.5 text-primary" /></div>
                  <div className="glass rounded-2xl px-3 py-2 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.3s]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-border/50 p-3">
                {suggested.map((s) => (
                  <button key={s} onClick={() => send(s)} className="glass rounded-full px-3 py-1 text-xs hover:text-primary">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-border/50 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                maxLength={500}
                className="glass flex-1 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" disabled={loading || !input.trim()} className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground disabled:opacity-50" style={{ background: "var(--gradient-primary)" }} aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}