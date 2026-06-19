"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import GalleryLightbox from "./gallery-lightbox";

const images = [
  "/images/gallery/468327681_18072331459624568_4549114272353535235_n.jpg",
  "/images/gallery/491957006_1197250025744875_8121157652049572953_n.jpg",
  "/images/gallery/492121218_1196050999198111_2191836169187809032_n.jpg",
  "/images/gallery/492301544_1198853925584485_7383226821735499964_n.jpg",
  "/images/gallery/492308762_1196051075864770_2871749411909240801_n.jpg",
  "/images/gallery/492529379_1197942759008935_7471260529715659363_n.jpg",
];

export default function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, []);

  const onNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, []);

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
        <div>
          <span className="font-label-caps text-label-caps text-primary block mb-4">OUR GALLERY</span>
          <h2 className="font-display-lg text-headline-lg">معرض أعمالنا</h2>
        </div>
        <Link
          href="/gallery"
          className="font-button text-button uppercase text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          عرض الكل
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.slice(0, 6).map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden group relative cursor-pointer ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover aspect-[4/5] transition-all duration-[2000ms] group-hover:scale-110 grayscale hover:grayscale-0"
            />
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <img
                src="/images/logos/zeda-logo.png"
                alt=""
                className="h-6 md:h-8 w-auto brightness-0 invert"
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
    </section>
  );
}
