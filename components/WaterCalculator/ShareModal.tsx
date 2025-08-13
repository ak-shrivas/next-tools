"use client";

import { useEffect, useState } from "react";
import { ShareBox } from "@/components/common/ShareBox";
import { X } from "lucide-react";
import { generateSlug } from "@/utils/generateSlug";

type Props = {
    name?: string;
  resultLiters: number;
  age?: number;
  weight?: number;
  height?: number;
  gender?: "male" | "female" | "other";
  weightUnit?: "kg" | "lbs" | "pound";
  heightUnit?: "cm" | "m" | "ft_in";
  activity?: "sedentary" | "light" | "moderate" | "high";
  climate?: "normal" | "hot" | "very_hot";
};

export function ShareModal({
    name,
  resultLiters,
  age,
  weight,
  height,
  gender,
  weightUnit,
  heightUnit,
  activity,
  climate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // 📌 Trigger modal open
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener("open-share-modal", openHandler);
    return () => window.removeEventListener("open-share-modal", openHandler);
  }, []);  

  // 📌 Build shareable URL safely
  useEffect(() => {
    if (typeof window === "undefined") return;

    const slug = generateSlug({
      liters: resultLiters,
      weight: weight ?? 0,
      gender: gender ?? "male",
      activity,
    });
  
    const url = new URL(`/health/water-intake-calculator/${slug}`, window.location.origin);
  
    if (age) url.searchParams.set("age", age.toString());
    if (weight) url.searchParams.set("weight", weight.toString());
    if (height) url.searchParams.set("height", height.toString());
    if (gender) url.searchParams.set("gender", gender);
    if (weightUnit) url.searchParams.set("weightUnit", weightUnit);
    if (heightUnit) url.searchParams.set("heightUnit", heightUnit);
    if (activity) url.searchParams.set("activity", activity);
    if (climate) url.searchParams.set("climate", climate);
    if (name) url.searchParams.set("name", name);
    url.searchParams.set("liters", resultLiters.toString());
    url.searchParams.set("shared", "true");

    setShareUrl(url.toString());
  }, [
    name,
    age,
    weight,
    height,
    gender,
    weightUnit,
    heightUnit,
    activity,
    climate,
    resultLiters
  ]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  
  if (!isOpen) return null;
  
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative animate-fade-in">
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Share */}
        <ShareBox
          title="Share your hydration goal"
          message={`💧 I need ${resultLiters}L of water daily to stay hydrated. Check your hydration need here →`}
          link={shareUrl}
        />
      </div>
    </div>
  );
}
