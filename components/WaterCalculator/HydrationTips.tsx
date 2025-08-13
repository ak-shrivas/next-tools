// components/WaterCalculator/HydrationTips.tsx

import React from "react";
import { Droplet, AlarmClock, Apple, CupSoda } from "lucide-react";

export default function HydrationTips() {
  const tips = [
    {
      icon: <Droplet className="w-4 h-4 text-blue-600" />,
      text: "Carry a refillable water bottle.",
    },
    {
      icon: <CupSoda className="w-4 h-4 text-blue-600" />,
      text: "Drink water before every meal.",
    },
    {
      icon: <Apple className="w-4 h-4 text-blue-600" />,
      text: "Add fruits like lemon or cucumber for taste.",
    },
    {
      icon: <AlarmClock className="w-4 h-4 text-blue-600" />,
      text: "Use reminders or set hydration goals.",
    },
    {
      icon: <Droplet className="w-4 h-4 text-blue-600" />,
      text: "Start your day with water.",
    },
    {
      icon: <Droplet className="w-4 h-4 text-blue-600" />,
      text: "Monitor urine color – aim for pale yellow.",
    },
    {
      icon: <Apple className="w-4 h-4 text-blue-600" />,
      text: "Eat water-rich foods like watermelon & cucumber.",
    },
    {
      icon: <Droplet className="w-4 h-4 text-blue-600" />,
      text: "Drink water before, during, and after workouts.",
    },
    {
      icon: <AlarmClock className="w-4 h-4 text-blue-600" />,
      text: "Don’t wait to feel thirsty – sip regularly.",
    },
  ];

  return (
    <div className="mt-6 p-4 border border-blue-400 shadow-lg rounded bg-blue-50">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips to Stay Hydrated:</h3>
      <ul className="space-y-2 text-md text-gray-700">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span>{tip.icon}</span>
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
