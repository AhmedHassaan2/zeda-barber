"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GalleryGrid from "@/components/gallery-grid";
import PageFacade from "@/components/page-facade";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function GalleryPage() {
  const { t } = useLang();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("/api/gallery-images");
      const data = await res.json();
      setImages(data.images ?? []);
    }
    fetchImages();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8 md:mb-12">
            <Link
              href="/"
              className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-6 md:mb-8"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              {t("back.home")}
            </Link>
            <div className="mb-8 md:mb-12">
              <span className="font-label-caps text-label-caps text-primary block mb-4">{t("gallery.subtitle")}</span>
              <h1 className="font-display-lg text-headline-lg">{t("gallery.title")}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">{t("gallery.desc")}</p>
              <p className="text-on-surface-variant text-sm mt-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">style</span>
                اختر استايلك من المعرض واضغط &quot;احجز بأسلوبك&quot;
              </p>
            </div>
          </div>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <GalleryGrid images={images} />
        </div>
      </main>
      <PageFacade />
      <div className="h-32 bg-gradient-to-b from-surface to-black"></div>
      <Footer />
    </>
  );
}
