import React from "react";

type Props = {
  title: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
};

export function CalculatorLayout({ title, left, right }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional Title */}
      {title && (
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
      )}

      {/* Main Content Layout */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8">
      
      <div className="space-y-6">{left}</div>
      <div className="sticky top-20 h-fit">{right}</div>
    </div>
  </div>
  );
}
