"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

const services = [
  { id: 1, image: "/images/services/حلاقة شعر كلاسيكية.jpg" },
  { id: 2, image: "/images/services/تهذيب وتصفيف اللحية.jpg" },
  { id: 3, image: "/images/services/عناية كاملة بالوجه.jpg" },
  { id: 4, image: "/images/services/حلاقة شبابية عصرية.jpg" },
  { id: 5, image: "/images/two/قص شعر الاطفال.jpg" },
  { id: 6, image: "/images/services/تنظيف عميق للبشرة.jpg" },
  { id: 7, image: "/images/services/بكدج العريس.jpg" },
];

export default function ServicesPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
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
        <div className="px-margin-mobile md:px-margin-desktop max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt="" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="font-display-lg text-headline-md mb-3">{t(`services.name${service.id}`)}</h3>
                  <p className="font-body-md text-on-surface-variant mb-6">{t(`services.desc${service.id}`)}</p>
                  <Link
                    href="/booking"
                    className="inline-block px-6 py-3 border border-primary text-primary font-button text-button uppercase tracking-wider hover:bg-primary hover:text-surface transition-all duration-400"
                  >
                    {t("services_page.book")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
