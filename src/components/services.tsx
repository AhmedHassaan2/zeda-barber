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

export default function Services() {
  return (
    <section className="bg-surface-container-lowest py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary block mb-4">OUR SERVICES</span>
            <h2 className="font-display-lg text-headline-lg">خدماتنا</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-body-md text-on-surface-variant max-w-xs">
              نقدم لكم مجموعة متكاملة من خدمات الحلاقة والعناية
            </p>
          </div>
        </div>
        <div className="space-y-0 divide-y divide-outline-variant/30">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href="/booking"
              className="group relative py-12 flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-400 hover:px-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary/5 transition-all duration-400 group-hover:w-full -z-10"></div>
              <div className="flex items-baseline gap-8">
                <span className="font-display-lg text-headline-md opacity-20 group-hover:opacity-100 transition-opacity duration-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display-lg text-headline-md uppercase">{service.name}</h3>
              </div>
              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-48 h-24 overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" src={service.image} alt={service.name} />
              </div>
              <div className="flex items-center gap-12 mt-4 md:mt-0">
                <span className="font-body-md text-on-surface-variant max-w-[200px] truncate">{service.desc}</span>
                <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-2 transition-transform duration-400">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
