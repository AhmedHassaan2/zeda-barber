'use client'

import { Button } from '@/components/ui/button'
import { Plus, Image, Trash2, Link as LinkIcon } from 'lucide-react'

export default function AdminGallery() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">المعرض</h1>
          <p className="text-sm text-gray-400">إدارة صور وفيديوهات المعرض</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1"><LinkIcon className="h-4 w-4" /> إضافة فيديو</Button>
          <Button className="gap-1"><Plus className="h-4 w-4" /> إضافة صور</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-charcoal-700">
            <div className="flex h-full items-center justify-center">
              <Image className="h-8 w-8 text-gray-600" />
            </div>
            <button className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/80 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500">
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
