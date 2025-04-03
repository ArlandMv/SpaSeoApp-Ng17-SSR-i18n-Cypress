# Key Metadata Elements for SEO

## 1. Title Tag (`<title>`)
- Most important on-page SEO element
- Appears in search results and browser tabs
- Should be unique for each page
- Ideal length: 50-60 characters
- **Implementation Example**:
```typescript
// Angular implementation for landing pages
this.title.setTitle(
  `High-Converting Landing Pages for Solopreneurs | ${this.translate.instant('HERO_TAGLINE')}`
);
```

## 2. Meta Description
- Summary shown in search results
- Doesn't directly affect rankings but impacts CTR
- Should be compelling and include keywords
- Ideal length: 150-160 characters
- **Implementation Example**:
```html
<meta name="description" content="Convert more visitors with our high-performance landing pages. Built with Jamstack for solopreneurs who want faster load times and better SEO results.">
```

## 3. Social Sharing Metadata
### WhatsApp/Facebook/Other Platforms
```html
<!-- Essential Open Graph Tags -->
<meta property="og:title" content="High-Converting Landing Pages for Solopreneurs">
<meta property="og:description" content="Get custom, SEO-optimized landing pages that convert visitors into leads. Perfect for solopreneurs!">
<meta property="og:image" content="https://yourdomain.com/images/social-share.jpg">
<meta property="og:url" content="https://yourdomain.com/landing-pages">
<meta property="og:type" content="website">

<!-- WhatsApp Specific -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Landing page preview for solopreneurs">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="High-Converting Landing Pages for Solopreneurs">
<meta name="twitter:description" content="Get custom, SEO-optimized landing pages that convert visitors into leads.">
<meta name="twitter:image" content="https://yourdomain.com/images/twitter-share.jpg">
```

**Implementation Example for Angular:**
```typescript
setSocialMetadata() {
  this.meta.updateTag({ property: 'og:title', content: 'High-Converting Landing Pages for Solopreneurs' });
  this.meta.updateTag({ property: 'og:description', content: 'Get custom, SEO-optimized landing pages that convert visitors into leads' });
  this.meta.updateTag({ property: 'og:image', content: environment.baseUrl + 'assets/images/social-share.jpg' });
  this.meta.updateTag({ property: 'og:url', content: environment.baseUrl + this.router.url });
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
}
```

## 4. Viewport Tag
- Essential for mobile responsiveness
- Standard implementation:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## 5. Charset Declaration
- Ensures proper character encoding
- Should be first meta tag in `<head>`
```html
<meta charset="UTF-8">
```

## 6. Canonical Tag
- Prevents duplicate content issues
- Specifies preferred version of a page
```html
<link rel="canonical" href="https://example.com/preferred-url">
```

## 7. Robots Meta Tag
- Controls search engine crawling/indexing
```html
<meta name="robots" content="index, follow">
<meta name="robots" content="noindex, nofollow">
```

## 8. Structured Data (Schema.org)
- Helps search engines understand content
- Implemented using JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page Description"
}
</script>