export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-20 bg-surface-container-lowest border-t border-outline-variant mt-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          <div className="text-center md:text-right">
            <h4 className="text-primary font-label-caps mb-4 uppercase tracking-wider">بيانات الاتصال</h4>
            <div className="space-y-4 text-on-surface-variant font-body-md">
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">العنوان</span>
                <p>كفرتصفا - كفرشكر<br />قليوبية</p>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">مواعيد العمل</span>
                <p>السبت — الخميس: ١٠ص — ١١م<br />الجمعة: بالحجز المسبق</p>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">الهاتف</span>
                <p dir="ltr">01069389235</p>
              </div>
              <a
                href="https://wa.me/201069389235"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary hover:opacity-80 transition-opacity font-button text-button uppercase"
              >
                واتساب
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-primary font-label-caps mb-4 uppercase tracking-wider">المطور</h4>
            <div className="space-y-4 text-on-surface-variant font-body-md">
              <p>
                Developed by{" "}
                <a
                  href="https://www.facebook.com/ahmedhassaan.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  Ahmed Hassaan
                </a>
              </p>
              <div>
                <a
                  href="https://engaz-media.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img src="/images/logos/engaz-logo.png" alt="إنجاز ميديا" className="h-8 md:h-10 w-auto" />
                </a>
                <p className="text-xs mt-1">إنجاز ميديا</p>
              </div>
              <div>
                <span className="text-primary font-label-caps text-xs block mb-1">واتساب المطور</span>
                <a
                  href="https://www.facebook.com/ahmedhassaan.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 transition-opacity text-sm"
                >
                  facebook.com/ahmedhassaan.dev
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-outline-variant/30 text-on-surface-variant/50 font-body-md text-xs text-center">
          <p>© 2026 ZEDA BARBER SHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
