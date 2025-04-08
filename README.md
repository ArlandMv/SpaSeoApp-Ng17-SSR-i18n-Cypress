# SpaSeoApp-Ng17-SSR-i18n-Cypress

Optimiza el rendimiento de una SPA con SSR en Angular 17. Mejora el SEO y la internacionalización (i18n). Facilita el desarrollo con SCSS y componentes en línea. Garantiza calidad con Cypress, pruebas modernas y eficientes

[![Netlify Status](https://api.netlify.com/api/v1/badges/b103db3a-b672-4475-9710-9a81e982c79d/deploy-status)](https://app.netlify.com/sites/spa-seo-ssr/deploys)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/arlandmv/SpaSeoApp-Ng17-SSR-i18n-Cypress/blob/main/LICENSE)
![Commit Activity](https://img.shields.io/github/commit-activity/m/arlandmv/SpaSeoApp-Ng17-SSR-i18n-Cypress.svg)
<!--![Build Status](https://github.com/arlandmv/SpaSeoApp-Ng17-SSR-i18n-Cypress/actions/workflows/<workflow-file>/badge.svg)-->

<!--
[![Coverage Status](https://coveralls.io/repos/github/<username>/<repository>/badge.svg?branch=main)](https://coveralls.io/github/<username>/<repository>?branch=main)
-->

---


## How to Run the Project

Follow these steps to get the project running on your local machine:

1.  **Clone the repository:**  `git clone <repository-url>`
2.  **Navigate to the project directory:** `cd SpaSeoApp-Ng17-SSR-i18n-Cypress`
3.  **Install dependencies:** `npm install`
4.  **Start the development server:** `npm run serve:ssr:full`
5.  **Run Cypress Tests:** `npm run cypress:open`
6.  **Run LightHouse Tests:** `npm run lh:dev`

---

## Roadmap

### 1️⃣ Internationalization (i18n) feat/i18n

- ✅ `initial commit`
- ✅ **chore:** `created proyect with custom cli command`
- ✅ **feat:** `add structured content with sections and styling`
- ✅ **feat:** `add i18n functionality with JSON demo files`
- ✅ **feat:** `implement 2 languages for i18n`
- ✅ **fix:** `Improved styles, form layout and navigation`
- ✅ **feat:** `complete i18n implementation for 2 sections`
- ⬜️ **refactor:** `Move i18n service to a core module`

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
- ⬜️ **refactor:** `Update tests to follow AAA (Arrange, Act, Assert) pattern for better organization and readability`
### 3️⃣ Deployment with Netlify feat/ssr-deployment

- ✅ **docs:** `add investigation documents`
  - CMS comparison report
  - Calendar API options
  - NETLIFY_SSR_DEPLOYMENT_REPORT
- ✅ **chore:** `add Netlify configuration files`
  - netlify.toml setup
  - netlify cli for testing
  - updated SSR deployment plan
  - implement CD pipeline with previews
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

  - add robots.txt SEO (83->92)
  - add sitemap.xml for better indexing
  feat

  - Implement JSON-LD schema for better indexing
  - Add Lighthouse report and images (73 -> 92)
  - Document structured data implementation details

- ⬜️ **feat:** `optimize images for SEO`
  - Compression and alt tags
  - add contentfull or other netlify integration ideally for SEO
- ⬜️ **fix:** `solve SEO fix list`
### 5️⃣ Jamstack Features feat-jamstack

- ✅ **fix:** `Netlify SSR file handling for SEO`
- ✅ **feat:** `implement Netlify Forms for submissions`
  - Configure form detection
  - integration test with netlify-form-integration.cy.ts
  - n8n docs for lead automations 
- ⬜️ **feat:** `use  Form Functions API to call n8n of pass it with the hook`

- ⬜️ **feat:** `utilize Netlify Edge Functions for dynamic tasks`
  - Explore use cases (e.g., API proxy, personalization)
  - Implement error handling and logging
- ⬜️ **feat:** `securely call 3rd party APIs using environment variables`
  - Store API keys/secrets in Netlify UI/netlify.toml
  - Access secrets safely within Edge Functions or Build Plugins 
- ⬜️ **docs:** `add md context files for llm assistantsfeat`
- ⬜️ **Form-triggered functions** `utilize Netlify for integrations`

### 6️⃣ n8n Integrations
- ⬜️ **feat:** `implement a webhook to trigger emails using n8n`
  - it can automate emails/Slack/Whatsapp/CMSfeat
  - dev n8n setup with ngrokfeat
  - webhook test with postmanfeat
  - docker yml configuration setupfeat

### 7️⃣ DevOps feat-devops
- ⬜️ **docs:** `Log Review Process`
  - log levels: info, warn, error, fatal(out of memory)
  - warn: something is taking longer than usual
  - overly verbose logs?
  - identify important metrics
  - structure logs
  - log4js vs wingston
- ⬜️ **feat:** `Implement logging with log4js or Winston`

<!--
do upwork and log to some blog for devs!
12 log best pratices
https://youtu.be/I2mWnh66Bkg?si=-Kb7e6rt2RyG51TW`
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

-->
