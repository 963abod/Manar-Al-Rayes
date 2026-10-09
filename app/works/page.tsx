import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "أعمالنا | pianno.home",
  description: "سجل أعمال ومشاريع بيانو هوم للمفروشات والديكورات الداخلية - مجالس، ديكورات، ستائر، وغرف نوم.",
};

const PROJECTS = [
  {
    title: "مجلس عربي مودرن",
    category: "مجالس",
    description: "تفصيل متقن مع أقمشة فاخرة وتوزيع هندسي مريح للمساحة.",
    tag: "تصميم وتنفيذ",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ديكورات وتكسيات جدارية",
    category: "ديكورات",
    description: "تكسيات جدارية عصرية مع إضاءات خفية تبرز جمالية المكان.",
    tag: "ديكور داخلي",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ستائر تفصيل راقية",
    category: "ستائر",
    description: "أقمشة مختارة بعناية وتشطيب احترافي يتماشى مع طراز الصالة.",
    tag: "توريد وتركيب",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "غرفة نوم ماستر مخصصة",
    category: "غرف نوم",
    description: "سرير متكامل مع ظهر تنجيد وخزائن مدمجة حسب أبعاد الغرفة.",
    tag: "تفصيل خاص",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function WorksPage() {
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

      {/* المحتوى الرئيسي */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
            سجل المشاريع
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            أحدث أعمالنا وتفاصيلنا المنفذة
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light text-white/70 sm:text-base">
            نماذج مختارة من أعمال المجالس والديكورات والستائر وغرف النوم المنفذة بأعلى معايير الإتقان والتفصيل الهندسي.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F2E28]/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#BFA58E]/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-medium text-[#BFA58E]">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-white/50">{item.tag}</span>
                </div>

                <div className="my-5 relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-[#BFA58E] transition-colors">
                  {item.title}
                </h2>
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
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
