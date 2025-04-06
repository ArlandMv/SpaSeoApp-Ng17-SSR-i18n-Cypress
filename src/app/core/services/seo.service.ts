import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private translate: TranslateService
  ) {}

  updateTags(config: {
    titleKey: string;
    descriptionKey: string;
    params?: Record<string, string>;
  }) {
    const { titleKey, descriptionKey, params = {} } = config;

    // Update title
    this.translate.get(titleKey, params).subscribe((title) => {
      this.title.setTitle(title);
    });

    // Update description
    this.translate.get(descriptionKey, params).subscribe((description) => {
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
      // For Open Graph/social sharing
      this.meta.updateTag({
        property: 'og:description',
        content: description,
      });
    });
  }

  // Fallback to static defaults
  setDefaultTags() {
    this.title.setTitle('SpaSeoApp - Default Title');
    this.meta.updateTag({
      name: 'description',
      content:
        'High-performance landing pages for solopreneurs - Built with Jamstack for faster load times and better SEO results description for your Angular application',
    });
  }
}
