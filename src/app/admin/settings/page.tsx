'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Save, Upload } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">الإعدادات</h1>
          <p className="text-sm text-gray-400">إعدادات الموقع العامة</p>
        </div>
        <Button className="gap-1"><Save className="h-4 w-4" /> حفظ</Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="font-medium text-white">معلومات المحل</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">اسم المحل (عربي)</label>
                <input defaultValue="زيدا للحلاقة" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">اسم المحل (إنجليزي)</label>
                <input defaultValue="ZEDA BARBER SHOP" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">رقم واتساب الحجوزات</label>
                <input defaultValue="0201069389235" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">العنوان</label>
                <input defaultValue="كفرتصفا - كفرشكر - قليوبية" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="font-medium text-white">الشعار (Logo)</h3>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-charcoal-600">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <Button variant="outline" className="gap-1"><Upload className="h-4 w-4" /> رفع شعار جديد</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h3 className="font-medium text-white">المطور</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-400">اسم المطور</label>
                <input defaultValue="احمد حسان | Ahmed Hassaan" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">شركة المطور</label>
                <input defaultValue="إنجاز ميديا" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-400">رقم واتساب المطور</label>
                <input defaultValue="0201022677775" className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 px-3 py-2 text-sm text-white outline-none focus:border-copper/50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
