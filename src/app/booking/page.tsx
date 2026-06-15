'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Sparkles, Scissors } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  'حلاقة شعر كلاسيكية',
  'تهذيب وتصفيف اللحية',
  'عناية كاملة بالوجه',
  'حلاقة شبابية عصرية',
  'قص أطفال',
  'تنظيف عميق للبشرة',
  'بكيدج العريس',
]

export default function BookingPage() {
  const phone = '0201069389235'
  const whatsappUrl = 'https://wa.me/0201069389235'

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-copper-light">
              <ArrowLeft className="h-4 w-4" /> العودة للرئيسية
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block rounded-full bg-copper/10 px-4 py-1 text-xs font-medium tracking-wider text-copper-light uppercase">Booking</span>
              <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">احجز موعدك</h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                اختر الخدمة اللي تناسبك واحجز موعدك عبر واتساب بضغطة زر
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-copper/10">
                    <Phone className="h-4 w-4 text-copper-light" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">واتساب الحجوزات</p>
                    <p className="text-sm text-white">{phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-charcoal-600">
                    <Clock className="h-4 w-4 text-copper-light" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">مواعيد العمل</p>
                    <p className="text-sm text-white">يومياً من 10 صباحاً - 11 مساءً</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-charcoal-600">
                    <MapPin className="h-4 w-4 text-copper-light" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">العنوان</p>
                    <p className="text-sm text-white">كفرتصفا - كفرشكر - قليوبية</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-serif text-lg font-bold text-white">اختر الخدمة</h3>
                  <p className="mb-5 text-sm text-gray-400">اضغط على الخدمة لتبدأ المحادثة</p>

                  <div className="space-y-2">
                    {services.map((service, i) => (
                      <a
                        key={i}
                        href={`https://wa.me/0201069389235?text=${encodeURIComponent(service)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-charcoal-600 bg-charcoal-700/50 px-4 py-3 transition-all hover:border-copper/50 hover:bg-copper/5"
                      >
                        <div className="flex items-center gap-3">
                          <Scissors className="h-4 w-4 text-copper-light" />
                          <span className="text-sm text-white">{service}</span>
                        </div>
                        <MessageCircle className="h-4 w-4 text-copper-light" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-6">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full gap-2">
                        <Sparkles className="h-5 w-5" />
                        تحدث معنا على واتساب
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
