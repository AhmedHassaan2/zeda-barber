import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZEDA BARBER SHOP | زيدا للحلاقة",
  description: "حيث تجتمع الحلاقة الكلاسيكية مع العصرية. خبرة واحترافية في العناية بإطلالتك.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${notoSansArabic.variable} font-body-md bg-surface text-on-surface antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
