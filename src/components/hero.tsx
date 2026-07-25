"use client";

import { useLang } from "@/lib/language-context";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-surface/20"></div>
      </div>
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
        <img
          src="/images/logos/zeda-logo.png"
          alt="ZEDA"
          className="h-48 md:h-64 w-auto mx-auto mb-6 md:mb-8 drop-shadow-2xl"
        />
        <div className="marquee-strip mb-6 md:mb-8 py-3 md:py-4 border-y border-primary/20 bg-surface/60 backdrop-blur-sm">
          <span className="text-primary/40 font-display-lg text-[8vw] md:text-6xl tracking-[0.3em]">
            {t("hero.tagline")}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
          <a
            href="/booking"
            className="px-8 md:px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity duration-400 text-center"
          >
            {t("hero.book")}
          </a>
          <a
            href="/gallery"
            className="px-8 md:px-10 py-4 border border-primary text-primary font-button text-button uppercase tracking-widest hover:bg-primary/5 transition-all duration-400 text-center"
          >
            {t("hero.work")}
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 md:h-16 bg-primary mx-auto animate-pulse"></div>
      </div>
    </section>
  );
}
