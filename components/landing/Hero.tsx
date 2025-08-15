"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200"
          >
            <Sparkles className="h-4 w-4" /> New: Personality-based AI tool picks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Your daily stack of smart tools — tuned to you
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-lg text-slate-600"
          >
            Discover, compare, and use AI utilities that actually help: focus, plan,
            write, build, and automate. Try the <span className="font-semibold">AI Productivity Quiz</span>
            to get a personalized setup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/ai/productivity-quiz"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-white shadow-sm transition hover:bg-blue-700"
            >
              <BrainCircuit className="h-5 w-5" /> Take the quiz
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <Rocket className="h-5 w-5 text-blue-600" /> Explore tools
            </Link>
          </motion.div>
        </div>

        {/* Right: Floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative h-[420px] w-full"
        >
          <FloatingCard className="left-6 top-6" title="Write smarter" subtitle="Drafts, briefs, replies" />
          <FloatingCard className="right-8 top-24" title="Focus more" subtitle="Blocks, timers" />
          <FloatingCard className="left-16 bottom-10" title="Build faster" subtitle="Dev + design AI" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-2xl bg-white/80 p-5 shadow-lg ring-1 ring-slate-200 backdrop-blur ${className}`}
    >
      <h3 className="text-slate-900 font-semibold">{title}</h3>
      <p className="text-slate-600 text-sm">{subtitle}</p>
    </motion.div>
  );
}
