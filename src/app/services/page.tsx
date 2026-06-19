import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

const services = [
  { id: 1, name: "حلاقة شعر كلاسيكية", desc: "حلاقة عصرية بتقنيات كلاسيكية احترافية تناسب جميع أنواع الشعر.", image: "/images/services/حلاقة شعر كلاسيكية.jpg" },
  { id: 2, name: "تهذيب وتصفيف اللحية", desc: "تشذيب وتصفيف اللحية بأعلى دقة باستخدام أفضل المنتجات.", image: "/images/services/تهذيب وتصفيف اللحية.jpg" },
  { id: 3, name: "عناية كاملة بالوجه", desc: "جلسة عناية متكاملة للبشرة تشمل تنظيف وترطيب وتدليك.", image: "/images/services/عناية كاملة بالوجه.jpg" },
  { id: 4, name: "حلاقة شبابية عصرية", desc: "أحدث صيحات الحلاقة الشبابية العصرية والمودرن.", image: "/images/services/حلاقة شبابية عصرية.jpg" },
  { id: 5, name: "قص أطفال", desc: "قص شعر الأطفال بأسلوب لطيف ومريح يناسب جميع الأعمار.", image: "/images/two/قص شعر الاطفال.jpg" },
  { id: 6, name: "تنظيف عميق للبشرة", desc: "إزالة الرؤوس السوداء وتنظيف عميق للبشرة بمستحضرات طبيعية.", image: "/images/services/تنظيف عميق للبشرة.jpg" },
  { id: 7, name: "بكيدج العريس", desc: "باقة متكاملة للعريس تشمل حلاقة وتصفيف وعناية كاملة.", image: "/images/services/بكدج العريس.jpg" },
];

export default function ServicesPage() {
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
            <span className="font-label-caps text-label-caps text-primary block mb-4">OUR SERVICES</span>
            <h1 className="font-display-lg text-headline-lg">خدماتنا</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">نقدم لكم مجموعة متكاملة من خدمات الحلاقة والعناية</p>
          </div>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="font-display-lg text-headline-md mb-3">{service.name}</h3>
                  <p className="font-body-md text-on-surface-variant mb-6">{service.desc}</p>
                  <Link
                    href="/booking"
                    className="inline-block px-6 py-3 border border-primary text-primary font-button text-button uppercase tracking-wider hover:bg-primary hover:text-surface transition-all duration-400"
                  >
                    احجز الآن
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
