"use client";

import WaterVisualResult from "./WaterVisualResult";
import WaterBreakdownChart from "./WaterBreakdownChart";
import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShareModal } from "./ShareModal";

type Props = {
  waterLiters: number;
  name?: string;
  isShared: boolean;

  // Add these if available from parent:
  age?: number;
  weight?: number;
  height?: number;
  gender?: "male" | "female" | "other";
  weightUnit?: "kg" | "lbs" | "pound";
  heightUnit?: "cm" | "m" | "ft_in";
  activity?: "sedentary" | "light" | "moderate" | "high";
  climate?: "normal" | "hot" | "very_hot";

};

export default function ResultDisplay({
  waterLiters,
  name,
  isShared,
  age,
  weight,
  height,
  gender,
  weightUnit,
  heightUnit,
  activity,
  climate,
}: Props) {
  const router = useRouter();

  const handleShare = () => {
    window.dispatchEvent(new Event("open-share-modal"));
  };

  const handleCheckYours = () => {
    router.push("/health/water-intake-calculator");
  };

  name =  name ? name.charAt(0).toUpperCase() + name.slice(1) : "Your";

  return (
    <div className="relative bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
      {/* Title Row */}
      <div className="flex justify-between items-center border-b border-blue-300 pb-4">
        <h2 className="text-xl font-bold text-blue-700 text-center mb-2">
          💧 {name ? `${name}'s` : "Your"} Hydration Goal
        </h2>
        {isShared ? (
          <button
            onClick={handleCheckYours}
            className="hidden sm:inline-flex text-sm px-3 py-1.5 bg-blue-300 text-black rounded hover:bg-blue-400 transition"
          >
            Check Yours
          </button>
        ) : (
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Share Result 💧
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex my-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-col text-sm sm:text-base text-gray-800 leading-tight">
            <span className="ml-1 font-semi-bold">Recommended Daily Water Intake:</span>
          </div>
          <span className="text-4xl font-bold text-blue-900">{waterLiters} Liters</span>
        </div>
      </div>

      {/* Floating Share Icon on Mobile */}
      {!isShared && (
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 md:hidden bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          aria-label="Share"
        >
          <Share2 size={16} />
        </button>
      )}

      <WaterVisualResult liters={waterLiters} />
      <WaterBreakdownChart totalLiters={waterLiters} />

      {/* Bottom Share Button */}
      {!isShared && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Share2 className="w-5 h-5 text-white" />
            Share Your Result
          </button>
        </div>
      )}

      {/* ✅ Modal added once only — outside layout */}
      {!isShared && (
        <ShareModal
          name={name}
          resultLiters={waterLiters}
          age={age}
          weight={weight}
          height={height}
          gender={gender}
          weightUnit={weightUnit}
          heightUnit={heightUnit}
          activity={activity}
          climate={climate}
        />
      )}
    </div>
  );
}

