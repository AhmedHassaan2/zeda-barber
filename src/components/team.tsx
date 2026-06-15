'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

export default function Team() {
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
            Our Team
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            فريق العمل
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            فريق متكامل من أمهر الحلاقين لتقديم أفضل تجربة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-charcoal-600/50 bg-gradient-to-b from-charcoal-700/50 to-charcoal-800/50 p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-copper/20 to-gold/10 ring-2 ring-copper/20">
              <Users className="h-8 w-8 text-copper-light" />
            </div>
            <div className="aspect-[3/1] w-full max-w-md mx-auto rounded-xl bg-charcoal-600/50 flex items-center justify-center border border-charcoal-500/30 mb-6">
              <p className="text-sm text-gray-500">صورة فريق العمل</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              في صالون ZEDA، يجمع فريقنا بين الخبرة والاحترافية والشغف
              بتقديم أفضل خدمات الحلاقة والعناية. كل أعضاء فريقنا مدربون على أحدث
              التقنيات ومستعد لتقديم تجربة فريدة تناسب ذوقك.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
