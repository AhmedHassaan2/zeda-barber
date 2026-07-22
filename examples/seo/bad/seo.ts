// WHY WRONG: No metadata, no OG tags, no structured data, no canonical URLs.
// Search engines and social platforms get nothing useful.

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageData(params.slug);

  return (
    <div>
      <div>{page.title}</div>
      <div>{page.content}</div>
    </div>
  );
}

// No generateMetadata export
// No <title> tag
// No meta description
// No Open Graph tags — social shares show blank
// No structured data — no rich results in Google
// No canonical URL — potential duplicate content
// Generic <div> tags — poor semantic structure
// No image optimization for social sharing
