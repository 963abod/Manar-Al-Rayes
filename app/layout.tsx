import './globals.css';
import React from 'react';

export const metadata = {
  title: 'منار الريّس للأثاث والمفروشات',
  description: 'معرض منار الريّس - فن التفصيل والأثاث الفاخر',
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
