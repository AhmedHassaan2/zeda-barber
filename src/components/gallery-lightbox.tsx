"use client";

import { useEffect, useRef, useState } from "react";

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === " ") { e.preventDefault(); setIsZoomed(z => !z); }
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbRef.current) {
      const active = thumbRef.current.children[currentIndex] as HTMLElement;
      if (active) {
        active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <span className="text-white/60 text-sm font-body-md">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white p-2 transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 px-4 md:px-16">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-4 text-white/40 hover:text-white z-10 p-3 transition-colors"
          aria-label="Previous"
        >
          <span className="material-symbols-outlined text-4xl md:text-5xl">chevron_left</span>
        </button>

        <div className="relative max-h-full max-w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <img
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            className={`max-h-[75vh] max-w-[90vw] w-auto h-auto object-contain select-none transition-transform duration-500 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            draggable={false}
            onClick={() => setIsZoomed(z => !z)}
          />
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <img
              src="/images/logos/zeda-logo.png"
              alt="ZEDA"
              className="h-8 md:h-10 w-auto brightness-0 invert opacity-60"
            />
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-4 text-white/40 hover:text-white z-10 p-3 transition-colors"
          aria-label="Next"
        >
          <span className="material-symbols-outlined text-4xl md:text-5xl">chevron_right</span>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbRef}
        className="flex gap-2 px-4 md:px-8 py-3 overflow-x-auto gallery-thumb-strip"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => {
              if (i < currentIndex) {
                for (let j = currentIndex; j > i; j--) onPrev();
              } else if (i > currentIndex) {
                for (let j = currentIndex; j < i; j++) onNext();
              }
            }}
            className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden border-2 transition-all duration-300 ${
              i === currentIndex
                ? "border-primary opacity-100"
                : "border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
