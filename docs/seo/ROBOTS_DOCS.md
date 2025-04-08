Robots.txt Implementation Options:

1. File Location Alternatives:

   - Root directory (public/robots.txt) - Most common
   - Static assets folder (src/assets/robots.txt)
   - Dynamically generated via server route (/robots.txt)

2. Key Directives to Consider:

   - User-agent: Specify crawlers (Googlebot, \*)
   - Allow/Disallow: Control page access
   - Sitemap: Link to XML sitemap
   - Crawl-delay: Rate limiting
   - Host: Preferred domain (deprecated)

3. SPA-Specific Considerations:

   - Allow JS/CSS for proper indexing
   - Disallow admin/API routes
   - Handle client-side routes carefully
   - Consider SSR impact

4. Recommended Basic Structure:
   User-agent: \*
   Allow: /
   Disallow: /admin/
   Disallow: /api/
   Sitemap: https://yourdomain.com/sitemap.xml

5. Validation:

   - Test with Google Search Console
   - Check with online validators
   - Verify crawlability

6. Additional Notes:
   - File must be plain text
   - Case-sensitive
   - 50KB size limit
   - Cached by search engines
