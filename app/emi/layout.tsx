// File: app/emi/india/layout.tsx
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto">
      <Header />
      {children}

      <Footer />
    </div>
  );
}
