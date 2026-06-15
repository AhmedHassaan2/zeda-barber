'use client'

import { motion } from 'framer-motion'
import { Scissors, Sparkles, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-copper/5 via-transparent to-charcoal-900" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/3 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-copper to-gold/30 shadow-2xl shadow-copper/30 ring-2 ring-copper/20">
            <Scissors className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          ZEDA
          <span className="block mt-2 text-2xl sm:text-3xl font-light tracking-[0.15em] text-copper-light">
            BARBER SHOP
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          حيث تجتمع الحلاقة الكلاسيكية مع العصرية. خبرة واحترافية في العناية
          بإطلالتك.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/booking">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              احجز موعدك الآن
            </Button>
          </Link>
          <Link href="/gallery">
            <Button variant="outline" size="lg">
              شاهد أعمالنا
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex animate-bounce justify-center"
        >
          <ArrowDown className="h-6 w-6 text-copper-light/50" />
        </motion.div>
      </div>
    </section>
  )
}
