"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 429) {
        setError("محاولات كثيرة جداً. حاول بعد ١٥ دقيقة.");
        return;
      }

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "خطأ في الدخول");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/images/logos/zeda-logo.png" alt="ZEDA" className="h-16 w-auto mx-auto mb-6" />
          <h1 className="font-display-lg text-headline-md text-primary">Admin Panel</h1>
          <p className="font-body-md text-on-surface-variant mt-2">لوحة التحكم</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
              placeholder="zeda"
              required
            />
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••"
              required
            />
          </div>
          {error && (
            <p className="text-error font-body-md text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-surface font-button text-button uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
        <div className="mt-8 text-center">
          <a href="/" className="text-on-surface-variant hover:text-primary font-body-md text-sm transition-colors">
            العودة للموقع
          </a>
        </div>
      </div>
    </main>
  );
}
