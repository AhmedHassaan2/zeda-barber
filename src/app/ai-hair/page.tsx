import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function AiHairPage() {
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
          <div className="mb-12">
            <span className="font-label-caps text-label-caps text-primary block mb-4">AI TRY-ON</span>
            <h1 className="font-display-lg text-headline-lg">جرب تسريحتك</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
              جرب أحدث التسريحات بالذكاء الاصطناعي قبل الحجز
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden border border-outline-variant/30">
              <img
                src="/images/two/جرب تسريحتك.jpg"
                alt="جرب تسريحتك"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="font-display-lg text-headline-md mb-6">تقنية الذكاء الاصطناعي</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                استخدم تقنية الذكاء الاصطناعي لتجربة أحدث التسريحات والحصول على الإطلالة التي تناسبك قبل الحجز.
              </p>
              <a
                href="https://wa.me/201069389235?text=أريد تجربة تسريحة جديدة بالذكاء الاصطناعي"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
