import { motion, AnimatePresence } from "framer-motion";
import { X, Award, CalendarDays, Building2 } from "lucide-react";
import { useEffect } from "react";
import type { Certificate } from "@/lib/types";

interface Props {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: Props) {
  useEffect(() => {
    if (!certificate) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl"
          >
            <button
              onClick={onClose}
              className="glass absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            {certificate.image && (
  <div className="overflow-hidden rounded-t-3xl bg-muted border-b border-border">
    <img
      src={certificate.image}
      alt={certificate.title}
      className="w-full object-contain"
    />
  </div>
)}

            <div className="p-8">

              <div className="flex items-center gap-3">
                <div className="glass-strong flex h-12 w-12 items-center justify-center rounded-xl text-primary">
                  <Award className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="font-display text-3xl font-bold text-gradient">
                    {certificate.title}
                  </h2>

                  <p className="mt-1 text-muted-foreground">
                    Verified Achievement
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">

                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Building2 className="h-5 w-5" />
                    <span className="font-semibold">Issued By</span>
                  </div>

                  <p className="mt-3 text-muted-foreground">
                    {certificate.issuer}
                  </p>
                </div>

                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-5 w-5" />
                    <span className="font-semibold">Issued On</span>
                  </div>

                  <p className="mt-3 text-muted-foreground">
                    {certificate.date}
                  </p>
                </div>

              </div>
                <div className="my-8 border-t border-border" />
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-semibold text-primary">
                  Certificate Information
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground whitespace-pre-line">
  {certificate.description}
</p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-xl px-6 py-3 text-primary-foreground hover:glow-primary"
                  style={{
                    background: "var(--gradient-primary)"
                  }}
                >
                  Close
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}