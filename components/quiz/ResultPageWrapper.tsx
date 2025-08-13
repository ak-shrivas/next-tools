"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Result, ResultType, Stream } from "@/components/quiz/Result";

type Props = {
  result: ResultType;
  profession: Stream;
  name: string;
};

export default function ResultPageWrapper({ result, profession, name }: Props) {
  const searchParams = useSearchParams();
  const answersEncoded = searchParams.get("answers");

  const answers = useMemo(() => {
    try {
      return answersEncoded
        ? JSON.parse(decodeURIComponent(answersEncoded))
        : { [result.type]: 3 };
    } catch {
      return { [result.type]: 3 };
    }
  }, [answersEncoded, result.type]);

  return (
    <Result
      result={result}
      profession={profession}
      name={name}
      answers={answers}
      onRestart={() => {}}
    />
  );
}
