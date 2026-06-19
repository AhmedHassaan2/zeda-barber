"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2 transition-colors"
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white z-10 p-3 transition-colors"
        aria-label="Previous"
      >
        <span className="material-symbols-outlined text-4xl md:text-5xl">chevron_left</span>
      </button>
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white z-10 p-3 transition-colors"
        aria-label="Next"
      >
        <span className="material-symbols-outlined text-4xl md:text-5xl">chevron_right</span>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-body-md text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
