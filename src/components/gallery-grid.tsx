"use client";

import { useState, useCallback } from "react";
import GalleryLightbox from "./gallery-lightbox";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <img
                src="/images/logos/zeda-logo.png"
                alt=""
                className="h-5 md:h-7 w-auto brightness-0 invert"
              />
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
