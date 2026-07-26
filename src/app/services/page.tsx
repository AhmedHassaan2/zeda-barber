"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

const services = [
  { id: 1, image: "/images/services/حلاقة شعر كلاسيكية.jpg", icon: "/images/services/icons/1.png" },
  { id: 2, image: "/images/services/تهذيب وتصفيف اللحية.jpg", icon: "/images/services/icons/2.png" },
  { id: 3, image: "/images/services/عناية كاملة بالوجه.jpg", icon: "/images/services/icons/3.png" },
  { id: 4, image: "/images/services/حلاقة شبابية عصرية.jpg", icon: "/images/services/icons/4.png" },
  { id: 5, image: "/images/two/قص شعر الاطفال.jpg", icon: "/images/services/icons/5.png" },
  { id: 6, image: "/images/services/تنظيف عميق للبشرة.jpg", icon: "/images/services/icons/6.png" },
  { id: 7, image: "/images/services/بكدج العريس.jpg", icon: "/images/services/icons/7.png" },
];

export default function ServicesPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none"></div>
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
            <Link
              href="/"
              className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-8"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              العودة للرئيسية
            </Link>
            <div className="mb-12">
              <span className="font-label-caps text-label-caps text-primary block mb-4">{t("services_page.subtitle")}</span>
              <h1 className="font-display-lg text-headline-lg">{t("services_page.title")}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">{t("services_page.desc")}</p>
            </div>
          </div>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-surface/60 backdrop-blur-sm flex items-center justify-center border border-outline-variant/10">
                    <img src={service.icon} alt="" className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.8)" }} />
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display-lg text-headline-sm mb-2">{t(`services.name${service.id}`)}</h3>
                  <p className="font-body-sm text-on-surface-variant text-sm mb-5 leading-relaxed">{t(`services.desc${service.id}`)}</p>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/30 text-primary font-button text-xs uppercase tracking-wider rounded-md hover:bg-primary hover:text-surface transition-all duration-400 group-hover:border-primary"
                  >
                    {t("services_page.book")}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="h-32 bg-gradient-to-b from-surface to-black"></div>
      <Footer />
    </>
  );
}
