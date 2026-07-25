"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

const barbersData = [
  { name: "team.name1", role: "team.role1", exp: "team.exp1", img: "/images/barbers/zeda.jpg", initial: "ز" },
  { name: "team.name2", role: "team.role2", exp: "team.exp2", img: "/images/barbers/moaz-allam.jpg", initial: "م" },
  { name: "team.name3", role: "team.role3", exp: "team.exp3", img: "/images/barbers/mostafa-tarek.jpg", initial: "م" },
  { name: "team.name4", role: "team.role4", exp: "team.exp4", img: "/images/barbers/moaz-tarek.jpg", initial: "م" },
  { name: "team.name5", role: "team.role5", exp: "team.exp5", img: "/images/barbers/ahmed-mohamed.jpg", initial: "ع" },
];

export default function Team() {
  const { t } = useLang();

  return (
    <section className="py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12 text-center">
        <span className="font-label-caps text-label-caps text-primary block mb-4">{t("team.subtitle")}</span>
        <h2 className="font-display-lg text-headline-lg">{t("team.title")}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-4 mx-auto">
          {t("team.desc")}
        </p>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {barbersData.map((barber, i) => (
            <Link
              key={i}
              href="/booking"
              className="group/barber relative overflow-hidden rounded-lg aspect-[3/4] hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={barber.img}
                alt={t(barber.name)}
                className="w-full h-full object-cover img-grayscale group-hover/barber:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <span className="font-display-lg text-headline-md text-primary block group-hover/barber:text-white transition-colors duration-400">
                  {t(barber.name)}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px] md:text-xs tracking-wider">
                  {t(barber.role)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
