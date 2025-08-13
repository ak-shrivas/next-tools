// File: app/page.tsx or pages/index.tsx (depending on Next.js version)

import {HeroBanner} from "@/components/landing/HeroBanner";
import {FeaturesSection} from "@/components/landing/FeaturesSection";
import {ToolCategories} from "@/components/landing/ToolCategories";
import {PopularTools} from "@/components/landing/PopularTools";
import {CTASection} from "@/components/landing/CTASection";
import {Footer} from "@/components/layouts/Footer";
import {Header} from "@/components/layouts/Header";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <ToolCategories />
        <PopularTools />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
