export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-surface">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        <img
          src="/images/logos/zeda-logo.png"
          alt="ZEDA"
          className="h-12 md:h-16 w-auto mx-auto mb-3 md:mb-4"
        />
        <span className="font-label-caps text-label-caps text-primary mb-3 md:mb-4 block tracking-[0.4em]">ZEDA BARBER SHOP</span>
        <h1 className="font-display-lg text-[12vw] md:text-display-lg uppercase leading-none tracking-tighter mb-3 md:mb-4">
          THE ART OF <span className="block md:inline italic font-medium opacity-80">PRECISION</span>
        </h1>
        <p className="font-display text-2xl md:text-3xl text-primary/70 tracking-wide mb-4 md:mb-6">
          سيب نفسك
        </p>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto mb-8 md:mb-12 px-4">
          حيث تجتمع الحلاقة الكلاسيكية مع العصرية. خبرة واحترافية في العناية بإطلالتك.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
          <a
            href="/booking"
            className="px-8 md:px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity duration-400 text-center"
          >
            احجز موعدك الآن
          </a>
          <a
            href="/gallery"
            className="px-8 md:px-10 py-4 border border-primary text-primary font-button text-button uppercase tracking-widest hover:bg-primary/5 transition-all duration-400 text-center"
          >
            شاهد أعمالنا
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 md:h-16 bg-primary mx-auto animate-pulse"></div>
      </div>
    </section>
  );
}
