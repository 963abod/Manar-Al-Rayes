import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050807] text-white" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* هوية المتجر */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  src="/logs.png"
                  alt="pianno.home"
                  className="w-28 sm:w-32 h-auto shrink-0 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide text-white">pianno.home</p>
                <p className="text-[10px] text-[#BFA58E]">للأثاث والمفروشات الفاخرة</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/60">
              تصميم وتنفيذ متكامل للمجالس، الديكورات الجدارية، الستائر، وغرف النوم بإشراف هندسي وتنفيذ متقن يلبي أرقى المعايير.
            </p>
          </div>

          {/* روابط سريعة — بطاقات بنفس أسلوب بطاقات الصفحة الرئيسية */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
              تصفّح بيانو هوم
            </h4>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                href="/about"
                className="group rounded-xl border border-white/10 bg-[#0F2E28]/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA58E]/40"
              >
                <span className="block text-sm font-bold text-[#BFA58E] transition-colors group-hover:text-white">
                  من نحن
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-white/60">
                  تعرّف على بيانو هوم وخدماتنا
                </span>
              </Link>
              <Link
                href="/works"
                className="group rounded-xl border border-white/10 bg-[#0F2E28]/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA58E]/40"
              >
                <span className="block text-sm font-bold text-[#BFA58E] transition-colors group-hover:text-white">
                  أعمالنا
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-white/60">
                  شاهد نماذج من مشاريعنا
                </span>
              </Link>
              <Link
                href="/products"
                className="group rounded-xl border border-white/10 bg-[#0F2E28]/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA58E]/40"
              >
                <span className="block text-sm font-bold text-[#BFA58E] transition-colors group-hover:text-white">
                  المنتجات
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-white/60">
                  استكشف تشكيلة الأثاث
                </span>
              </Link>
            </div>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#BFA58E]">
              تواصل معنا
            </h4>
            <ul className="mt-4 space-y-3 text-xs text-white/70">
              <li>
                <a
                  href="https://wa.me/971547935346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#BFA58E]"
                >
                  <span className="font-semibold text-white">واتساب:</span>
                  <span dir="ltr">+971 54 793 5346</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+971547935346"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#BFA58E]"
                >
                  <span className="font-semibold text-white">اتصال:</span>
                  <span dir="ltr">+971 54 793 5346</span>
                </a>
              </li>
              <li className="text-[11px] text-white/50">
                أوقات العمل المتاحة: الجمعة 4:00 م – 10:00 م
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/50 sm:flex-row sm:text-right">
          <p>© {currentYear} pianno.home. جميع الحقوق محفوظة.</p>
          <p className="text-[11px] text-white/40">بيانو هوم للمفروشات والديكورات الداخلية</p>
        </div>
      </div>
    </footer>
  );
}
