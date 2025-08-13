import ResultDisplay from "@/components/WaterCalculator/ResultDisplay";
import { notFound } from "next/navigation";
import HydrationTips from "@/components/WaterCalculator/HydrationTips";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

// ✅ Static metadata generation
export async function generateMetadata({ searchParams }: { searchParams: Record<string, string> }) {
  const liters = searchParams.liters;
  const weight = searchParams.weight;
  const gender = searchParams.gender;

  if (!liters || !weight || !gender) {
    return {
      title: "Water Intake Calculator",
      description: "Calculate your recommended daily water intake based on weight, age, and lifestyle.",
    };
  }

  return {
    title: `${liters}L Daily Water Intake for ${weight}kg ${gender}`,
    description: `Based on your profile, your recommended hydration goal is ${liters}L/day.`,
  };
}

// ✅ Actual page component
export default function SharedResultPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const liters = parseFloat(searchParams.liters || "");
  const name = searchParams.name || "";
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
                age={Number(searchParams.age)}
                weight={Number(searchParams.weight)}
                height={Number(searchParams.height)}
                gender={searchParams.gender as any}
                weightUnit={searchParams.weightUnit as any}
                heightUnit={searchParams.heightUnit as any}
                activity={searchParams.activity as any}
                climate={searchParams.climate as any}
            />
            <div className="flex justify-center mt-6">
             
            </div>
            <HydrationTips />
          </main>
          <Footer />
        </div>
      );
}


