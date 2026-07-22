---
title: SEO analysis including meta tags, structured data, and technical SEO
description: SEO analysis including meta tags, structured data, and technical SEO
---

# `/seo-check`

<div class="tip custom-block" style="padding: 1rem;">
<strong>Command:</strong> <code>/seo-check</code> | <strong>Agent:</strong> <code>seo</code>
</div>

# /seo-check — SEO Analysis

Perform SEO analysis including meta tags, structured data, and technical SEO.

## Usage

```
/seo-check                   # Full project SEO check
/seo-check src/app/          # Check specific pages
```

## Analysis Areas

### 1. Meta Tags
- Title tags (unique, descriptive)
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### 2. Structured Data
- JSON-LD implementation
- Schema.org compliance
- Rich snippet eligibility

### 3. Technical SEO
- robots.txt configuration
- XML sitemap
- URL structure
- Internal linking
- Page speed impact

### 4. Content
- Heading hierarchy (H1-H6)
- Image alt text
- Internal links
- Content quality signals

### 5. Mobile SEO
- Mobile responsiveness
- Viewport configuration
- Touch targets

## Output Format

```
## SEO Report

### Meta Tags
- [PASS/FAIL] Title tags
- [PASS/FAIL] Meta descriptions
- [PASS/FAIL] Open Graph

### Technical
- [PASS/FAIL] robots.txt
- [PASS/FAIL] Sitemap
- [PASS/FAIL] URL structure

### Issues
1. [file:line] Description and fix

### Recommendations
- Priority improvements
```

## Execution

1. Check meta tags on all pages
2. Verify structured data
3. Analyze technical SEO
4. Review content structure
5. Generate SEO report

## Syntax

```
/seo-check [options] [arguments]
```

## Related Skills

See [Skills Registry](/skills/) for skills used during this command.

## Related Agents

See [Agents Registry](/agents/) for the agent that executes this command.
