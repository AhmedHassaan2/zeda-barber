'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Scissors, Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/admin/services')
    } catch (err: any) {
      setError(err?.message || 'خطأ في تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-copper to-gold/30 shadow-lg">
            <Scissors className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-500">ZEDA BARBER SHOP</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-charcoal-600 bg-charcoal-800/50 p-6 backdrop-blur-sm">
          {error && (
            <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 py-2.5 pr-10 pl-4 text-sm text-white outline-none transition-colors focus:border-copper/50"
                placeholder="admin@zeda.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">كلمة المرور</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-charcoal-500 bg-charcoal-700 py-2.5 pr-10 pl-10 text-sm text-white outline-none transition-colors focus:border-copper/50"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? 'جاري تسجيل الدخول...' : <><Lock className="h-4 w-4" /> تسجيل الدخول</>}
          </Button>
        </form>
      </div>
    </div>
  )
}
