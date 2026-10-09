import React from "react";

const PROJECTS = [
  {
    title: "مجلس عربي مودرن",
    category: "مجالس",
    description: "تفصيل متقن مع أقمشة فاخرة وتوزيع هندسي مريح للمساحة.",
    tag: "تصميم وتنفيذ",
  },
  {
    title: "ديكورات وتكسيات جدارية",
    category: "ديكورات",
    description: "تكسيات جدارية عصرية مع إضاءات خفية تبرز جمالية المكان.",
    tag: "ديكور داخلي",
  },
  {
    title: "ستائر تفصيل راقية",
    category: "ستائر",
    description: "أقمشة مختارة بعناية وتشطيب احترافي يتماشى مع طراز الصالة.",
    tag: "توريد وتركيب",
  },
  {
    title: "غرفة نوم ماستر مخصصة",
    category: "غرف نوم",
    description: "سرير متكامل مع ظهر تنجيد وخزائن مدمجة حسب أبعاد الغرفة.",
    tag: "تفصيل خاص",
  },
];

export default function Works() {
  return (
    <section id="works" className="relative border-t border-white/10 bg-[#070b0a] py-20 px-4 text-white sm:px-8 md:py-28" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
            سجل المشاريع
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            أحدث أعمالنا وتفاصيلنا المنفذة
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-white/70 sm:text-base">
            نماذج مختارة من أعمال المجالس والديكورات والستائر وغرف النوم المنفذة بأدق التفاصيل.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0F2E28]/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#BFA58E]/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-medium text-[#BFA58E]">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-white/50">{item.tag}</span>
                </div>

                <div className="my-6 flex aspect-video w-full items-center justify-center rounded-xl bg-neutral-900/60 border border-white/5">
                  <span className="text-xs text-white/30">معاينة العمل</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#BFA58E] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={`https://wa.me/971547935346?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن تنفيذ عمل مشابه لـ: ${item.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 py-2 text-xs font-semibold text-white/90 transition-all hover:border-[#BFA58E] hover:bg-[#BFA58E] hover:text-black"
                >
                  طلب تفصيل مشابه
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
