import { useEffect, useRef, useState } from "react";

export function CountUp({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
  enableScrollSpy?: boolean;
  scrollSpyOnce?: boolean;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const start = () => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const ms = duration * 1000;
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / ms);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(end * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) start();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}