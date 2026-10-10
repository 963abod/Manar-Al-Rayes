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
      {/* شريط علوي مطابق لصفحة المنتجات والأعمال */}
      <header className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* كتلة الشعار والاسم متلاصقين بأقصى اليسار */}
        <div className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logs.png"
            alt="pianno.home"
            className="w-28 sm:w-32 h-auto shrink-0 object-contain drop-shadow-md"
          />
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-bold leading-tight text-white">
              pianno.home
            </span>
            <span className="text-[10px] sm:text-xs text-[#BFA58E]">
              للأثاث والمفروشات
            </span>
          </div>
        </div>
        {/* زر الرئيسية بأقصى الجهة المقابلة */}
        <Link
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white backdrop-blur-md hover:bg-white/10 transition-colors"
        >
          الرئيسية ←
        </Link>
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

          {/* بطاقة الهوية الجانبية بنفس مقاس وتنسيق بطاقة الصفحة الرئيسية */}
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0F2E28]/20 px-6 py-6 flex flex-col items-center text-center">
            <img
              src="/logs.png"
              alt="بيانو هوم"
              className="mx-auto block w-48 sm:w-52 h-auto object-contain drop-shadow-xl"
            />
            <h2 className="mt-3 text-xl font-bold text-white">بيانو هوم</h2>
            <p className="mt-2 text-xs text-[#BFA58E]">للمفروشات والديكورات الداخلية</p>
            <p className="mt-4 text-xs leading-relaxed text-white/60 max-w-xs">
              مجالس • ديكورات جدارية • ستائر • غرف نوم ماستر
            </p>
          </div>
        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
