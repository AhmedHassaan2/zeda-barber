'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label_ar: 'الرئيسية', label_en: 'Home' },
  { href: '/gallery', label_ar: 'معرض الأعمال', label_en: 'Gallery' },
  { href: '/ai-hair', label_ar: 'جرب تسريحتك', label_en: 'Try Hairstyle' },
  { href: '/booking', label_ar: 'احجز موعد', label_en: 'Book Now' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'ar' | 'en'>('ar')

  const toggleLang = () => setLang(l => (l === 'ar' ? 'en' : 'ar'))
  const isAr = lang === 'ar'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal-600/50 bg-charcoal-900/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-copper to-gold/40 shadow-lg shadow-copper/20">
            <span className="font-serif text-lg font-bold text-white">Z</span>
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-wide text-white">
              ZEDA
            </h1>
            <p className="-mt-1 text-[10px] uppercase tracking-[0.2em] text-copper-light">
              Barber Shop
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-gray-300 transition-all hover:bg-charcoal-600 hover:text-copper-light"
            >
              {isAr ? item.label_ar : item.label_en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            className="hidden text-xs uppercase tracking-wider text-gray-400 md:flex"
          >
            <Globe className="h-3.5 w-3.5" />
            {isAr ? 'EN' : 'AR'}
          </Button>

          <a
            href="https://wa.me/0201069389235"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="hidden md:flex">
              <Phone className="h-4 w-4" />
              {isAr ? 'احجز الآن' : 'Book Now'}
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-charcoal-600 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 md:hidden',
          open ? 'max-h-96 border-t border-charcoal-600/50' : 'max-h-0'
        )}
      >
        <div className="space-y-1 px-4 py-3">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition-colors hover:bg-charcoal-600"
            >
              {isAr ? item.label_ar : item.label_en}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={toggleLang} className="flex-1">
              <Globe className="h-4 w-4" />
              {isAr ? 'English' : 'العربية'}
            </Button>
            <a href="https://wa.me/0201069389235" target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full">
                <Phone className="h-4 w-4" />
                {isAr ? 'احجز الآن' : 'Book Now'}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
