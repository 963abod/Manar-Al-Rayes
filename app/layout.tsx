import './globals.css';
import React from 'react';
import type { Metadata } from 'next';

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
    <html lang="ar" dir="rtl">
      <body className="bg-[#F9F8F6] text-[#0F2E28] antialiased">
        {children}
      </body>
    </html>
  );
}
