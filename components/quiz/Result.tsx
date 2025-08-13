"use client";

import { ShareBox } from "@/components/common/ShareBox";
import { Sparkles, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useMemo, useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export type Tool = {
  name: string;
  link: string;
  description: string;
};

export type Stream = "student" | "freelancer" | "9to5" | "founder" | "chill" | "default";

export type ResultType = {
  type: string;
  title: string;
  description: string;
  toolsByStream: {
    [key in Stream]?: Tool[];
  };
};

type Props = {
  result: ResultType;
  profession: Stream | null;
  onRestart: () => void;
  answers: { [key: string]: number };
  name: string;
};


export function Result({ result, profession, onRestart,answers,name }: Props) {
  const tools =
    result.toolsByStream[profession ?? "default"] || result.toolsByStream.default || [];

  // const totalQuestions = Object.values(answers).reduce((sum, val) => sum + val, 0);
  // const rawScore = result.type && answers[result.type] ? answers[result.type] : 0;
  // const scoreOutOf100 = Math.round((rawScore / totalQuestions) * 100);

  const totalAnswers = Object.entries(answers).filter(
    ([key]) =>
      !["student", "freelancer", "9to5", "founder", "chill", "default"].includes(key)
  );
  
  const totalVotes = totalAnswers.reduce((sum, [, value]) => sum + value, 0);
  const rawScore = result.type && answers[result.type] ? answers[result.type] : 0;
  const scoreOutOf100 = Math.round((rawScore / totalVotes) * 100);

  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const nameSlug = encodeURIComponent(name.trim().toLowerCase().replace(/\s+/g, "-") || "guest");
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      const link = `${origin}/ai/productivity-type/${result.type}/${profession ?? "default"}/${nameSlug}?answers=${encodedAnswers}`;
            setShareLink(link);
    }
  }, [result.type, profession, name]);
  
  
  

  const chartData = useMemo(() => {
    const filteredAnswers = Object.entries(answers).filter(
      ([key]) =>
        !["student", "freelancer", "9to5", "founder", "chill", "default"].includes(key)
    );
  
    const sorted =
      filteredAnswers.length > 0
        ? filteredAnswers.sort((a, b) => b[1] - a[1])
        : [[result.type, 3]];
  
    const sum = sorted.reduce((acc, [, val]) => acc + (typeof val === "number" ? val : 0), 0);
  
    return {
      labels: sorted.map(([key]) => typeof key === "string" ? key.charAt(0).toUpperCase() + key.slice(1) : String(key)),
      datasets: [
        {
          label: "Score",
          data: sorted.map(([, value]) => Math.round((Number(value) / sum) * 100)),
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderRadius: 6,
          barThickness: 30,
        },
      ],
    };
  }, [answers, result.type]);
   

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 p-6 md:p-8 bg-white rounded-2xl shadow-lg text-center"
    >
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2">
        <Sparkles className="text-yellow-500 w-6 h-6" />
        <span className="text-gray-900">
          {name.charAt(0).toUpperCase() + name.slice(1)} is <span className="text-blue-600">{result.title}</span>!
        </span>
      </h2>
      <p className="text-gray-600 max-w-xl font-semibold mx-auto mb-6">{result.description}</p>

      {/* Chart */}
      {totalVotes > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🧠 Your Personality Breakdown</h3>
          
          {/* <p className="text-gray-800 text-lg font-semibold mb-4">
            🎯 Your score: <span className="text-blue-600">{scoreOutOf100}/100</span>
          </p> */}
          
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20,
                    color: "#6B7280",
                    callback: (value) => `${value}%`,
                  },
                },
                x: {
                  ticks: { color: "#6B7280" },
                },
              },
            }}
          />

        </div>
      )}

      {/* AI Tools Section */}
      <div className="text-left mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          🚀 Recommended AI Tools Just for You
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
            >
              <h4 className="text-lg font-bold text-blue-600 mb-1">{tool.name}</h4>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Restart & Share */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Restart Quiz
        </button>
      </div>

      {/* Share Section */}
      <ShareBox
        title={`My AI Productivity Personality is: ${result.title}`}
        message="Check out what kind of productivity beast You are!"
        link={shareLink}
      />

    </motion.div>
  );
}
