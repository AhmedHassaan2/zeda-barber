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
          <div className="flex items-center gap-4">
            <img
              src="/images/services/icons/services-icon.png"
              alt=""
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
            <div>
              <span className="font-label-caps text-label-caps text-primary block mb-2">{t("services.subtitle")}</span>
              <h2 className="font-display-lg text-headline-lg">{t("services.title")}</h2>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-body-md text-on-surface-variant max-w-xs">
              {t("services.desc")}
            </p>
          </div>
        </div>
        <div className="space-y-0 divide-y divide-outline-variant/30">
          {services.map((service, index) => (
            <Link
              key={index}
              href="/booking"
              className="group relative py-8 md:py-10 flex items-center gap-5 transition-all duration-400 hover:px-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary/5 transition-all duration-400 group-hover:w-full -z-10"></div>
              <img
                src={serviceIcons[index]}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 object-contain icon-golden group-hover:scale-110 transition-transform duration-400"
              />
              <div className="flex-1 flex items-baseline gap-4">
                <h3 className="font-display-lg text-headline-md uppercase">{service.name}</h3>
              </div>
              <span className="font-body-md text-on-surface-variant hidden md:block max-w-[250px] truncate">{service.desc}</span>
              <span className="font-button text-button uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {t("services.book")}
              </span>
              <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-2 transition-transform duration-400">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
