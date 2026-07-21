import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";

import certificatesData from "@/data/certificates.json";
import { SectionHeader } from "./SectionHeader";
import { CertificateModal } from "./CertificateModal";
import type { Certificate } from "@/lib/types";

export function Certificates() {
  const certificates = certificatesData.items as Certificate[];
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Achievements"
          title="Certifications"
          description="Validated skills and continuous learning."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:glow-primary"
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 transition-opacity group-hover:opacity-40"
                style={{ background: "var(--gradient-primary)" }}
              />

              <div className="glass-strong flex h-11 w-11 items-center justify-center rounded-xl text-primary">
                <Award className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold">
                {c.title}
              </h3>

              <p className="mt-1 text-sm text-primary">
                {c.issuer}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Issued {c.date}
              </p>

              <button
                onClick={() => setActive(c)}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
              >
                View Certificate
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <CertificateModal
        certificate={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}