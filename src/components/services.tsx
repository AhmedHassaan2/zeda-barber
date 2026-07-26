"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

const serviceIcons = [
  "/images/services/icons/1.png",
  "/images/services/icons/2.png",
  "/images/services/icons/3.png",
  "/images/services/icons/4.png",
  "/images/services/icons/5.png",
  "/images/services/icons/6.png",
  "/images/services/icons/7.png",
];

export default function Services() {
  const { t } = useLang();

  const services = [
    { name: t("services.name1"), desc: t("services.desc1") },
    { name: t("services.name2"), desc: t("services.desc2") },
    { name: t("services.name3"), desc: t("services.desc3") },
    { name: t("services.name4"), desc: t("services.desc4") },
    { name: t("services.name5"), desc: t("services.desc5") },
    { name: t("services.name6"), desc: t("services.desc6") },
    { name: t("services.name7"), desc: t("services.desc7") },
  ];

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-divider w-full mb-16 md:mb-24"></div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary block mb-4">{t("services.subtitle")}</span>
            <h2 className="font-display-lg text-headline-lg">{t("services.title")}</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-body-md text-on-surface-variant max-w-xs">
              {t("services.desc")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href="/booking"
              className={`service-card group p-5 md:p-6 animate-fade-in-up`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/10 group-hover:border-primary/30 transition-colors duration-500">
                  <img
                    src={serviceIcons[index]}
                    alt={service.name}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <h3 className="font-display-lg text-headline-sm leading-tight">{service.name}</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2">{service.desc}</p>
              <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-[-8px] group-hover:translate-x-0">
                <span className="font-button text-xs uppercase tracking-wider">{t("services.book")}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
