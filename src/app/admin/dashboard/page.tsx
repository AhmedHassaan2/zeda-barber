"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface VideoEntry {
  id: string;
  title: string;
  url: string;
  platform: string;
  createdAt: string;
}

interface GalleryImage {
  name: string;
  url: string;
  created_at: string;
}

function ConfirmModal({
  open,
  message,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-surface rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <p className="font-body-md text-on-surface mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg font-button text-xs uppercase tracking-wider hover:bg-surface-container transition-all"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 bg-error text-surface rounded-lg font-button text-xs uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "جاري..." : "تأكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"images" | "videos" | "gallery">("images");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [deleteImageLoading, setDeleteImageLoading] = useState<string | null>(null);

  // Videos state
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPlatform, setVideoPlatform] = useState("facebook");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      setVideos(data.videos ?? []);
    } catch {
      // ignore
    }
  }, []);

  const fetchGallery = useCallback(async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setGalleryImages(data.images ?? []);
    } catch {
      // ignore
    } finally {
      setGalleryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/videos")
      .then((res) => {
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setAuthed(true);
        return res.json();
      })
      .then((data) => {
        if (data?.videos) setVideos(data.videos);
      })
      .catch(() => {
        router.replace("/admin/login");
      })
      .finally(() => setLoadingAuth(false));
  }, [router]);

  function confirmActionWrapper(message: string, action: () => Promise<void>) {
    setConfirmMessage(message);
    setConfirmAction(() => async () => {
      setConfirmLoading(true);
      try {
        await action();
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
    setConfirmOpen(true);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const input = document.getElementById("file-input") as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) {
      setUploadError("من فضلك اختر صورة");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadResult(null);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (data.success) {
          setUploadResult(`✅ تم رفع ${data.filename} بنجاح!`);
          input.value = "";
          fetchGallery();
        } else {
          setUploadError(data.error || "فشل الرفع");
        }
      } catch {
        setUploadError("خطأ في معالجة الرد");
      } finally {
        setUploading(false);
      }
    });

    xhr.addEventListener("error", () => {
      setUploadError("خطأ في الاتصال");
      setUploading(false);
    });

    xhr.open("POST", "/api/admin/upload");
    xhr.send(formData);
  }

  async function handleDeleteImage(name: string) {
    confirmActionWrapper(`هل أنت متأكد من حذف ${name}؟`, async () => {
      setDeleteImageLoading(name);
      try {
        const res = await fetch("/api/admin/gallery", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        if (data.success) {
          await fetchGallery();
        }
      } finally {
        setDeleteImageLoading(null);
      }
    });
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!videoUrl) return;
    setVideoLoading(true);
    setVideoError(null);

    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: videoTitle,
          url: videoUrl,
          platform: videoPlatform,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setVideoTitle("");
        setVideoUrl("");
        setVideoPlatform("facebook");
        await fetchVideos();
      } else {
        setVideoError(data.error || "فشل الإضافة");
      }
    } catch {
      setVideoError("خطأ في الاتصال");
    } finally {
      setVideoLoading(false);
    }
  }

  async function handleDeleteVideo(id: string) {
    confirmActionWrapper("هل أنت متأكد من حذف هذا الفيديو؟", async () => {
      setDeleteLoading(id);
      try {
        const res = await fetch("/api/admin/videos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.success) {
          await fetchVideos();
        }
      } finally {
        setDeleteLoading(null);
      }
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (loadingAuth) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-on-surface-variant font-body-md">جاري التحقق...</p>
        </div>
      </main>
    );
  }

  if (!authed) return null;

  return (
    <main className="min-h-screen bg-surface">
      <ConfirmModal
        open={confirmOpen}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
        loading={confirmLoading}
      />

      <header className="border-b border-outline-variant/20 bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logos/zeda-logo.png" alt="ZEDA" className="h-8 w-auto" />
            <span className="text-primary font-label-caps text-label-caps uppercase">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-on-surface-variant hover:text-primary font-body-md text-sm transition-colors">
              الموقع
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-error hover:border-error font-button text-xs uppercase tracking-wider rounded transition-all"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-outline-variant/20 pb-4">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-2.5 rounded-lg font-button text-button uppercase tracking-wider transition-all ${
              activeTab === "images"
                ? "bg-primary text-surface"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
          >
            رفع الصور
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-2.5 rounded-lg font-button text-button uppercase tracking-wider transition-all ${
              activeTab === "gallery"
                ? "bg-primary text-surface"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
          >
            إدارة الصور
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2.5 rounded-lg font-button text-button uppercase tracking-wider transition-all ${
              activeTab === "videos"
                ? "bg-primary text-surface"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
          >
            إدارة الفيديوهات
          </button>
        </div>

        {activeTab === "images" && (
          <div className="max-w-lg">
            <h2 className="font-display-lg text-headline-md mb-6">رفع صور للمعرض</h2>
            <form onSubmit={handleUpload} className="space-y-5">
              <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-8 text-center hover:border-primary/40 transition-colors">
                <span className="material-symbols-outlined text-5xl text-primary/60 mb-3">add_photo_alternate</span>
                <p className="font-body-md text-on-surface-variant mb-4">اختر صورة من جهازك</p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-primary file:text-surface file:font-button file:text-button file:uppercase file:cursor-pointer hover:file:opacity-90"
                />
              </div>
              {uploading && (
                <div className="space-y-2">
                  <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant text-center">{uploadProgress}%</p>
                </div>
              )}
              {uploadResult && (
                <p className="font-body-md text-sm text-green-400">{uploadResult}</p>
              )}
              {uploadError && (
                <p className="font-body-md text-sm text-error">{uploadError}</p>
              )}
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3.5 bg-primary text-surface font-button text-button uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {uploading ? `جاري الرفع... ${uploadProgress}%` : "رفع الصورة"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <h2 className="font-display-lg text-headline-md mb-6">
              إدارة الصور
              <span className="text-on-surface-variant font-body-md text-sm mr-3">
                ({galleryImages.length} صورة)
              </span>
            </h2>
            {galleryLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-surface-container rounded-xl animate-pulse" />
                ))}
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">photo_library</span>
                <p className="text-on-surface-variant font-body-md">لا توجد صور مرفوعة بعد</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img.name} className="group relative aspect-square rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={img.url}
                      alt={`صورة ${img.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteImage(img.name)}
                        disabled={deleteImageLoading === img.name}
                        className="opacity-0 group-hover:opacity-100 transition-all w-10 h-10 flex items-center justify-center rounded-full bg-surface text-error hover:bg-error hover:text-surface"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-black/60 text-surface text-[10px] px-2 py-0.5 rounded">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display-lg text-headline-md mb-6">إضافة فيديو جديد</h2>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">عنوان الفيديو</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
                    placeholder="مثال: قص شعر عصري"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">رابط الفيديو</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://facebook.com/..."
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">المنصة</label>
                  <select
                    value={videoPlatform}
                    onChange={(e) => setVideoPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                {videoError && (
                  <p className="font-body-md text-sm text-error">{videoError}</p>
                )}
                <button
                  type="submit"
                  disabled={videoLoading}
                  className="w-full py-3.5 bg-primary text-surface font-button text-button uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {videoLoading ? "جاري الإضافة..." : "إضافة الفيديو"}
                </button>
              </form>
            </div>
            <div>
              <h2 className="font-display-lg text-headline-md mb-6">
                الفيديوهات المضافة
                <span className="text-on-surface-variant font-body-md text-sm mr-3">({videos.length})</span>
              </h2>
              {videos.length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">videocam</span>
                  <p className="text-on-surface-variant font-body-md">لا توجد فيديوهات مضافة بعد</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {videos.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between bg-surface-container rounded-lg p-4 border border-outline-variant/10"
                    >
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-body-md text-sm font-medium truncate">{v.title}</p>
                        <p className="text-on-surface-variant text-xs truncate">{v.url}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 rounded text-[10px] text-primary uppercase font-bold tracking-wider">
                          {v.platform}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(v.id)}
                        disabled={deleteLoading === v.id}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-error hover:border-error transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
