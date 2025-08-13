"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, HeartPulse, Cpu, Wallet } from "lucide-react";

// Tools data
const tools = [
  {
    name: "EMI Calculator",
    icon: <Wallet className="w-6 h-6 text-blue-600" />,
    slug: "/tools/emi-calculator",
    category: "Finance",
    description: "Plan your loan with accurate EMI breakdowns and interest projections.",
  },
  {
    name: "BMI Calculator",
    icon: <HeartPulse className="w-6 h-6 text-pink-600" />,
    slug: "/tools/bmi-calculator",
    category: "Health",
    description: "Track your body mass index and maintain a healthy balance.",
  },
  {
    name: "Age Calculator",
    icon: <Calculator className="w-6 h-6 text-green-600" />,
    slug: "/tools/age-calculator",
    category: "Utility",
    description: "Calculate your age in years, months, days — instantly.",
  },
  {
    name: "Password Generator",
    icon: <Cpu className="w-6 h-6 text-purple-600" />,
    slug: "/tools/password-generator",
    category: "Tech",
    description: "Create strong, secure, and random passwords in one click.",
  },
];

// Animation variants
const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
      y: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function PopularTools() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Popular Tools</h2>
        <p className="text-gray-600 mt-2">
          Explore our most used smart calculators and utilities.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.slug}
            variants={item}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all will-change-transform"
          >
            <Link href={tool.slug}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg h-10 w-10 flex items-center justify-center">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.category}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
