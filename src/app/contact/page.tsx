"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import PageFacade from "@/components/page-facade";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-12">
            <Link
              href="/"
              className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-8"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              {t("back.home")}
            </Link>
            <div className="mb-12">
              <span className="font-label-caps text-label-caps text-primary block mb-4">{t("contact.subtitle")}</span>
              <h1 className="font-display-lg text-headline-lg">{t("contact.title")}</h1>
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none" id="map-overlay"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d31.300111801666947!3d30.570121565856912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDM0JzEyLjQiTiAzMcKwMTgnMDAuNCJF!5e0!3m2!1sen!2seg!4v1"
            width="100%"
            height="500"
            style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ZEDA Location"
            className="w-full map-bw"
            id="contact-map"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function() {
                  var map = document.getElementById('contact-map');
                  var overlay = document.getElementById('map-overlay');
                  if (map) {
                    map.addEventListener('mouseenter', function() {
                      map.style.filter = 'grayscale(0%) contrast(1)';
                      if (overlay) overlay.style.opacity = '0';
                    });
                    map.addEventListener('mouseleave', function() {
                      map.style.filter = 'grayscale(100%) contrast(1.1)';
                      if (overlay) overlay.style.opacity = '1';
                    });
                  }
                });
              `,
            }}
          />
        </div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4 group hover-lift p-4 rounded-lg hover:bg-surface-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">location_on</span>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-1 uppercase tracking-wider text-xs">{t("contact.address")}</h3>
                  <p className="font-body-lg text-body-lg">{t("contact.address_val")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group hover-lift p-4 rounded-lg hover:bg-surface-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">call</span>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-1 uppercase tracking-wider text-xs">{t("contact.phone")}</h3>
                  <a href="tel:+201069389235" className="font-body-lg text-body-lg hover:text-primary transition-colors" dir="ltr">+20 106 938 9235</a>
                </div>
              </div>
              <div className="flex items-start gap-4 group hover-lift p-4 rounded-lg hover:bg-surface-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl mt-1">schedule</span>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary mb-1 uppercase tracking-wider text-xs">{t("contact.hours")}</h3>
                  <p className="font-body-lg text-body-lg">{t("contact.hours1")}</p>
                  <p className="font-body-md text-on-surface-variant">{t("contact.hours2")}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:items-start gap-8">
              <a
                href="/booking"
                className="w-full md:w-auto inline-block px-10 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-400 text-center shadow-lg shadow-primary/20"
              >
                {t("contact.book")}
              </a>
              <a
                href="https://wa.me/201069389235"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 border border-primary text-primary font-button text-button uppercase tracking-widest hover:bg-primary hover:text-surface transition-all duration-400"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                واتساب
              </a>
            </div>
          </div>
        </div>
      </main>
      <PageFacade />
      <div className="h-32 bg-gradient-to-b from-surface to-black"></div>
      <Footer />
    </>
  );
}
