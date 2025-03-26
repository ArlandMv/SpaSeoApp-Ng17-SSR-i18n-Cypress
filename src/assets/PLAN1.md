### **Step-by-Step Commit Plan**

---

### **1️⃣ Project Initialization**

- ✅ `chore: initialize Angular 17 project with SSR setup`

  - Run: `ng new spa-seo-app-ng17-ssr-i18n-cypress --style=scss --routing=true`
  - Install SSR: `ng add @angular/ssr`
  - Modify `server.ts` for SSR support

- ✅ `chore: add i18n support for multiple languages`

  - Setup i18n: `ng add @angular/localize`
  - Configure `angular.json` with language files

- ✅ `chore: add Cypress for end-to-end testing`
  - Install Cypress: `npm install cypress --save-dev`
  - Add Cypress config

---

### **2️⃣ Create Landing Page**

- ✅ `feat: create landing page component with SEO-friendly metadata`

  - Create `LandingComponent`
  - Implement `title`, `meta` service for SEO

- ✅ `feat: add header and navigation bar`

  - Implement navigation for home, services, and contact

- ✅ `feat: design consultation service section`
  - Add booking buttons and pricing details

---

### **3️⃣ Implement SEO Optimization**

- ✅ `feat: implement SSR for improved SEO performance`

  - Ensure SSR renders fully on the server

- ✅ `feat: add structured data for Google indexing`

  - Implement JSON-LD schema for consultation services

- ✅ `feat: add Open Graph and Twitter meta tags`
  - Optimize for social media sharing

---

### **4️⃣ Add Internationalization (i18n)**

- ✅ `feat: add English and Spanish translations`

  - Create `messages.en.json`, `messages.es.json`

- ✅ `feat: implement language switcher in header`

---

### **5️⃣ Cypress Testing & Performance Improvements**

- ✅ `test: add e2e tests for landing page navigation`
- ✅ `test: verify SEO metadata is correctly rendered`
- ✅ `test: ensure i18n translations load correctly`
- ✅ `chore: add Lighthouse performance checks`

---

### **Finalization & Deployment**

- ✅ `fix: improve accessibility and lighthouse score`
- ✅ `docs: add project setup and contribution guide`
- ✅ `chore: deploy SSR app to Vercel/Netlify`

---

## **Commit Example in Practice**

```sh
git commit -m "feat: add structured data for consultation services"
git commit -m "test: add Cypress test for SEO meta validation"
git commit -m "fix: improve SSR hydration for faster initial load"
git commit -m "docs: update README with deployment instructions"
```
<!--
npm install @ngx-translate/core @ngx-translate/http-loader

ways to make the translate available:

1-TranslateModule
2-TranslateModule

1-Add to @NgModule Imports:



2-add provider

importProvider


TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


    ---


    import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot([], routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

-->