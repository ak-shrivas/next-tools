// components/sections/FeaturesGrid.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Fast & Accurate",
    description: "Get real-time results instantly with precision-calculated algorithms.",
    icon: <CheckCircle className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "No Signup Needed",
    description: "Use all tools freely without creating an account or logging in.",
    icon: <CheckCircle className="text-green-600 w-6 h-6" />,
  },
  {
    title: "100% Free Tools",
    description: "All tools are completely free forever — no hidden fees, ever.",
    icon: <CheckCircle className="text-indigo-600 w-6 h-6" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Why Use Our Tools?</h2>
        <p className="text-gray-600 mt-2">Simple, reliable, and ready to empower your daily life.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
