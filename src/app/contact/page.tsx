"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link
            href="/"
            className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-8"
          >
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
            {t("back.home")}
          </Link>
          <div className="mb-16">
            <span className="font-label-caps text-label-caps text-primary block mb-4">{t("contact.subtitle")}</span>
            <h1 className="font-display-lg text-headline-lg">{t("contact.title")}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
              {t("contact.desc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">{t("contact.address")}</h3>
                <p className="font-body-lg text-body-lg">{t("contact.address_val")}</p>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">{t("contact.phone")}</h3>
                <p className="font-body-lg text-body-lg" dir="ltr">{t("contact.phone_val")}</p>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">{t("contact.hours")}</h3>
                <p className="font-body-lg text-body-lg">{t("contact.hours1")}</p>
                <p className="font-body-md text-on-surface-variant">{t("contact.hours2")}</p>
              </div>
              <a
                href="/booking"
                className="inline-block px-10 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                {t("contact.book")}
              </a>
            </div>
            <div className="rounded-lg overflow-hidden border border-outline-variant/30 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d31.1!3d30.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI0JzAwLjAiTiAzMcKwMDYnMDAuMCJF!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZEDA Location"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
