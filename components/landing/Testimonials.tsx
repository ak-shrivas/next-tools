"use client";

import { motion } from "framer-motion";

const QUOTES = [
  {
    name: "Aarav S.",
    role: "Founder",
    text: "The quiz nailed my work style and the tool picks were spot on. Instant productivity bump!",
  },
  {
    name: "Maya R.",
    role: "Product Designer",
    text: "The site doesn’t just list tools — it recommends what I actually use every day.",
  },
  {
    name: "Dev K.",
    role: "Student",
    text: "Loved the clean UI and animations. Found 3 new apps I now rely on.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">What people say</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.blockquote
            key={q.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <p className="text-slate-700">“{q.text}”</p>
            <footer className="mt-4 text-sm text-slate-500">{q.name} • {q.role}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}