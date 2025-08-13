// app/ai/productivity-quiz/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Result, Stream } from "@/components/quiz/Result";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useSearchParams } from "next/navigation";
import { resultsMap } from "@/data/quizResults";
import { Sparkles } from "lucide-react";

type PersonalityType = keyof typeof resultsMap; // "zen" | "procrastinator" | ...
type ProfessionType = "student" | "freelancer" | "9to5" | "founder" | "chill" | "default";

type QuestionOption = {
  text: string;
  type: PersonalityType | ProfessionType;
};

type Question = {
  id: string;
  question: string;
  skippable?: boolean;
  options: QuestionOption[];
 
};

const baseQuestions: Question[] =  
      [
        {
          id: "tabs",
          question: "Your tab situation right now?",
          skippable: true,
          options: [
            { text: "One tab. One goal.", type: "zen" },
            { text: "5+ tabs — totally under control.", type: "organized" },
            { text: "15 tabs and chaos.", type: "maniac" },
            { text: "Just reopened 20 from last time.", type: "procrastinator" },
          ],
        },
        {
          id: "deadline",
          question: "When a deadline approaches…",
          skippable: true,
          options: [
            { text: "Finished early.", type: "organized" },
            { text: "Last video then start.", type: "procrastinator" },
            { text: "Hyperfocus activated.", type: "zen" },
            { text: "All-nighter magic.", type: "maniac" },
          ],
        },
        {
          id: "todo",
          question: "Your to-do list strategy?",
          skippable: true,
          options: [
            { text: "What list?", type: "maniac" },
            { text: "Sticky notes everywhere.", type: "procrastinator" },
            { text: "Notion soulmate.", type: "organized" },
            { text: "One perfect list.", type: "zen" },
          ],
        },
      ];

const professionOptions: QuestionOption[] = [
  { text: "Student grinding assignments", type: "student" },
  { text: "Freelancer juggling clients", type: "freelancer" },
  { text: "9–5 warrior in survival mode", type: "9to5" },
  { text: "Entrepreneur building the next big thing", type: "founder" },
  { text: "Just chilling 😎", type: "chill" },
];
      
export default function ProductivityQuizPage() {
  const searchParams = useSearchParams();
  const resultTypeFromURL = searchParams.get("result");
  const professionFromURL = searchParams.get("profession") as Stream | null;
  const nameFromURL = searchParams.get("name") || "";

  const answersEncoded = searchParams.get("answers");
  const answersFromURL = answersEncoded
    ? JSON.parse(decodeURIComponent(answersEncoded))
    : {};


  const resultFromURL = resultTypeFromURL && resultsMap[resultTypeFromURL]
    ? resultsMap[resultTypeFromURL as keyof typeof resultsMap]
    : null;

  const [step, setStep] = useState(() =>
    resultFromURL ? baseQuestions.length + 2 : 0
  );

  const defaultScoreMap = resultFromURL
  ? { [resultFromURL.type]: 3 } // mock score of 3 to show single bar
  : {};

  const [answers, setAnswers] = useState<{ [key: string]: number }>(() => {
    if (answersEncoded) {
      return answersFromURL;
    } else if (resultFromURL) {
      return { [resultFromURL.type]: 3 }; // fallback
    } else {
      return {};
    }
  });
  
  
  
  const [profession, setProfession] = useState<Stream | null>(
    professionFromURL || null
  );

  const [name, setName] = useState<string>(nameFromURL);
  const [tempName, setTempName] = useState<string>("");

  const handleAnswer = (type: string | null) => {
    if (step === 0 && type) setProfession(type as Stream);
    if (type) {
      setAnswers((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    }
    setStep(step + 1);
  };

  const handleNameSubmit = () => {
    setName(tempName.trim());
    setStep(1);
  };

  const getResult = () => {
    const sorted = Object.entries(answers).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return resultsMap["zen"]; // fallback
    const [topType] = sorted[0];
    return resultsMap[topType as keyof typeof resultsMap] || resultsMap["zen"];
  };


  const restartQuiz = () => {
    setStep(0);
    setAnswers({});
    setProfession(null);
    setTempName("");
    setName("");
  };

  const question = baseQuestions[step-2]; // Adjust for profession and name screens
  const result = step >= baseQuestions.length ? getResult() : null;


  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-500 w-6 h-6" /> AI Productivity Quiz
        </h1>
        {/* Name input screen */}
        {step === 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800">Let’s start with your name 👇</h2>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <Button onClick={handleNameSubmit} disabled={!tempName.trim()}>
              Start Quiz
            </Button>
          </div>
        )}
        {step === 1 && (
          // Profession screen
          <div className="bg-white p-6 ...">
            <h2 className="text-xl font-semibold text-gray-800">
              Pick your current grind (or vibe):
            </h2>
            <div className="grid gap-3 mt-4">
              {professionOptions.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => {
                    setProfession(opt.type as Stream);
                    setStep(2);
                  }}
                >
                  {opt.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        {question && step >= 2 && step < baseQuestions.length + 2 && (
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>
            <div className="grid gap-3 mt-4">
              {question.options.map((opt, idx) => (
                <Button key={idx} variant="outline" onClick={() => handleAnswer(opt.type)}>
                  {opt.text}
                </Button>
              ))}
              {question.skippable && (
                <Button variant="ghost" onClick={() => handleAnswer(null)} className="text-gray-400">
                  Skip
                </Button>
              )}
            </div>
          </div>
        )}


        {/* Result screen */}
        {result && step >= baseQuestions.length + 2 && (
          <Result
            result={result}
            onRestart={restartQuiz}
            profession={profession}
            answers={answers}
            name={name}
          />
        )}

      </main>
      <Footer />
    </div>
  );
}
