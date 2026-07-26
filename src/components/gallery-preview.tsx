"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function GalleryPreview() {
  const { t } = useLang();
  const [images, setImages] = useState<string[]>([]);
  const [colorIndex, setColorIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("/api/gallery-images");
      const data = await res.json();
      setImages(data.images ?? []);
    }
    fetchImages();
  }, []);

  const advance = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, advance, images.length]);

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-divider w-full mb-16 md:mb-24"></div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
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
        <div
          className="grid grid-cols-3 gap-3 md:gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden group relative cursor-pointer rounded-sm animate-fade-in-up"
              style={{ animationDelay: `${(i % 12) * 80}ms` }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className={`w-full h-full object-cover aspect-[4/5] transition-all duration-[2000ms] ${
                  colorIndex === i ? "grayscale-0" : "img-grayscale"
                } group-hover:grayscale-0 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-label-caps text-primary uppercase tracking-wider">ZEDA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
