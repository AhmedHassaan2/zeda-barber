"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

const images = [
  "/images/gallery/468327681_18072331459624568_4549114272353535235_n.jpg",
  "/images/gallery/491957006_1197250025744875_8121157652049572953_n.jpg",
  "/images/gallery/492121218_1196050999198111_2191836169187809032_n.jpg",
  "/images/gallery/492301544_1198853925584485_7383226821735499964_n.jpg",
  "/images/gallery/492308762_1196051075864770_2871749411909240801_n.jpg",
  "/images/gallery/492529379_1197942759008935_7471260529715659363_n.jpg",
];

export default function GalleryPreview() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-divider w-full mb-16 md:mb-24"></div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary block mb-4">{t("gallery.subtitle")}</span>
            <h2 className="font-display-lg text-headline-lg">{t("gallery.title")}</h2>
          </div>
          <Link
            href="/gallery"
            className="font-button text-button uppercase text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            {t("gallery.all")}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>

        {/* Main carousel view */}
        <div className="relative rounded-lg overflow-hidden aspect-[16/7] md:aspect-[21/9] mb-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: current === i ? 1 : 0 }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent"></div>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-400 ${
                  current === i
                    ? "bg-primary w-6"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`overflow-hidden rounded-sm aspect-square transition-all duration-400 ${
                current === i
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={src}
                alt={`Thumb ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
