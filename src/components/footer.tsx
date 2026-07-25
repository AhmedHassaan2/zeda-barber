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
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <p>{t("footer.address_val")}</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <p>{t("footer.hours_val")}</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-xl">call</span>
                <a href="tel:01069389235" dir="ltr" className="hover:text-primary transition-colors">{t("footer.phone_val")}</a>
              </div>
              <a
                href="https://wa.me/201069389235"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 justify-center md:justify-start hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{t("footer.whatsapp")}</span>
              </a>
            </div>
          </div>
          <div className={`${lang === "ar" ? "text-center md:text-right" : "text-center md:text-left"}`}>
            <h4 className="text-primary font-label-caps mb-6 uppercase tracking-wider">{t("footer.developer")}</h4>
            <div className="space-y-5 text-on-surface-variant font-body-md">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-xl">person</span>
                <a
                  href="https://www.facebook.com/ahmedhassaan.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  Ahmed Hassaan
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://engaz-media.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <img src="/images/logos/engaz-logo.png" alt="إنجاز ميديا" className="h-10 md:h-12 w-auto engaz-white" />
                  <span className="text-on-surface-variant text-sm">إنجاز ميديا</span>
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a
                  href="https://wa.me/201022677775"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity text-sm"
                  dir="ltr"
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
