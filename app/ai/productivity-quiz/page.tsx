// app/ai/productivity-quiz/page.tsx
"use client";

import { Suspense } from "react";
import ProductivityQuizPage from "./ProductivityQuizPage";

export default function ProductivityQuizPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductivityQuizPage />
    </Suspense>
  );
}
