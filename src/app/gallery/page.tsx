import Header from "@/components/header";
import Footer from "@/components/footer";
import GalleryGrid from "@/components/gallery-grid";
import Link from "next/link";

async function getGalleryImages(): Promise<string[]> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const dir = path.join(process.cwd(), "public/images/gallery");
  const files = await fs.readdir(dir);
  return files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).map((f) => `/images/gallery/${f}`);
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8 md:mb-12">
          <Link
            href="/"
            className="font-button text-button uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-6 md:mb-8"
          >
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
            العودة للرئيسية
          </Link>
          <div className="mb-8 md:mb-12">
            <span className="font-label-caps text-label-caps text-primary block mb-4">GALLERY</span>
            <h1 className="font-display-lg text-headline-lg">معرض الأعمال</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">جميع أعمالنا في مكان واحد</p>
          </div>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <GalleryGrid images={images} />
        </div>
      </main>
      <Footer />
    </>
  );
}
