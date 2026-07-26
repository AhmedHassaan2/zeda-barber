"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

const barbersData = [
  { name: "team.name1", role: "team.role1", exp: "team.exp1", img: "/images/barbers/zeda.jpg" },
  { name: "team.name2", role: "team.role2", exp: "team.exp2", img: "/images/barbers/moaz-allam.jpg" },
  { name: "team.name3", role: "team.role3", exp: "team.exp3", img: "/images/barbers/mostafa-tarek.jpg" },
  { name: "team.name4", role: "team.role4", exp: "team.exp4", img: "/images/barbers/moaz-tarek.jpg" },
  { name: "team.name5", role: "team.role5", exp: "team.exp5", img: "/images/barbers/ahmed-mohamed.jpg" },
];

export default function Team() {
  const { t } = useLang();

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-divider w-full mb-16 md:mb-24"></div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8 text-center">
        <span className="font-label-caps text-label-caps text-primary block mb-4">{t("team.subtitle")}</span>
        <h2 className="font-display-lg text-headline-lg">{t("team.title")}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-4 mx-auto">
          {t("team.desc")}
        </p>
      </div>
      <div className="w-full relative overflow-hidden group border-y border-outline-variant/20">
        <img
          className="w-full object-cover min-h-[250px] md:min-h-[400px] grayscale group-hover:grayscale-0 transition-all duration-[2000ms]"
          src="/images/team/ZEDA.svg"
          alt="ZEDA Team"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent pointer-events-none"></div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-6">
        <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
          {barbersData.map((barber, i) => (
            <Link
              key={i}
              href="/booking"
              className="group/barber relative overflow-hidden rounded-lg w-[100px] h-[130px] md:w-[130px] md:h-[170px] hover-lift flex-shrink-0"
            >
              <img
                src={barber.img}
                alt={t(barber.name)}
                className="w-full h-full object-cover img-grayscale group-hover/barber:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2 text-center">
                <span className="font-display-lg text-[10px] md:text-xs text-primary block group-hover/barber:text-white transition-colors duration-400">
                  {t(barber.name)}
                </span>
                <span className="text-on-surface-variant text-[7px] md:text-[9px] tracking-wider block">
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
