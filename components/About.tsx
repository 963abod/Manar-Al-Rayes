import React from "react";

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-[#070b0a] py-20 px-4 text-white sm:px-8 md:py-28" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
              عن pianno.home
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              إتقان التفصيل، وهندسة المساحات الداخلية
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              في pianno.home نبتكر حلولاً متكاملة للأثاث والديكور الداخلي تجمع بين الفخامة والعملية، بإشراف هندسي وتنفيذ احترافي مخصص لكل مساحة.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-4">
                <h3 className="text-sm font-bold text-[#BFA58E]">تصميم وتنفيذ مجالس</h3>
                <p className="mt-1 text-xs text-white/60">تفصيل مجالس مودرن وكلاسيك بأعلى معايير الجودة.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0F2E28]/30 p-4">
                <h3 className="text-sm font-bold text-[#BFA58E]">ديكورات وستائر</h3>
                <p className="mt-1 text-xs text-white/60">أقمشة وخامات راقية تمنح المكان فخامة استثنائية.</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0F2E28]/20 px-6 py-6 flex flex-col items-center text-center">
            <img
              src="/logs.png"
              alt="بيانو هوم"
              className="mx-auto block h-14 w-auto object-contain drop-shadow-xl"
            />
            <h3 className="mt-3 text-xl font-bold text-white">بيانو هوم</h3>
            <p className="mt-2 text-xs text-[#BFA58E]">للمفروشات والديكورات الداخلية</p>
            <p className="mt-4 text-xs leading-relaxed text-white/60 max-w-xs">
              مجالس • ديكورات جدارية • ستائر • غرف نوم ماستر
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
