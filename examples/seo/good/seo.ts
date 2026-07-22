// WHY: generateMetadata provides dynamic, per-page SEO data.
// Open Graph tags control social sharing, structured data boosts rich results.

import type { Metadata } from "next";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://example.com";
  const canonicalUrl = `${baseUrl}/${slug}`;

  return {
    title: `${page.title} | MyApp`,
    description: page.excerpt.slice(0, 160),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: page.title,
      description: page.excerpt,
      url: canonicalUrl,
      siteName: "MyApp",
      type: "article",
      publishedTime: page.publishedAt,
      authors: [page.author.name],
      images: [
        {
          url: page.coverImage ?? `${baseUrl}/og/${slug}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.excerpt,
      images: [page.coverImage ?? `${baseUrl}/og/${slug}`],
    },
  };
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const page = await getPageData(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.excerpt,
    author: { "@type": "Person", name: page.author.name },
    datePublished: page.publishedAt,
    image: page.coverImage,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{page.title}</h1>
    </article>
  );
}
