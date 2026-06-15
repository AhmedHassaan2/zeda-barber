'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, User, Pencil, Trash2 } from 'lucide-react'

export default function AdminTeam() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">فريق العمل</h1>
          <p className="text-sm text-gray-400">إدارة أعضاء الفريق</p>
        </div>
        <Button className="gap-1"><Plus className="h-4 w-4" /> إضافة عضو</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[{name:'الحلاق الأول'},{name:'الحلاق الثاني'},{name:'الحلاق الثالث'}].map((m, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-600">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{m.name}</h3>
                  <p className="text-xs text-gray-400">حلاق</p>
                </div>
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
