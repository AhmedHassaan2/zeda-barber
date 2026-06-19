"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logos/zeda-logo.png" alt="ZEDA" className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex gap-8 lg:gap-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary transition-colors duration-400 font-button text-button uppercase tracking-[0.1em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary font-button text-xs uppercase tracking-wider transition-all duration-300"
            aria-label="Toggle language"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <Link
            href="/booking"
            className="hidden md:inline-block px-6 py-2.5 border border-primary text-primary font-button text-button uppercase tracking-[0.1em] hover:bg-primary hover:text-surface transition-all duration-400"
          >
            {t("nav.book")}
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-surface flex flex-col items-center justify-center gap-8">
          <button
            onClick={toggleLang}
            className="px-6 py-2 border border-primary text-primary font-button text-button uppercase tracking-wider hover:bg-primary hover:text-surface transition-all duration-300"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-headline-lg text-headline-lg-mobile text-on-surface hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="mt-8 px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-[0.1em]"
          >
            {t("nav.book")}
          </Link>
        </div>
      )}
    </header>
  );
}
