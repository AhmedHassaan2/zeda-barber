'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  Scissors, Image, LayoutDashboard, LogOut, Menu, X, User,
  Settings, Star, Users, ChevronLeft
} from 'lucide-react'

const navItems = [
  { href: '/admin/services', label_ar: 'الخدمات', label_en: 'Services', icon: Scissors },
  { href: '/admin/gallery', label_ar: 'المعرض', label_en: 'Gallery', icon: Image },
  { href: '/admin/hairstyles', label_ar: 'التسريحات', label_en: 'Hairstyles', icon: Star },
  { href: '/admin/team', label_ar: 'فريق العمل', label_en: 'Team', icon: Users },
  { href: '/admin/settings', label_ar: 'الإعدادات', label_en: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/admin/login')
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    })
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <aside className={"fixed inset-y-0 right-0 z-50 flex flex-col border-l border-charcoal-600/50 bg-charcoal-800/80 backdrop-blur-xl transition-all duration-300 " + (sidebarOpen ? "w-64" : "w-0 md:w-16 overflow-hidden") }>
        <div className="flex h-16 items-center justify-between border-b border-charcoal-600/50 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-copper to-gold/30">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="font-serif text-sm font-bold text-white">ZEDA Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all " + (isActive ? "bg-copper/10 text-copper-light" : "text-gray-400 hover:bg-charcoal-700 hover:text-white")}
              >
                <Icon className="h-4 w-4" />
                {item.label_ar}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-charcoal-600/50 p-3">
          <Link href="/" className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-charcoal-700 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> عرض الموقع
          </Link>
          <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10">
            <LogOut className="h-4 w-4" /> تسجيل خروج
          </button>
        </div>
      </aside>

      <div className={"flex-1 transition-all duration-300 " + (sidebarOpen ? "md:mr-64" : "md:mr-16")}>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-charcoal-600/50 bg-charcoal-900/90 px-4 backdrop-blur-xl">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
              <Menu className="h-5 w-5" />
            </button>
          )}
          <div className="flex-1" />
          <span className="text-xs text-gray-500">مدير الموقع</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10">
            <User className="h-4 w-4 text-copper-light" />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
