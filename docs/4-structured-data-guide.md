# Structured Data, JSON-LD, and Schema for Consultation Services

This guide explains structured data, JSON-LD, and how to apply schema markup for consultation services, particularly within an Angular SSR context.

## 1. What is Structured Data?

Structured data is a standardized format for providing explicit information about a page's content to search engines like Google. Instead of just parsing text, it allows you to clearly define entities like services, organizations, people, prices, etc.

**Importance for Google Indexing (SEO):**

- **Enhanced Understanding:** Helps search engines grasp the context and meaning of your content more accurately.
- **Rich Results:** Enables special search result features (rich snippets) like star ratings, FAQs, pricing, etc., potentially increasing visibility and click-through rates.
- **Knowledge Graph:** Can contribute information to Google's Knowledge Graph, improving brand presence.

## 2. What is JSON-LD?

JSON-LD (JavaScript Object Notation for Linked Data) is Google's recommended format for implementing structured data.

- **Format:** Uses standard JSON syntax.
- **Implementation:** Embedded within a `<script type="application/ld+json">` tag, usually in the `<head>` or `<body>` of your HTML.
- **Advantages:** Keeps structured data separate from user-visible HTML, making it cleaner and often easier to manage, especially with JavaScript frameworks.

## 3. JSON-LD Schema for Consultation Services

Schema.org provides the vocabulary. Relevant types include:

- **`Service`**: General type for any service.
- **`ProfessionalService`**: More specific for professional offerings (consulting, legal, medical). Often suitable for consultations.

**Key Properties:**

- `@context`: Always `"https://schema.org"`.
- `@type`: `"ProfessionalService"` or `"Service"`.
- `name`: The specific service name (e.g., "SEO Audit Consultation").
- `description`: A concise service description.
- `provider`: Who offers the service (`Organization` or `Person`).
  - `@type`: `"Organization"` or `"Person"`
  - `name`: Company or individual name.
  - `url`: (Recommended) Main website URL.
  - `logo`: (Optional) URL of the organization's logo.
- `serviceType`: Specific category (e.g., "Digital Marketing Consulting").
- `areaServed`: Geographic area (`Place` like City/Country, or `"Global"`).
- `url`: (Highly recommended) URL of the specific service page.
- `offers`: (Optional) For pricing details.
  - `@type`: `"Offer"`
  - `price`: Price amount (e.g., `"500"`).
  - `priceCurrency`: Currency code (e.g., `"USD"`).

## 4. Example JSON-LD:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SEO Audit Consultation",
    "description": "Comprehensive SEO audit and consultation to identify opportunities for improving your website's search engine ranking and organic traffic.",
    "url": "https://yourdomain.com/services/seo-audit",
    "serviceType": "Digital Marketing Consulting",
    "provider": {
      "@type": "Organization",
      "name": "Your Consulting Firm",
      "url": "https://yourdomain.com/"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "offers": {
      "@type": "Offer",
      "price": "500",
      "priceCurrency": "USD"
    }
  }
</script>
```

## 5. Adding JSON-LD to an Angular SSR App

For SSR, it's crucial the structured data is in the initial HTML response.

- **Server-Side Injection (Recommended for SEO):**

  - Define the JSON-LD object in your component's TypeScript.
  - Use Angular Universal features or your specific SSR setup's mechanisms to dynamically create the `<script type="application/ld+json">` tag and inject the stringified JSON into the `<head>` of the HTML _on the server_ before sending the response.

- **Client-Side Injection (Less Ideal for SSR SEO):**

  - You _could_ use Angular's `Renderer2` or `DOCUMENT` injection token to add the script tag client-side (`ngOnInit`, `ngAfterViewInit`). However, crawlers might not execute this JavaScript, potentially missing the structured data.

  _Example using `DOCUMENT` (client-side, adapt for server-side injection):_

  ```typescript
  import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
  import { DOCUMENT } from "@angular/common";

  @Component({
    selector: "app-consultation-page",
    template: `<!-- Your component HTML -->`,
  })
  export class ConsultationPageComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

    ngOnInit(): void {
      this.injectJsonLd();
    }

    injectJsonLd(): void {
      const script = this.renderer.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Angular Performance Optimization Consultation",
        // ... other properties
      });
      // Adapt this part for server-side rendering logic
      this.renderer.appendChild(this.document.head, script);
    }
  }
  ```

## 6. Validation Tools

- **Google Rich Results Test:** [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- **Schema Markup Validator:** [https://validator.schema.org/](https://validator.schema.org/)
