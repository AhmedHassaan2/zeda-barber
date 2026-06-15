import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ImageIcon, Video, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  type: i < 10 ? 'image' as const : 'video' as const,
  src: i < 10
    ? `https://placehold.co/600x500/${i % 2 === 0 ? '1a1a1a' : '232323'}/B87333?text=Photo+${i + 1}`
    : null,
  videoUrl: i >= 10 ? 'https://www.facebook.com/facebook/videos/10153231379946729/' : null,
}))

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-copper-light"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للرئيسية
            </Link>
          </div>

          <div className="mb-10">
            <span className="inline-block rounded-full bg-copper/10 px-4 py-1 text-xs font-medium tracking-wider text-copper-light uppercase">
              Gallery
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              معرض الأعمال
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              جميع أعمالنا في مكان واحد
            </p>
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="group relative mb-4 overflow-hidden rounded-xl break-inside-avoid"
              >
                {item.type === 'image' ? (
                  <>
                    <img
                      src={item.src!}
                      alt={`Gallery ${i + 1}`}
                      className="w-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </>
                ) : (
                  <div className="relative flex aspect-video items-center justify-center bg-charcoal-700">
                    <Video className="h-10 w-10 text-copper-light" />
                    <p className="mt-2 text-xs text-gray-400">فيديو من فيسبوك</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
