// app/ai/productivity-type/[type]/[profession]/[name]/page.tsx
import { headers } from "next/headers";
import { resultsMap } from "@/data/quizResults";
import { notFound } from "next/navigation";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import ResultPageWrapper from "@/components/quiz/ResultPageWrapper";
import { Stream } from "@/components/quiz/Result";

type Props = {
  params: {
    type: string;
    profession: string;
    name: string;
  };
};

export async function generateMetadata({ params }: { params: Promise<Props["params"]> }) {
  const resolvedParams = await params;
  const { type, profession, name } = resolvedParams;

  const result = resultsMap[type];
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}/ai/productivity-type/${type}/${profession}/${name}`;

  return {
    title: `${name}'s AI Productivity Type: ${result?.title}`,
    description: result?.description,
    openGraph: {
      title: `${name}'s AI Productivity Type: ${result?.title}`,
      description: result?.description,
      url: fullUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}'s AI Productivity Type: ${result?.title}`,
      description: result?.description,
    },
  };
}



export async function generateStaticParams() {
  const professions = ["student", "freelancer", "9to5", "founder", "chill", "default"];
  const names = ["your"]; // fallback placeholder

  const params = [];

  for (const type of Object.keys(resultsMap)) {
    for (const profession of professions) {
      for (const name of names) {
        params.push({ type, profession, name });
      }
    }
  }

  return params;
}


export default async function ResultPage({ params }: Props) {
  const { type, profession, name: rawName } = params;

  const result = resultsMap[type];
  if (!result) return notFound();

  const decodedName = decodeURIComponent(rawName ?? "Your");
  const safeProfession = (profession as Stream) ?? "default";


  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-2xl mx-auto px-4 py-12">
        <ResultPageWrapper
          result={result}
          profession={safeProfession}
          name={decodedName}
        />
      </main>
      <Footer />
    </div>
  );
}

