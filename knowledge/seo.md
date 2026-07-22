# Technical SEO — Knowledge Base

## Purpose

Technical SEO ensures search engines can effectively crawl, index, and rank your website. This knowledge base covers meta tags, structured data, sitemaps, and SEO best practices for Next.js applications, with focus on App Router patterns and bilingual Arabic/English content.

## Core Concepts

### Meta Tags and Head Management

**Title Tags** — Unique, descriptive titles for every page. Include primary keyword near the beginning. Optimal length: 50-60 characters.

**Meta Descriptions** — Summarize page content for search results. Not a ranking factor but affects click-through rate. Optimal length: 150-160 characters.

**Open Graph Tags** — Control how content appears when shared on social media (Facebook, LinkedIn). Include `og:title`, `og:description`, `og:image`, `og:url`.

**Twitter Cards** — Similar to OG but specific to Twitter/X. Use `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

### Structured Data (Schema.org)

JSON-LD markup that helps search engines understand content meaning and context.

**Common types:**
- `WebSite` — Site-wide information
- `Organization` — Business details
- `Article` — Blog posts and news
- `Product` — E-commerce products
- `FAQPage` — Frequently asked questions
- `BreadcrumbList` — Navigation structure

### Sitemap and Robots.txt

**Sitemap (sitemap.xml)** — XML file listing all pages with last modification dates and priorities. Next.js generates sitemaps dynamically with `app/sitemap.ts`.

**Robots.txt** — Instructions for crawlers on which pages to crawl and which to skip. Always reference the sitemap location.

### Canonical URLs

Canonical tags tell search engines which version of a URL is the authoritative one, preventing duplicate content issues.

**Use cases:**
- Same content accessible via multiple URLs
- HTTP and HTTPS versions
- WWW and non-WWW versions
- URL parameters for tracking

### Hreflang Tags

Indicate language and regional targeting for multilingual sites. Critical for Arabic/English sites to prevent language confusion.

```html
<link rel="alternate" hreflang="ar" href="https://example.com/ar/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page" />
```

### Core Web Vitals and SEO

Google uses Core Web Vitals as ranking signals:
- LCP affects perceived loading speed
- CLS affects visual stability
- INP affects interactivity

### Mobile-First Indexing

Google primarily uses the mobile version of content for indexing and ranking. Ensure:
- Responsive design works on all screen sizes
- Content is identical on mobile and desktop
- Touch targets are appropriately sized
- Viewport meta tag is set correctly

## Best Practices

1. **Use Next.js generateMetadata** — Export `generateMetadata` from page components for dynamic, per-page meta tags; supports Open Graph, Twitter, and standard meta
2. **Implement structured data with JSON-LD** — Add schema.org markup to pages; use `next/script` for JSON-LD injection
3. **Generate dynamic sitemaps** — Use `app/sitemap.ts` to create sitemaps from database content; include all public pages with proper lastmod dates
4. **Set canonical URLs consistently** — Use `metadata.alternates.canonical` in Next.js to set canonical URLs; important for bilingual sites
5. **Implement hreflang for bilingual content** — Use `metadata.alternates.languages` to link Arabic and English versions of each page
6. **Create descriptive breadcrumbs** — Implement `BreadcrumbList` schema and visual breadcrumbs for navigation clarity
7. **Optimize for featured snippets** — Structure content with clear headings, lists, and tables that search engines can extract for featured snippets
8. **Monitor with Google Search Console** — Submit sitemaps, monitor indexing status, track search performance, and fix coverage issues

## Anti-Patterns

1. **Duplicate meta tags** — Every page must have unique title and description; copying meta across pages confuses search engines
2. **Missing alt text on images** — Search engines can't understand images without alt text; provide descriptive alt for all meaningful images
3. **Blocking CSS/JS in robots.txt** — Search engines need CSS and JavaScript to render pages; never block these resources
4. **Using JavaScript redirects** — Server-side redirects (301/302) are preferred; JavaScript redirects may not be followed by all crawlers
5. **Ignoring 404 errors** — Broken links waste crawl budget and harm user experience; implement custom 404 pages and monitor for broken links
6. **Keyword stuffing** — Repeating keywords unnaturally in content and meta tags is penalized; write naturally for humans
7. **Missing viewport meta tag** — Without `<meta name="viewport" content="width=device-width, initial-scale=1">`, mobile rendering fails
8. **Using client-side rendering for important content** — Content rendered only in JavaScript may not be indexed; use Server Components

## Common Mistakes

1. **Not setting metadataBase** — Open Graph URLs require absolute URLs; set `metadataBase` in the root layout for proper OG image resolution
2. **Forgetting sitemap in robots.txt** — Always reference your sitemap in robots.txt with `Sitemap: https://example.com/sitemap.xml`
3. **Inconsistent URL structure** — Changing URL patterns without redirects breaks existing backlinks and indexed pages
4. **Missing page load optimization for SEO pages** — Blog posts and landing pages must load fast; Core Web Vitals affect rankings
5. **Not handling pagination SEO** — Paginated content needs proper rel="next/prev" or canonical to the first page
6. **Using the same image for OG across all pages** — Each page should have a unique OG image representing its content
7. **Ignoring Arabic SEO specifics** — Arabic content needs proper UTF-8 encoding, RTL markup, and Arabic-language keywords
8. **Not submitting sitemap to search engines** — Don't wait for discovery; actively submit sitemaps to Google Search Console and Bing Webmaster Tools

## Decision Guidelines

| Scenario | Recommendation |
|---|---|
| New Next.js project | Set up metadataBase, generateMetadata, sitemap.ts from day one |
| Blog/CMS content | Article schema, proper heading hierarchy, Open Graph images |
| E-commerce | Product schema, price/availability markup, review aggregation |
| Bilingual site (AR/EN) | Hreflang tags, separate URL paths (/ar/, /en/), consistent content |
| Single Page Application | Server-side rendering for crawlable content; avoid CSR-only |
| Multi-tenant SaaS marketing | Each tenant's public pages need unique SEO metadata |

## References

- Google Search Central: https://developers.google.com/search
- Next.js Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org: https://schema.org/
- Open Graph Protocol: https://ogp.me/
- Ahrefs SEO Guide: https://ahrefs.com/seo
- Moz Beginner's Guide to SEO: https://moz.com/beginners-guide-to-seo

## Practical Notes

- **Next.js App Router:** Use `generateMetadata()` and `export const metadata` for static metadata; generate dynamically for database-driven pages
- **Sitemap generation:** Use `app/sitemap.ts` with a function that queries Supabase for all public pages and returns URL entries
- **Arabic content:** Ensure proper UTF-8 encoding, use `lang="ar"` on html element, and test with Arabic-specific search queries
- **OG images:** Generate dynamic OG images with `next/og` (Satori) for unique social sharing previews per page
- **Monitoring:** Set up Google Search Console for indexing monitoring; use Ahrefs or SEMrush for ongoing SEO analysis
