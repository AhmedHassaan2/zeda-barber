import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link
            href="/"
            className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-8"
          >
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
            العودة للرئيسية
          </Link>
          <div className="mb-16">
            <span className="font-label-caps text-label-caps text-primary block mb-4">CONTACT</span>
            <h1 className="font-display-lg text-headline-lg">تواصل معنا</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
              كرسيك في انتظارك. تواصل معنا للحجز أو الاستفسار. فريق ZEDA جاهز لخدمتك.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">العنوان</h3>
                <p className="font-body-lg text-body-lg">كفرتصفا - كفرشكر - قليوبية</p>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">الهاتف</h3>
                <p className="font-body-lg text-body-lg" dir="ltr">01069389235</p>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-3 uppercase tracking-wider">مواعيد العمل</h3>
                <p className="font-body-lg text-body-lg">السبت — الخميس: ١٠ص — ١١م</p>
                <p className="font-body-md text-on-surface-variant">الجمعة: بالحجز المسبق</p>
              </div>
              <a
                href="/booking"
                className="inline-block px-10 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                احجز الآن
              </a>
            </div>
            <div className="rounded-lg overflow-hidden border border-outline-variant/30 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d31.1!3d30.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI0JzAwLjAiTiAzMcKwMDYnMDAuMCJF!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZEDA Location"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
