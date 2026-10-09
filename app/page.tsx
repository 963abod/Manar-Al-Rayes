import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Works from '@/components/Works';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Works />
    </main>
  );
}
