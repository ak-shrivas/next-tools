"use client";

import { motion } from "framer-motion";
import { Wand2, ShieldCheck, Stethoscope, Briefcase, Bot } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "ai", title: "AI & Productivity", desc: "Write, plan, focus.", icon: Bot, href: "/ai" },
  { id: "work", title: "Workflows", desc: "Automations & ops.", icon: Briefcase, href: "/workflows" },
  { id: "security", title: "Security", desc: "Privacy & safety.", icon: ShieldCheck, href: "/security" },
  { id: "health", title: "Health", desc: "Sleep, focus, energy.", icon: Stethoscope, href: "/health" },
  { id: "creative", title: "Creative", desc: "Design, video, sound.", icon: Wand2, href: "/creative" },
];

export default function ToolCategories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Browse categories</h2>
        <Link href="/all-tools" className="text-sm text-blue-600 hover:underline">View all tools</Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
              <c.icon className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
            <p className="mt-1 text-slate-600 text-sm">{c.desc}</p>
            <Link href={c.href} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
              Explore
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
