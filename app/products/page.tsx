"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import Footer from "@/components/Footer";

const CATEGORIES = ["الكل", "صالونات", "غرف طعام", "غرف نوم", "إكسسوارات وكونسول"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const filteredProducts =
    selectedCategory === "الكل"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#070b0a] text-white selection:bg-[#BFA58E] selection:text-black" dir="rtl">
      {/* شريط علوي */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b0a]/80 backdrop-blur-md px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="pianno.home"
              className="h-8 w-auto object-contain"
            />
            <div>
              <p className="text-sm font-bold leading-none tracking-wide text-white">pianno.home</p>
              <p className="mt-1 text-[10px] font-medium text-[#BFA58E]">للأثاث والمفروشات</p>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-[#BFA58E] hover:text-[#BFA58E]"
          >
            الرئيسية ←
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        {/* المقدمة */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
            تشكيلة pianno.home
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            معرض الأثاث الفاخر
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-white/70 sm:text-base">
            قطع مصممة بحرفية عالية لتلبي أصحاب الذوق الرفيع. تفصيل خاص وفق المساحات والمقاسات المطلوبة.
          </p>
        </div>

        {/* فلاتر التصنيفات */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#BFA58E] text-black shadow-lg shadow-[#BFA58E]/20"
                  : "border border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* شبكة عرض المنتجات */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F2E28]/20 backdrop-blur-sm transition-all duration-300 hover:border-[#BFA58E]/40 hover:-translate-y-1"
            >
              {/* عرض الصورة */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-medium text-[#BFA58E] backdrop-blur-sm">
                  {product.category}
                </span>
              </div>

              {/* تفاصيل المنتج */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold text-white group-hover:text-[#BFA58E] transition-colors">
                  {product.name}
                </h2>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/70">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-[#BFA58E]">
                    {product.price || "حسب الطلب"}
                  </span>
                  <a
                    href={`https://wa.me/971547935346?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن: ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#BFA58E] px-3.5 py-1.5 text-xs font-bold text-black transition-opacity hover:opacity-90"
                  >
                    استفسار عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
