// =============================================
// app/page.tsx  (Server Component)
// =============================================
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import Hero from "@/components/landing/Hero";
import ToolCategories from "@/components/landing/ToolCategories";
import FeaturedTools from "@/components/landing/FeaturedTools";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import FooterCTA from "@/components/landing/FooterCTA";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <Header />
      <main className="relative overflow-hidden">
        {/* Decorative animated blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <Hero />
        <ToolCategories />
        <FeaturedTools />
        <Stats />
        <Testimonials />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}