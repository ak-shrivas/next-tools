// components/HeroBanner.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-16 px-4 bg-gradient-to-br from-blue-50 to-white"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Smart Tools for Smarter Living
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">
        Your all-in-one toolkit for finance, health, tech, and more — easy, fast, and 100% free.
      </p>
      <Button variant="primary" size="lg">Explore Tools</Button>
    </motion.section>
  );
}
