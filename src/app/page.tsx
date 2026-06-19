import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import GalleryPreview from "@/components/gallery-preview";
import Team from "@/components/team";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <GalleryPreview />
        <Team />
        <section className="relative py-32 overflow-hidden border-t border-outline-variant/30">
          <div className="relative z-10 px-margin-mobile md:px-margin-desktop text-center max-w-3xl mx-auto">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase mb-12 tracking-tight">
             كرسيك في انتظارك
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
              تواصل معنا للحجز أو الاستفسار. فريق ZEDA جاهز لخدمتك.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a
                href="/booking"
                className="px-12 py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity duration-400"
              >
                احجز موعدك الآن
              </a>
              <a
                href="/services"
                className="px-12 py-5 border border-primary text-primary font-button text-button uppercase tracking-widest hover:bg-primary/5 transition-all duration-400"
              >
                جميع الخدمات
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
