"use client";

import CalculatorForm from "@/components/WaterCalculator/CalculatorForm";
import HydrationTips from "@/components/WaterCalculator/HydrationTips";
import { CalculatorLayout } from "@/components/layouts/CalculatorLayout";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function WaterIntakePage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CalculatorLayout
        title="💧 Daily Water Intake Calculator"
        left={
          <section>
            <CalculatorForm />
          </section>
        }
        right={
          <>
            <div className="text-gray-500 text-center text-sm">
              Fill in the form to see your hydration needs.
            </div>
            <HydrationTips />
          </>
         
          
        }
      />
      <Footer />
    </div>
  );
}
