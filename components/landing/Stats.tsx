"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(whenVisible: boolean, end: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!whenVisible) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      setValue(Math.round(end * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [whenVisible, end, durationMs]);
  return value;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const users = useCountUp(inView, 27_000);
  const tools = useCountUp(inView, 120);
  const saves = useCountUp(inView, 540_000);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="grid gap-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 ring-1 ring-blue-100 sm:grid-cols-3">
        <Stat title="People helped" value={`${users.toLocaleString()}+`} />
        <Stat title="Curated tools" value={`${tools}+`} />
        <Stat title="Hours saved" value={`${saves.toLocaleString()}`} />
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{title}</div>
    </motion.div>
  );
}