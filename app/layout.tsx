import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#070b0a",
};

export const metadata: Metadata = {
  title: "pianno.home",
  description: "الموقع الرسمي لـ pianno.home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="bg-[#070b0a]">
      <body className="bg-[#070b0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
