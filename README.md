# SpaSeoApp-Ng17-SSR-i18n-Cypress

Optimiza el rendimiento de una SPA con SSR en Angular 17. Mejora SEO e internacionalización (i18n). Facilita el desarrollo con SCSS y plantillas en línea. Garantiza calidad con Cypress, pruebas modernas y eficientes

[![Netlify Status](https://api.netlify.com/api/v1/badges/b103db3a-b672-4475-9710-9a81e982c79d/deploy-status)](https://app.netlify.com/sites/spa-seo-ssr/deploys)

---

## Rodemap

### 1️⃣ Internationalization (i18n) feat/i18n

- ✅ `initial commit`
- ✅ **chore:** `created proyect with custom cli command`
- ✅ **feat:** `add structured content with sections and styling`
- ✅ **feat:** `add i18n functionality with JSON demo files`
- ✅ **feat:** `implement 2 languages for i18n`
- ✅ **fix:** `Improved styles, form layout and navigation`
- ✅ **feat:** `complete i18n implementation for 2 sections`
- ⬜️ **refactor:** `refactor i18n service from app.module`

### 2️⃣ Cypress Testing feat-cypress

- ✅ **chore:** `add Cypress for end-to-end testing`
  - Install Cypress: `ng add @cypress/schematic`
  - Add Cypress config
- ✅ **test:** `add navigation tests`
  - implement data-cy attributes for testing
  - Test section navigation
  - Test call to action button
  - Add custom scroll with adjustable duration
- ✅ **test:** `add form validation tests`
  - Field validation tests
  - Form submission test
  - Validate email format
  - Implement screenshot management
- ✅ **test:** `add i18n tests and language persistence`
  - English Language Tests
  - Spanish Language Tests
  - LocalStorage persistence
  - Screenshot Comparisons
- ⬜️ **refactor:** `update tests to follow AAA-patern`

### 3️⃣ Jamstack with Netlify feat/ssr-deployment

- ✅ **docs:** `add investigation documents`
  - CMS comparison report
  - Calendar API options
  - NETLIFY_SSR_DEPLOYMENT_REPORT
- ✅ **chore:** `add Netlify configuration files`
  - netlify.toml setup
  - netlify cli for testing
  - updated SSR deployment plan
  - implement CD pipeline with previews
    **Future Features**
- ⬜️ **feat:** `implement serverless functions`
  - Save Environment variables
  - Implement 3rd Party api calls
- ⬜️ **chore:** `implement CI pipeline`
  - Linting and unit tests > 80%
  - Visual regression tests & E2E tests
  - Lighthouse audit & Performance budget check

### 4️⃣ Implement SEO Optimization feat-seo

- ✅ **docs:** `add comprehensive metadata reference guides`
- ✅ **feat:** ` add Lighthouse performance testing infrastructure`
  - adds npm scripts for running Lighthouse audits
  - includes guide documentation for performance testing
- ✅ **feat:** `Core Implementation add Open Graph`

  - static meta tags SEO(73->82)
  - meta service for i18n SEO(82->83)
  - add robots.txt SEO(83->92)
  - add sitemap.xml for better indexing

- ✅ **feat:** `add structured data and track performance`

  - Implement JSON-LD schema for better indexing
  - Add Lighthouse report and images (73 -> 92)
  - Document structured data implementation details

- ⬜️ **feat:** `optimize images for SEO`
  - Compression and alt tags
- ⬜️ **docs:** `add Lighthouse optimization to documentation`

<!--
Implement SEO Optimization feat/seo
- ✅ `feat: implement SSR for improved SEO performance`
- ✅ `feat: add structured data for Google indexing`
- ✅ `feat: add Open Graph and Twitter meta tags`

#### SEO Metadata
- ⬜️ **feat:** `basic metadata implementation`
  ```typescript
  // Example: Setting basic metadata in Angular
  this.meta.addTags([
    { name: 'description', content: 'Professional spa services' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]);
  ```
- ⬜️ **feat:** `add social media meta tags`
  ```typescript
  // Planned Open Graph/Twitter implementation
  this.meta.addTags([
    { property: 'og:title', content: 'Spa Services' },
    { property: 'og:description', content: 'Book professional spa treatments' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]);

  ```
- ⬜️ **feat:** `i18n metadata support`
  ```typescript
  // Planned multilingual metadata
  this.meta.updateTag({
    name: 'description',
    content: this.translate.instant('META.DESCRIPTION')
  });
  ```
-->

---

## Things I Learned:

### Stable Selectors in Cypress

**Key Takeaway:** Employing stable selectors, such as `data-cy` attributes, minimizes the risk of tests failing due to UI changes. This practice ensures that tests are more independent and less prone to flakiness, ultimately leading to a more robust and maintainable test suite.

<!--
### Things I Learned: meta tags from ssr


https://github.com/ArlandMv/SpaSeoApp-Ng17-SSR-i18n-Cypress/pull/4#issuecomment-2767773084

✅ Deploy Preview for spa-seo-ssr ready!
Name	Link
🔨 Latest commit	756af04
🔍 Latest deploy log	https://app.netlify.com/sites/spa-seo-ssr/deploys/67eb3d36198ad20008cd7b6d
😎 Deploy Preview	https://deploy-preview-4--spa-seo-ssr.netlify.app
📱 Preview on mobile
Toggle QR Code...


QR Code

Use your smartphone camera to open QR code link.

-->
