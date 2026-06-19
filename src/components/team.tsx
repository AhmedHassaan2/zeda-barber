"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function Team() {
  const { t } = useLang();

  const barbers = [
    { name: t("team.name1"), role: t("team.role1"), exp: t("team.exp1") },
    { name: t("team.name2"), role: t("team.role2"), exp: t("team.exp2") },
    { name: t("team.name3"), role: t("team.role3"), exp: t("team.exp3") },
    { name: t("team.name4"), role: t("team.role4"), exp: t("team.exp4") },
    { name: t("team.name5"), role: t("team.role5"), exp: t("team.exp5") },
  ];

  return (
    <section className="py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12 text-center">
        <span className="font-label-caps text-label-caps text-primary block mb-4">{t("team.subtitle")}</span>
        <h2 className="font-display-lg text-headline-lg">{t("team.title")}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-4 mx-auto">
          {t("team.desc")}
        </p>
      </div>
      <div className="w-full relative overflow-hidden group border-y border-outline-variant/20">
        <img
          className="w-full object-cover min-h-[350px] md:min-h-[500px] grayscale group-hover:grayscale-0 transition-all duration-[2000ms]"
          src="/images/team/ZEDA.svg"
          alt="ZEDA Team"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent pointer-events-none"></div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-8">
        <div className="bg-surface-container border border-outline-variant/20 rounded-lg p-6 md:p-8">
          <div className="flex flex-wrap justify-center gap-x-10 md:gap-x-16 gap-y-8">
            {barbers.map((barber, i) => (
              <Link
                key={i}
                href="/booking"
                className="flex flex-col items-center gap-2 group/barber text-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover/barber:bg-primary/20 group-hover/barber:border-primary transition-all duration-400">
                  <span className="font-display-lg text-headline-md text-primary">{barber.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                  <span className="font-display-lg text-headline-sm block leading-tight group-hover/barber:text-primary transition-colors duration-400">
                    {barber.name}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary/60 text-[10px] md:text-xs tracking-wider">
                    {barber.role}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
