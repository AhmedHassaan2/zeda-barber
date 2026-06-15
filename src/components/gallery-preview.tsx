'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const previewItems = [
  'https://placehold.co/600x500/1a1a1a/B87333?text=Photo+1',
  'https://placehold.co/600x500/232323/D4956A?text=Photo+2',
  'https://placehold.co/600x500/1a1a1a/B87333?text=Photo+3',
  'https://placehold.co/600x500/232323/D4956A?text=Photo+4',
  'https://placehold.co/600x500/1a1a1a/B87333?text=Photo+5',
]

export default function GalleryPreview() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full bg-copper/10 px-4 py-1 text-xs font-medium tracking-wider text-copper-light uppercase">
            Our Gallery
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            معرض أعمالنا
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            صور وفيديوهات لأحدث القصات والتسريحات
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt="Gallery"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <ImageIcon className="h-4 w-4 text-copper-light" />
                <span className="text-xs text-white">تصفح</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="gap-2">
              <span>شاهد المزيد</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
