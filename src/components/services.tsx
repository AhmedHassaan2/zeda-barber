"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

const serviceIcons = [
  "content_cut",
  "face",
  "spa",
  "auto_fix_high",
  "child_care",
  "cleaning_services",
  "favorite",
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
    <section className="bg-surface-container-lowest py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
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
        <div className="space-y-0 divide-y divide-outline-variant/30">
          {services.map((service, index) => (
            <Link
              key={index}
              href="/booking"
              className="group relative py-8 md:py-10 flex items-center gap-6 transition-all duration-400 hover:px-6"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary/5 transition-all duration-400 group-hover:w-full -z-10"></div>
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl opacity-60 group-hover:opacity-100 transition-opacity duration-400">
                {serviceIcons[index]}
              </span>
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
