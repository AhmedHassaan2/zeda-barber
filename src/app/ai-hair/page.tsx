'use client'

import { useState, useRef } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Upload, Sparkles, Camera, RefreshCw, Download, Check } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const hairstyles = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title_ar: `تسريحة ${i + 1}`,
  title_en: `Hairstyle ${i + 1}`,
  image: `https://placehold.co/300x400/${i % 2 === 0 ? '1a1a1a' : '232323'}/B87333?text=Style+${i + 1}`,
}))

export default function AIHairPage() {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUserImage(e.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleImageUpload(file)
  }

  const applyHairstyle = async () => {
    if (!userImage || !selectedStyle) return
    setProcessing(true)
    await new Promise(r => setTimeout(r, 2500))
    setResult(userImage)
    setProcessing(false)
  }

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

          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-copper/10 px-4 py-1 text-xs font-medium tracking-wider text-copper-light uppercase">AI Experience</span>
            <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">جرب تسريحتك الجديدة</h1>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-400">ارفع صورتك واختر التسريحة اللي تعجبك — وشوف النتيجة قبل ما تقرر</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wide text-gray-300 uppercase">صورتك</h2>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={"relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all " + (dragOver ? "border-copper bg-copper/5" : "border-charcoal-500 bg-charcoal-700/50")}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
                />
                {userImage ? (
                  <img src={userImage} alt="Your photo" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-3 h-10 w-10 text-gray-500" />
                    <p className="text-sm text-gray-400">اضغط أو اسحب صورتك هنا</p>
                    <p className="mt-1 text-xs text-gray-600">JPG, PNG • حتى 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-medium tracking-wide text-gray-300 uppercase">اختر تسريحة</h2>
              <div className="grid grid-cols-2 gap-3">
                {hairstyles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedStyle(s.id); setResult(null) }}
                    className={"relative overflow-hidden rounded-xl border-2 transition-all " + (selectedStyle === s.id ? "border-copper bg-copper/5" : "border-charcoal-500 bg-transparent")}
                  >
                    <img src={s.image} alt={s.title_ar} className="aspect-[3/4] w-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal-900/90 p-2">
                      <p className="text-xs text-white">{s.title_ar}</p>
                    </div>
                    {selectedStyle === s.id && (
                      <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-copper">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button
                onClick={applyHairstyle}
                disabled={!userImage || !selectedStyle || processing}
                size="lg"
                className="mt-6 w-full gap-2"
              >
                {processing ? (
                  <><RefreshCw className="h-5 w-5 animate-spin" /> جاري التطبيق...</>
                ) : (
                  <><Sparkles className="h-5 w-5" /> طبق التسريحة</>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-4 font-serif text-xl font-bold text-white">النتيجة</h3>
                    <div className="mx-auto max-w-md">
                      <img src={result} alt="Result" className="w-full rounded-xl" />
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                      * هتستلم النتيجة النهائية بعد ما نربط الـ AI
                    </p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <Download className="h-4 w-4" /> حفظ الصورة
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}
