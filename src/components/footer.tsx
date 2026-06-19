"use client";

import { useLang } from "@/lib/language-context";

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="w-full py-16 md:py-20 bg-surface-container-lowest border-t border-outline-variant mt-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
          <div className={`${lang === "ar" ? "text-center md:text-right" : "text-center md:text-left"}`}>
            <h4 className="text-primary font-label-caps mb-6 uppercase tracking-wider">{t("footer.contact")}</h4>
            <div className="space-y-5 text-on-surface-variant font-body-md">
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">{t("footer.address")}</span>
                <p>{t("footer.address_val")}</p>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">{t("footer.hours")}</span>
                <p>{t("footer.hours_val")}</p>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">{t("footer.phone")}</span>
                <p dir="ltr">{t("footer.phone_val")}</p>
              </div>
              <a
                href="https://wa.me/201069389235"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary hover:opacity-80 transition-opacity font-button text-button uppercase"
              >
                {t("footer.whatsapp")}
              </a>
            </div>
          </div>
          <div className={`${lang === "ar" ? "text-center md:text-right" : "text-center md:text-left"}`}>
            <h4 className="text-primary font-label-caps mb-6 uppercase tracking-wider">{t("footer.developer")}</h4>
            <div className="space-y-5 text-on-surface-variant font-body-md">
              <p>
                {t("footer.dev_by")}{" "}
                <a
                  href="https://www.facebook.com/ahmedhassaan.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  Ahmed Hassaan
                </a>
              </p>
              <div>
                <a
                  href="https://engaz-media.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img src="/images/logos/engaz-logo.png" alt="إنجاز ميديا" className="h-16 md:h-20 w-auto" />
                </a>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">{t("footer.dev_whatsapp")}</span>
                <a
                  href="https://wa.me/201022677775"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity text-sm"
                >
                  201022677775
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-outline-variant/30 text-on-surface-variant/50 font-body-md text-xs text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
