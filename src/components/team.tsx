import Link from "next/link";

const barbers = [
  { name: "زيدا", role: "المؤسس والحلاق الأول", exp: "١٥ سنة خبرة" },
  { name: "معاذ", role: "حلاق محترف", exp: "١٠ سنوات خبرة" },
  { name: "مصطفى", role: "حلاق متخصص", exp: "٨ سنوات خبرة" },
  { name: "محمد", role: "حلاق أول", exp: "١٢ سنة خبرة" },
  { name: "عبدالله", role: "حلاق مبدع", exp: "٦ سنوات خبرة" },
];

export default function Team() {
  return (
    <section className="py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12 text-center">
        <span className="font-label-caps text-label-caps text-primary block mb-4">OUR TEAM</span>
        <h2 className="font-display-lg text-headline-lg">فريق العمل</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-4 mx-auto">
          فريق متكامل من أمهر الحلاقين لتقديم أفضل تجربة. كل أعضاء فريقنا مدربون على أحدث التقنيات.
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
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-6">
            {barbers.map((barber, i) => (
              <Link
                key={i}
                href="/booking"
                className="flex items-center gap-3 group/barber"
              >
                <div className="w-3 h-3 bg-primary rounded-full shrink-0 group-hover/barber:scale-125 transition-transform"></div>
                <div className="text-right">
                  <span className="font-display-lg text-headline-sm block leading-tight">{barber.name}</span>
                  <span className="font-label-caps text-label-caps text-primary text-[10px] md:text-xs tracking-wider">{barber.role}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
