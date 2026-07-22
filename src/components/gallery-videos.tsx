"use client";

interface VideoEntry {
  id: string;
  title: string;
  url: string;
  platform: "facebook" | "tiktok" | "youtube" | "other";
}

function getEmbedUrl(url: string, platform: string): string {
  if (platform === "facebook") {
    const u = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${u}&show_text=false&width=734`;
  }
  if (platform === "tiktok") {
    return url;
  }
  if (platform === "youtube") {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
  }
  return url;
}

export default function GalleryVideos({ videos }: { videos: VideoEntry[] }) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">videocam</span>
        <p className="font-body-lg text-on-surface-variant">لا توجد فيديوهات مضافة بعد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container group"
        >
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={getEmbedUrl(video.url, video.platform)}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
              title={video.title}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display-lg text-headline-sm uppercase group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary uppercase font-bold tracking-wider">
              {video.platform}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
