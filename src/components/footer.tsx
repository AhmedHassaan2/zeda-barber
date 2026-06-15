'use client'

import Link from 'next/link'
import { Phone, MapPin, Scissors, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-600/50 bg-charcoal-800/50 pb-6 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-copper to-gold/30 shadow-lg shadow-copper/20">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
                  ZEDA
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-copper-light">
                  Barber Shop
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              خبراء الحلاقة الرجالي والعناية بالبشرة. نقدم أفضل خدمات الحلاقة
              الكلاسيكية والعصرية في كفرتصفا.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/0201069389235"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-copper/10 px-4 py-2 text-sm text-copper-light transition-all hover:bg-copper/20"
              >
                <Phone className="h-4 w-4" />
                0201069389235
              </a>
              <div className="flex items-center gap-2 rounded-lg bg-charcoal-600/50 px-4 py-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-copper-light" />
                كفرتصفا - كفرشكر - قليوبية
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center gap-4 text-left md:text-right">
            <div className="rounded-xl border border-charcoal-600/50 bg-charcoal-700/50 p-5">
              <p className="text-xs text-gray-500">
                Developed by
              </p>
              <a
                href="https://wa.me/0201022677775"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-2 text-sm text-copper-light transition-colors hover:text-copper"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ahmed Hassaan
                <span className="text-xs text-gray-500">| إنجاز ميديا</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-charcoal-600/30 pt-6 text-center text-xs text-gray-600 sm:flex-row">
          <p>© {new Date().getFullYear()} ZEDA BARBER SHOP. All rights reserved.</p>
          <p>
            Design & Development by{' '}
            <a href="https://wa.me/0201022677775" target="_blank" rel="noopener noreferrer" className="text-copper-light transition-colors hover:text-copper">
              Ahmed Hassaan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
