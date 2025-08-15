"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ResultDisplay from "@/components/WaterCalculator/ResultDisplay";
import HydrationTips from "@/components/WaterCalculator/HydrationTips";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Button } from "@/components/ui/Button";
import { Suspense } from "react";

function WaterResultContent() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name") || "";
  const age = Number(params.get("age"));
  const weight = Number(params.get("weight"));
  const height = Number(params.get("height"));
  const gender = params.get("gender") as "male" | "female" | "other";
  const weightUnit = params.get("weightUnit") as "kg" | "lbs" | "pound";
  const heightUnit = params.get("heightUnit") as "cm" | "m" | "ft_in";
  const activity = params.get("activity") as "sedentary" | "light" | "moderate" | "high";
  const climate = params.get("climate") as "normal" | "hot" | "very_hot";
  const liters = Number(params.get("liters"));
  const isShared = params.get("shared") !== "false";

  const isValid =
    !!liters &&
    !!gender &&
    !!activity &&
    !!climate &&
    !isNaN(age) &&
    !isNaN(weight) &&
    !isNaN(height);

  if (!isValid) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
        Invalid or incomplete hydration result link.
      </div>
    );
  }

  return (
    <>
      <ResultDisplay
        waterLiters={liters}
        name={name}
        isShared={isShared}
        age={age}
        weight={weight}
        height={height}
        gender={gender}
        weightUnit={weightUnit}
        heightUnit={heightUnit}
        activity={activity}
        climate={climate}
      />
      <div className="flex justify-center mt-6">
        <Button onClick={() => router.push("/health/water-intake-calculator")}>
          🔄 Check {isShared ? "Yours" : "Again"}
        </Button>
      </div>
      <HydrationTips />
    </>
  );
}

export default function SharedWaterResultPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 max-w-3xl mx-auto space-y-6">
        <Suspense fallback={<div>Loading...</div>}>
          <WaterResultContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
