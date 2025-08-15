"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-lg"
      >
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to build your smarter day?</h2>
        <p className="mt-2 max-w-xl text-white/90">
          Take the quiz and get a personalized stack of tools — or dive straight into the library.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/ai/productivity-quiz"
            className="rounded-2xl bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:bg-white/90"
          >
            Start with the quiz
          </Link>
          <Link
            href="/all-tools"
            className="rounded-2xl bg-white/10 px-5 py-3 text-white ring-1 ring-white/30 transition hover:bg-white/15"
          >
            Browse all tools
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
