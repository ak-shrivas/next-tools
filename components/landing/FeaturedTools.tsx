"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TOOLS = [
  { name: "Productivity Quiz", desc: "Find your focus style & tools.", href: "/ai/productivity-quiz", tag: "Popular" },
  { name: "Meeting Notes AI", desc: "Auto-summarize meetings.", href: "/tools/meeting-notes", tag: "New" },
  { name: "Email Triage", desc: "Inbox zero, automatically.", href: "/tools/email-triage", tag: "Trending" },
  { name: "Task Automations", desc: "Connect apps, build flows.", href: "/tools/automations", tag: "Pro" },
];

export default function FeaturedTools() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Featured tools</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-700 ring-1 ring-slate-200">
              {t.tag}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{t.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
            <Link href={t.href} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
              Open tool →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
