'use client'

import { Button } from '@/components/ui/button'
import { Plus, Star, Trash2 } from 'lucide-react'

export default function AdminHairstyles() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">التسريحات</h1>
          <p className="text-sm text-gray-400">إدارة قصات الشعر المرجعية للتجربة بالذكاء الاصطناعي</p>
        </div>
        <Button className="gap-1"><Plus className="h-4 w-4" /> إضافة تسريحة</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl bg-charcoal-700">
            <div className="flex aspect-[3/4] items-center justify-center">
              <Star className="h-8 w-8 text-gray-600" />
            </div>
            <div className="bg-charcoal-800 p-2">
              <p className="text-xs text-gray-400">تسريحة {i + 1}</p>
            </div>
            <button className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/80 opacity-0 transition-opacity group-hover:opacity-100">
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
