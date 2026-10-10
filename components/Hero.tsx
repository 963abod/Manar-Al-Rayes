'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ------------------------------------------------------------------ *
 *  Hero — scroll-driven showroom video
 *
 *  • The section is a tall "runway"; a sticky 100svh stage stays pinned
 *    while the user scrolls through it.
 *  • Scroll progress (0 → 1) is mapped to a video frame. The videos are
 *    encoded with a short GOP (a keyframe every 4th frame, P-frames only,
 *    no B-frames) so any seek decodes at most 4 tiny frames — instant to
 *    the eye, yet far sharper per byte than all-intra.
 *  • Only ONE video is ever downloaded: horizontal for landscape
 *    viewports, vertical for portrait, in a lighter tier on slow
 *    connections / low-end devices. Save-Data and reduced-motion users get
 *    the still poster only.
 *  • No React state is touched while scrolling — a single rAF loop writes
 *    straight to the DOM (transform / opacity only).
 * ------------------------------------------------------------------ */

const FPS = 24;

type Kind = 'h' | 'v';

const SOURCES: Record<Kind, { hi: string; lo: string }> = {
  h: { hi: '/hero/showroom-h-1280-v2.mp4', lo: '/hero/showroom-h-960-v2.mp4' },
  v: { hi: '/hero/showroom-v-720-v2.mp4', lo: '/hero/showroom-v-540-v2.mp4' },
};

// 24×14 / 18×32 blurred first frames, inlined so the stage paints instantly
const PLACEHOLDER_H = 'data:image/jpeg;base64,/9j//gAQTGF2YzYwLjMxLjEwMgD/2wBDAAgQEBMQExYWFhYWFhoYGhsbGxoaGhobGxsdHR0iIiIdHR0bGx0dICAiIiUmJSMjIiMmJigoKDAwLi44ODpFRVP/xABiAAEBAQAAAAAAAAAAAAAAAAAGBQQBAQEBAAAAAAAAAAAAAAAAAAIDARAAAQMDAwUAAwEAAAAAAAAAAQADAhEhBEFxEjEyE5EigQVRsREBAQEAAAAAAAAAAAAAAAAAAAEh/8AAEQgAEgAgAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8ABsuPOB3kbRIHs0W6GKXHCIi3X8Kg680GQIst8pisjCV6g61j9LZhZbDIBdkeVqgC1P5eQ9qVtWhLiYDfjrKIqCeqH5bI89GwL6JPL9hiSjYTFdeMqf6h2S/Bwx8UjyBFSLH0hrUuAF1RHYdlPhqqA7DslRijIfA2RadpJVLsGyKOdUYT/9k=';
const PLACEHOLDER_V = 'data:image/jpeg;base64,/9j//gAQTGF2YzYwLjMxLjEwMgD/2wBDAAgQEBMQExYWFhYWFhoYGhsbGxoaGhobGxsdHR0iIiIdHR0bGx0dICAiIiUmJSMjIiMmJigoKDAwLi44ODpFRVP/xABwAAACAwEBAAAAAAAAAAAAAAAEBQYHAgMBAQEBAQEAAAAAAAAAAAAAAAAAAQMCEAACAAQEAwgCAwEAAAAAAAABAgAEEQMhMVEScbFBIpGhojITQlOSFNGBYVQRAQEBAQAAAAAAAAAAAAAAAAABESH/wAARCAAqABgDASIAAhEAAxEA/9oADAMBAAIRAxEAPwBEtzb8jn15YwUt7XwiILMOwBy7REWBKyC33xqOBjBvoD3LWoXhhhyMee7b+0+X+IFnUSxeawDU4UrnT+oU7IDBlmsW03oUNepU1rpTlmItK1N2bHZNCSMdQKQBJNbRgLyVuAfNt9Brjuz60iRvflbebY/4qrzjmqrGa23Jt3zqq0PfHHYdR3iJG09Ky4dCt5w5FQ9CKE9KLr0gT96Q/wCdvxi9RJtyPnbU8VBgxDt9C2xwUDxGMcYyh7Q4wCiZW3cctdthjlUk9IX+3LfUvmh9e9TQHtGggP/Z';

/** [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] in scroll progress */
const CHAPTERS: [number, number, number, number][] = [
  [-1, -1, 0.17, 0.27], // intro
  [0.3, 0.38, 0.5, 0.6], // salon
  [0.62, 0.7, 0.78, 0.86], // lobby
  [0.88, 0.95, 9, 10], // finale (stays)
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

function chapterOpacity(p: number, [a, b, c, d]: [number, number, number, number]) {
  if (p < a) return 0;
  if (p < b) return smooth((p - a) / (b - a));
  if (p <= c) return 1;
  if (p < d) return 1 - smooth((p - c) / (d - c));
  return 0;
}

const NAV_ITEMS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المنتجات', href: '/products' },
  { label: 'من نحن', href: '/about' },
  { label: 'أعمالنا', href: '/works' },
];

function CtaButtons() {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <a
        href="/products"
        className="rounded-full bg-[#BFA58E] px-6 py-3 text-sm font-bold text-[#070e0d] shadow-lg transition-colors hover:bg-[#d2bda9] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        استعرض المنتجات
      </a>
      <a
        href="/works"
        className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        أعمالنا
      </a>
      <a
        href="#about"
        className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        من نحن
      </a>
    </div>
  );
}

export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<'scrub' | 'static'>('scrub');
  const pathname = usePathname();

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!wrap || !stage || !video) return;

    const nav: any = navigator;
    const conn = nav.connection;

    // Reduced motion / Save-Data → poster only, nothing downloaded.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) {
      setMode('static');
      return;
    }

    /* ---------- state (plain variables: no re-renders while scrolling) ---------- */
    let target = 0; // where the scroll is
    let current = 0; // smoothed value that drives the video
    let top = 0;
    let range = 1;
    let inView = true;
    let ready = false;
    let revealed = false;
    let frames = 240;
    let lastIdx = -1;
    let raf = 0;
    let lastT = 0;
    let kind: Kind = 'h';
    let loadId = 0;
    let objUrl: string | null = null;
    let abort: AbortController | null = null;
    let resizeTimer: number | undefined;
    const lastOpacity: number[] = [];

    /* ---------- measuring ---------- */
    const computeTarget = () => {
      target = clamp((window.scrollY - top) / range);
    };
    const measure = () => {
      top = wrap.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, wrap.offsetHeight - stage.offsetHeight);
      computeTarget();
    };

    /* ---------- DOM updates (compositor-friendly props only) ---------- */
    const paintUI = (p: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp(p / 0.05));
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = chapterRefs.current[i];
        if (!el) continue;
        const o = chapterOpacity(p, CHAPTERS[i]);
        if (o === lastOpacity[i]) continue;
        lastOpacity[i] = o;
        const enteringSide = p < CHAPTERS[i][1];
        const ty = (enteringSide ? 1 : -1) * (1 - o) * 28;
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0)`;
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      }
    };

    /* ---------- the render loop: runs only while something is moving ---------- */
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - lastT) / 1000 || 0.016);
      lastT = now;

      // 1. حساب المسافة المتبقية
      const diff = target - current;

      // 2. تخميد أخف لإعطاء انزلاق ناعم مع عتبة إيقاف أدق
      current = Math.abs(diff) < 0.0001
        ? target
        : current + diff * (1 - Math.exp(-dt * 4.8));

      // رسم عناصر الواجهة مع القيمة المُنَعّمة
      paintUI(current);

      // استمرار تدوير الفريمات طالما لم نصل للهدف بعد
      let pending = Math.abs(target - current) > 0.0001;

      if (ready) {
        const idx = Math.round(current * (frames - 1));

        if (idx !== lastIdx) {
          // التحقق من جاهزية الفيديو قبل طلب الفريم التالي
          if (!video.seeking && video.readyState >= 2) {
            video.currentTime = (idx + 0.5) / FPS;
            lastIdx = idx;
          } else {
            pending = true;
          }
        }
      }

      if (pending) raf = requestAnimationFrame(frame);
    };
    const ensure = () => {
      if (raf) return;
      lastT = performance.now();
      raf = requestAnimationFrame(frame);
    };

    /* ---------- choosing + loading exactly one video ---------- */
    const pick = () => {
      const k: Kind = window.innerWidth / window.innerHeight < 1 ? 'v' : 'h';
      const slow =
        !!conn &&
        (/(^|-)(2g|3g)$/.test(conn.effectiveType || '') || (conn.downlink && conn.downlink < 1.5));
      const lowEnd =
        (nav.deviceMemory && nav.deviceMemory <= 2) ||
        (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2);
      const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
      const light = slow || lowEnd || px < (k === 'h' ? 1000 : 600);
      return { k, url: light ? SOURCES[k].lo : SOURCES[k].hi };
    };

    const onSeeked = () => {
      if (!revealed && ready) {
        revealed = true;
        video.style.opacity = '1'; // poster = frame 0, so the cross-fade is invisible
      }
    };

    const onData = async () => {
      const dur = video.duration;
      frames = Math.max(2, Math.round((isFinite(dur) && dur > 0 ? dur : 10) * FPS));
      // iOS/Safari only paints seeked frames reliably after a play()→pause() unlock.
      try {
        await Promise.race([video.play(), new Promise((r) => setTimeout(r, 400))]);
      } catch (e) {
        /* autoplay blocked — seeking still works on most browsers */
      }
      video.pause();
      computeTarget();
      current = target; // snap (handles reload mid-page)
      lastIdx = -1;
      ready = true;
      ensure();
    };

    const load = async () => {
      const id = ++loadId;
      const { k, url } = pick();
      kind = k;
      ready = false;
      revealed = false;
      video.style.opacity = '0';
      abort?.abort();
      abort = new AbortController();
      try {
        // Download the whole file once, then scrub from memory — no range
        // requests mid-scroll, which is what makes iOS/slow networks stutter.
        const res = await fetch(url, { signal: abort.signal });
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        if (id !== loadId) return;
        const next = URL.createObjectURL(blob);
        video.src = next;
        if (objUrl) URL.revokeObjectURL(objUrl);
        objUrl = next;
        video.load();
      } catch (e: any) {
        if (e && e.name === 'AbortError') return;
        if (id !== loadId) return;
        video.src = url; // fall back to normal streaming
        video.load();
      }
    };

    /* ---------- events ---------- */
    const onScroll = () => {
      if (!inView) return;
      computeTarget();
      if (Math.abs(target - current) > 0.0001) ensure();
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        const nextKind: Kind = window.innerWidth / window.innerHeight < 1 ? 'v' : 'h';
        if (nextKind !== kind) load();
        else ensure();
      }, 200);
    };

    video.addEventListener('loadeddata', onData);
    video.addEventListener('seeked', onSeeked);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          computeTarget();
          ensure();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(wrap);

    measure();
    current = target;
    paintUI(current);
    load();

    (wrap as any).__skip = () => window.scrollTo({ top: top + wrap.offsetHeight, behavior: 'auto' });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      abort?.abort();
      io.disconnect();
      video.removeEventListener('loadeddata', onData);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, []);

  const skip = () => (wrapRef.current as any)?.__skip?.();
  const isStatic = mode === 'static';

  const hidden = (i: number): React.CSSProperties => ({
    opacity: i === 0 ? 1 : 0,
    visibility: i === 0 ? 'visible' : 'hidden',
    willChange: 'transform, opacity',
  });

  return (
    <section
      id="hero"
      ref={wrapRef}
      aria-label="معرض منار الريّس"
      className={isStatic ? 'relative h-[100svh]' : 'relative h-[420svh] md:h-[460svh]'}
    >
      <div
        ref={stageRef}
        dir="rtl"
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#070b0a] select-none"
        style={{ contain: 'paint' }}
      >
        {/* 1 — instant blurred placeholder, then the real poster (LCP) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center portrait:hidden"
          style={{ backgroundImage: `url(${PLACEHOLDER_H})` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-cover bg-center portrait:block"
          style={{ backgroundImage: `url(${PLACEHOLDER_V})` }}
        />
        <picture>
          <source media="(orientation: portrait)" srcSet="/hero/poster-v-v2.jpg" />
          <img
            src="/hero/poster-h-v2.jpg"
            alt=""
            decoding="async"
            {...({ fetchpriority: 'high' } as any)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* 2 — scrubbed video (src is set from JS; only one file is fetched) */}
        {!isStatic && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 pointer-events-none"
          />
        )}

        {/* 3 — static legibility gradients (never animated) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/45 via-transparent to-transparent" />

        {/* الناف بار التفاعلي */}
        <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          <nav className="pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-xl shadow-2xl">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* شريط المسار للحركة */}
            <div className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] overflow-hidden">
              <span
                className="block h-full w-12 rounded-full bg-gradient-to-r from-transparent via-[#BFA58E] to-transparent shadow-[0_0_8px_#BFA58E] will-change-transform"
                style={{
                  animation: "navScanGpu 2.4s ease-in-out infinite alternate",
                }}
              />
            </div>
          </nav>

          <style>{`
            @keyframes navScanGpu {
              0% {
                transform: translate3d(0%, 0, 0);
              }
              100% {
                transform: translate3d(320%, 0, 0);
              }
            }
          `}</style>
        </header>

        {/* 5 — copy */}
        {isStatic ? (
          <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-16 sm:px-12 md:px-16 md:pb-24">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#BFA58E]">pianno.home للأثاث والمفروشات</span>
              <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white md:text-6xl">فن التفصيل والأثاث الفاخر</h1>
              <CtaButtons />
            </div>
          </div>
        ) : (
          <>
            {/* المشهد الأول */}
            <div
              ref={(el) => { chapterRefs.current[0] = el; }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={hidden(0)}
            >
              {/* الشعار واسم المعرض: بنصف الجدار تماماً فوق الكنبة */}
              <div className="absolute top-[28%] inset-x-0 flex flex-col items-center justify-center text-center px-4">
                <div className="flex h-64 w-64 items-center justify-center p-0 drop-shadow-2xl sm:h-72 sm:w-72">
                  <img
                    src="/logo.png"
                    alt="pianno.home"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-3 text-xs font-bold tracking-widest text-[#BFA58E] drop-shadow-md">
                  PIANNO.HOME للأثاث والمفروشات
                </span>
              </div>

              {/* النصوص السفلية كما هي */}
              <div className="absolute inset-x-0 bottom-0 px-6 pb-28 sm:px-12 md:px-16 md:pb-28">
                <h1 className="text-3xl font-extrabold text-white drop-shadow-lg md:text-5xl">
                  فن التفصيل والأثاث الفاخر
                </h1>
                <p className="mt-3 text-sm font-light text-white/75 md:text-base">
                  تجوّل في صالة العرض بمجرد التمرير
                </p>
              </div>
            </div>
            {/* salon */}
            <div ref={(el) => { chapterRefs.current[1] = el; }} style={hidden(1)} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-28 sm:px-12 md:px-16 md:pb-28">
              <div className="max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#BFA58E]">الجناح المعماري</span>
                <h2 className="mt-2 text-3xl font-extrabold text-white drop-shadow-lg md:text-5xl">صالون الاستقبال الملكي</h2>
                <p className="mt-3 text-sm font-light text-white/75 md:text-base">أرائك بتصميم منحني مع خامات خشب الجوز المعتق</p>
              </div>
            </div>
            {/* lobby */}
            <div ref={(el) => { chapterRefs.current[2] = el; }} style={hidden(2)} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-28 sm:px-12 md:px-16 md:pb-28">
              <div className="max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#BFA58E]">الجناح المعماري</span>
                <h2 className="mt-2 text-3xl font-extrabold text-white drop-shadow-lg md:text-5xl">البهو المعماري والكونسول</h2>
                <p className="mt-3 text-sm font-light text-white/75 md:text-base">انسيابية المساحات وتناغم خطوط الرخام والإنارة المخفية</p>
              </div>
            </div>
            {/* finale */}
            <div
              ref={(el) => { chapterRefs.current[3] = el; }}
              style={hidden(3)}
              className="absolute inset-x-0 bottom-0 z-30 px-6 pb-28 sm:px-12 md:px-16 md:pb-28"
            >
              <div className="max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#BFA58E]">
                  pianno.home
                </span>
                <h2 className="mt-2 text-3xl font-extrabold text-white drop-shadow-lg md:text-5xl">
                  زوروا معرضنا
                </h2>
                <p className="mt-3 text-sm font-light text-white/75 md:text-base">
                  أثاث فاخر وديكورات بتفصيل حسب الطلب
                </p>
                <CtaButtons />
              </div>
            </div>

            {/* scroll hint + progress + skip */}
            <div ref={hintRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-14 z-30 flex justify-center">
              <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/50 pt-1.5">
                <span className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
              </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center">
              <div className="h-px w-40 overflow-hidden bg-white/25 sm:w-56">
                <div ref={barRef} className="h-full w-full origin-right bg-[#BFA58E]" style={{ transform: 'scaleX(0)' }} />
              </div>
            </div>
            <button
              type="button"
              onClick={skip}
              className="absolute bottom-4 left-4 z-40 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[11px] text-white/80 transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-5 sm:left-6"
            >
              تخطَّ المعرض
            </button>
          </>
        )}
      </div>
    </section>
  );
}
