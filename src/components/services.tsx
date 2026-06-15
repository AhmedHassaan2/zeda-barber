'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Sparkles } from 'lucide-react'

const services = [
  {
    title_ar: 'حلاقة شعر كلاسيكية',
    title_en: 'Classic Haircut',
    desc_ar: 'حلاقة عصرية بتقنيات كلاسيكية احترافية تناسب جميع أنواع الشعر.',
    desc_en: 'Professional classic haircut with modern techniques.',
    price: null,
    image: 'https://placehold.co/400x300/B87333/ffffff?text=Classic+Haircut',
  },
  {
    title_ar: 'تهذيب وتصفيف اللحية',
    title_en: 'Beard Grooming',
    desc_ar: 'تشذيب وتصفيف اللحية بأعلى دقة باستخدام أفضل المنتجات.',
    desc_en: 'Precision beard trimming and styling with premium products.',
    price: null,
    image: 'https://placehold.co/400x300/8B5E3C/ffffff?text=Beard+Grooming',
  },
  {
    title_ar: 'عناية كاملة بالوجه',
    title_en: 'Facial Care',
    desc_ar: 'جلسة عناية متكاملة للبشرة تشمل تنظيف وترطيب وتدليك.',
    desc_en: 'Complete facial care including cleansing, moisturizing and massage.',
    price: null,
    image: 'https://placehold.co/400x300/B87333/ffffff?text=Facial+Care',
  },
  {
    title_ar: 'حلاقة شبابية عصرية',
    title_en: 'Modern Youth Cut',
    desc_ar: 'أحدث صيحات الحلاقة الشبابية العصرية والمودرن.',
    desc_en: 'Latest modern youth haircut trends and styles.',
    price: null,
    image: 'https://placehold.co/400x300/2d2d2d/ffffff?text=Modern+Cut',
  },
  {
    title_ar: 'قص أطفال',
    title_en: 'Kids Haircut',
    desc_ar: 'قص شعر الأطفال بأسلوب لطيف ومريح يناسب جميع الأعمار.',
    desc_en: 'Kids haircut in a friendly and comfortable atmosphere.',
    price: null,
    image: 'https://placehold.co/400x300/8B5E3C/ffffff?text=Kids+Haircut',
  },
  {
    title_ar: 'تنظيف عميق للبشرة',
    title_en: 'Deep Skin Cleaning',
    desc_ar: 'إزالة الرؤوس السوداء وتنظيف عميق للبشرة بمستحضرات طبيعية.',
    desc_en: 'Deep pore cleansing and blackhead removal with natural products.',
    price: null,
    image: 'https://placehold.co/400x300/B87333/ffffff?text=Skin+Cleaning',
  },
  {
    title_ar: 'بكيدج العريس',
    title_en: 'Groom Package',
    desc_ar: 'باقة متكاملة ليوم زفافك: حلاقة + عناية بالبشرة + تصفيف شعر.',
    desc_en: 'Complete groom package: haircut + skincare + styling.',
    price: null,
    image: 'https://placehold.co/400x300/C9A84C/ffffff?text=Groom+Package',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-copper/10 px-4 py-1 text-xs font-medium tracking-wider text-copper-light uppercase">
            Our Services
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            خدماتنا
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            نقدم لكم مجموعة متكاملة من خدمات الحلاقة والعناية
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="group h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title_ar}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
                </div>
                <CardContent className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-white">
                    {service.title_ar}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {service.desc_ar}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    {service.price != null ? (
                      <span className="font-serif text-lg font-bold text-copper-light">
                        {service.price} ج.م
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">يحدد حسب الخدمة</span>
                    )}
                    <a
                      href={`https://wa.me/0201069389235?text=${encodeURIComponent(service.title_ar)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        احجز الآن
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a href="https://wa.me/0201069389235" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              احجز موعدك عبر واتساب
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
