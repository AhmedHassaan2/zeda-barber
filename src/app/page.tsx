"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import GalleryPreview from "@/components/gallery-preview";
import Team from "@/components/team";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";

export default function HomePage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <Services />
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <GalleryPreview />
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <Team />
        </div>
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="section-divider w-full mb-16 md:mb-20"></div>
          <div className="relative z-10 px-margin-mobile md:px-margin-desktop text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <img
                src="/images/chair.png"
                alt="كرسيك مستنيك"
                className="h-24 md:h-32 w-auto icon-golden opacity-60"
              />
            </div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-8 tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a
                href="/booking"
                className="px-12 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-400 shadow-lg shadow-primary/20"
              >
                {t("cta.book")}
              </a>
              <a
                href="/services"
                className="px-12 py-5 border border-primary text-primary font-button text-button uppercase tracking-widest hover:bg-primary hover:text-surface transition-all duration-400"
              >
                {t("cta.services")}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
