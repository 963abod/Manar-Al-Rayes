import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "من نحن | pianno.home",
  description: "تعرف على بيانو هوم للمفروشات والديكورات الداخلية - تصميم وتنفيذ مجالس وديكورات وستائر وغرف نوم.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070b0a] text-white selection:bg-[#BFA58E] selection:text-black" dir="rtl">
      {/* شريط علوي */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b0a]/80 backdrop-blur-md px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#BFA58E]/40 bg-[#0F2E28] text-xs font-bold tracking-wider text-[#BFA58E]">
              PH
            </div>
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

      {/* المحتوى الرئيسي */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
              عن pianno.home
            </span>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              إتقان التفصيل، وهندسة المساحات الداخلية
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
              في pianno.home نبتكر حلولاً متكاملة للأثاث والديكور الداخلي تجمع بين الفخامة والعملية، بإشراف هندسي وتنفيذ احترافي مخصص وفق أعلى معايير الجودة والتفصيل الدقيق لكل مساحة.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-5">
                <h3 className="text-sm font-bold text-[#BFA58E]">تصميم وتنفيذ مجالس</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  تفصيل مجالس مودرن وكلاسيك بأقمشة مختارة وخشب زان متين.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-5">
                <h3 className="text-sm font-bold text-[#BFA58E]">ديكورات وتكسيات جدارية</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  حلول ديكور جداري وإضاءات تبرز هوية وفخامة المكان.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-5">
                <h3 className="text-sm font-bold text-[#BFA58E]">ستائر راقية</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  تفصيل وتوريد وتركيب أحدث صيحات الستائر بخامات ممتازة.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-5">
                <h3 className="text-sm font-bold text-[#BFA58E]">غرف نوم ماستر</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  أسرّة منجدة وخزائن مدمجة مفصلة حسب أبعاد الغرفة بدقة.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={`https://wa.me/971547935346?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات pianno.home")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#BFA58E] px-6 py-3 text-xs font-bold text-black transition-opacity hover:opacity-90"
              >
                تواصل معنا عبر واتساب
              </a>
            </div>
          </div>

          {/* بطاقة الهوية الجانبية */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0F2E28]/20 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#BFA58E]/40 bg-[#0F2E28] text-2xl font-bold tracking-wider text-[#BFA58E]">
              PH
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">بيانو هوم</h2>
            <p className="mt-2 text-sm font-medium text-[#BFA58E]">للمفروشات والديكورات الداخلية</p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
              تصميم وتنفيذ مجالس • ديكورات • ستائر • غرف نوم
            </p>
            <span className="mt-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] text-white/70">
              إشراف هندسي وتنفيذ متقن
            </span>
          </div>
        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
