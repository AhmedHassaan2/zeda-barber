'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react'

const defaultServices = [
  { id: '1', title_ar: 'حلاقة شعر كلاسيكية', title_en: 'Classic Haircut', desc_ar: 'حلاقة عصرية بتقنيات كلاسيكية احترافية', price: null },
  { id: '2', title_ar: 'تهذيب وتصفيف اللحية', title_en: 'Beard Grooming', desc_ar: 'تشذيب وتصفيف اللحية بأعلى دقة', price: null },
  { id: '3', title_ar: 'عناية كاملة بالوجه', title_en: 'Facial Care', desc_ar: 'جلسة عناية متكاملة للبشرة', price: null },
]

export default function AdminServices() {
  const [services, setServices] = useState(defaultServices)
  const [editing, setEditing] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">الخدمات</h1>
          <p className="text-sm text-gray-400">إدارة خدمات المحل</p>
        </div>
        <Button className="gap-1"><Plus className="h-4 w-4" /> إضافة خدمة</Button>
      </div>

      <div className="space-y-4">
        {services.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-charcoal-600">
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white">{s.title_ar}</h3>
                <p className="text-xs text-gray-400">{s.desc_ar}</p>
                <p className="mt-1 text-xs text-copper-light">السعر: {s.price ?? 'يحدد لاحقاً'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
