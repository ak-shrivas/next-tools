// app/ai/productivity-type/[type]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { resultsMap } from "@/data/quizResults";
import { Result, Stream } from "@/components/quiz/Result";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

type Params = {
  params: {
    type: string;
  };
  searchParams: {
    profession?: string;
    name?: string;
    answers?: string;
  };
};

export default function ResultTypePage({ params, searchParams }: Params) {
  const result = resultsMap[params.type as keyof typeof resultsMap];
  if (!result) return notFound();

  const profession = (searchParams.profession || "default") as Stream;
  const name = searchParams.name || "";

  let answers: { [key: string]: number } = {};
  try {
    if (searchParams.answers) {
      answers = JSON.parse(decodeURIComponent(searchParams.answers));
    } else {
      // fallback mock score (e.g. user came via direct link)
      answers = { [result.type]: 3 };
    }
  } catch (err) {
    answers = { [result.type]: 3 };
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-2xl mx-auto px-4 py-12">
        <Result
          result={result}
          profession={profession}
          answers={answers}
          name={name}
          onRestart={() => {}}
        />
      </main>
      <Footer />
    </div>
  );
}