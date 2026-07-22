# SEO Refactoring: Before / After

## Before (Anti-pattern)

```tsx
export default async function Page({ params }) {
  const page = await getPageData(params.slug);
  return (
    <div>
      <div>{page.title}</div>
      <div>{page.content}</div>
    </div>
  );
}
```

**Problems:**
- No `generateMetadata` — no `<title>` or `<meta description>`
- No Open Graph tags — social shares are blank
- No structured data — no Google rich results
- No canonical URL — duplicate content risk
- `<div>` instead of `<article>` — poor semantics

## After (Preferred)

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${page.title} | MyApp`,
    description: page.excerpt.slice(0, 160),
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: { title, description, images: [...] },
    twitter: { card: "summary_large_image", ... },
  };
}

export default async function Page({ params }) {
  const jsonLd = { "@type": "Article", headline: page.title, ... };
  return (
    <article>
      <script type="application/ld+json" ... />
      <h1>{page.title}</h1>
    </article>
  );
}
```

**Improvements:**
1. **`generateMetadata`** — dynamic per-page SEO
2. **Open Graph** — rich social media previews
3. **Structured data (JSON-LD)** — Google rich results
4. **Canonical URL** — prevents duplicate content
5. **Semantic HTML** — `<article>` and `<h1>` for crawlers
