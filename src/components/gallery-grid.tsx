"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import GalleryLightbox from "./gallery-lightbox";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const onPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  const onNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex !== null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        window.scrollBy({ top: 300, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <>
      <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer mb-3 md:mb-4"
            onClick={() => setLightboxIndex(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className={`w-full object-cover transition-all duration-700 ${
                hoveredIndex === i ? "scale-105" : ""
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            {/* Image number badge */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] font-label-caps text-primary uppercase tracking-wider bg-surface/60 backdrop-blur-sm px-2 py-1 rounded">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {/* ZEDA logo watermark */}
            <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img
                src="/images/logos/zeda-logo.png"
                alt=""
                className="h-6 md:h-8 w-auto brightness-0 invert opacity-80"
              />
            </div>
            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
              <span className="text-xs font-label-caps text-primary uppercase tracking-wider">ZEDA</span>
            </div>
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </>
  );
}
