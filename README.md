# SpaSeoApp-Ng17-SSR-i18n-Cypress

Optimiza el rendimiento de una SPA con SSR en Angular 17. Mejora SEO e internacionalización (i18n). Facilita el desarrollo con SCSS y plantillas en línea. Garantiza calidad con Cypress, pruebas modernas y eficientes

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
- ⬜️ **refactor:** `refactor i18n service form app.module`

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

### 3️⃣ Implement SEO Optimization feat-seo

- ⬜️ **feat:** `add structured data for Google indexing`
- ⬜️ **feat:** `add Open Graph and Twitter meta tags`

---

## Things I Learned: 

### Stable Selectors in Cypress

**Key Takeaway:** Employing stable selectors, such as `data-cy` attributes, minimizes the risk of tests failing due to UI changes. This practice ensures that tests are more independent and less prone to flakiness, ultimately leading to a more robust and maintainable test suite.

<!--
### Things I Learned: Stable Selectors in Cypress


## 3 Implement SEO Optimization feat/seo
- ✅ `feat: implement SSR for improved SEO performance`
- ✅ `feat: add structured data for Google indexing`
- ✅ `feat: add Open Graph and Twitter meta tags`
-->
