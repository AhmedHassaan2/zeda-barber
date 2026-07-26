"use client";

import { useState, useCallback, useRef } from "react";
import GalleryLightbox from "./gallery-lightbox";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const handleSelect = (src: string) => {
    setSelectedImage(src === selectedImage ? null : src);
  };

  return (
    <>
      <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className={`break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer mb-3 md:mb-4 transition-all duration-300 ${
              selectedImage === src ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""
            }`}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            {/* Select indicator */}
            <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => { e.stopPropagation(); handleSelect(src); }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedImage === src
                    ? "bg-primary text-surface"
                    : "bg-black/50 text-white backdrop-blur-sm hover:bg-primary/80"
                }`}
              >
                {selectedImage === src ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">style</span>
                )}
              </button>
            </div>
            {/* ZEDA watermark */}
            <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img
                src="/images/logos/zeda-logo.png"
                alt=""
                className="h-6 md:h-7 w-auto brightness-0 invert opacity-70"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sticky booking CTA when image is selected */}
      {selectedImage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-primary/20 py-3 px-4 animate-fade-in-up">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src={selectedImage} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
              <span className="text-on-surface text-sm truncate">تم اختيار الصورة</span>
            </div>
            <a
              href={`/booking?style=${encodeURIComponent(selectedImage)}`}
              className="px-6 py-2.5 bg-primary text-surface font-button text-xs uppercase tracking-wider rounded hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              احجز بأسلوبك
            </a>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={onPrev}
          onNext={onNext}
          onSelect={handleSelect}
          isSelected={selectedImage === images[lightboxIndex]}
        />
      )}
    </>
  );
}
