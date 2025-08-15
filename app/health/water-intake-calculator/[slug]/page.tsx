import ResultDisplay from "@/components/WaterCalculator/ResultDisplay";
import { notFound } from "next/navigation";
import HydrationTips from "@/components/WaterCalculator/HydrationTips";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

// ✅ Static metadata generation
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const liters = sp.liters;
  const weight = sp.weight;
  const gender = sp.gender;

  if (!liters || !weight || !gender) {
    return {
      title: "Water Intake Calculator",
      description:
        "Calculate your recommended daily water intake based on weight, age, and lifestyle.",
    };
  }

  return {
    title: `${liters}L Daily Water Intake for ${weight}kg ${gender}`,
    description: `Based on your profile, your recommended hydration goal is ${liters}L/day.`,
  };
}

// ✅ Actual page component
export default async function SharedResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  const liters = parseFloat(sp.liters || "");
  const name = sp.name || "";
  const isShared = true;

  if (!liters || isNaN(liters)) return notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 max-w-3xl mx-auto space-y-6">
        <ResultDisplay
          waterLiters={liters}
          name={name}
          isShared={isShared}
          age={Number(sp.age)}
          weight={Number(sp.weight)}
          height={Number(sp.height)}
          gender={sp.gender as any}
          weightUnit={sp.weightUnit as any}
          heightUnit={sp.heightUnit as any}
          activity={sp.activity as any}
          climate={sp.climate as any}
        />
        <div className="flex justify-center mt-6"></div>
        <HydrationTips />
      </main>
      <Footer />
    </div>
  );
}
