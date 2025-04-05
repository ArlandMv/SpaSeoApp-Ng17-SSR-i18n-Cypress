import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <span class="logo">🌐 Software Services</span>
      <span class="spacer"></span>
      <nav>
        <a
          mat-button
          data-cy="services-link"
          (click)="goToSection('services-section')"
        >
          {{ 'NAV_SERVICES' | translate }}
        </a>
        <a
          mat-button
          data-cy="about-link"
          (click)="goToSection('about-section')"
        >
          {{ 'NAV_ABOUT' | translate }}
        </a>
        <!--a mat-button data-cy="qa-link" routerLink="/questions-and-answers">
          Q&amp;A
        </a-->
        <a
          mat-raised-button
          data-cy="contact-link"
          class="nav-link"
          color="accent"
          (click)="goToSection('contact-section')"
        >
          {{ 'NAV_CONTACT' | translate }}
        </a>
      </nav>
      <select
        class="language-select"
        data-cy="language-select"
        name="locale"
        id="locale"
        [value]="currentLang"
        (change)="changeLanguage($event)"
      >
        <option
          *ngFor="let locale of locales"
          [value]="locale.value"
          [attr.data-cy]="'locale-option-' + locale.value"
        >
          {{ locale.name }}
        </option>
      </select>
    </mat-toolbar>
  `,
  styles: [
    `
      .mat-toolbar {
        background-color: #3f51b5;
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        margin-inline: auto;
        max-width: auto;
        position: sticky;
        top: 0;
        z-index: 100;
      }
      .logo {
        font-size: 1.2rem;
        font-weight: bold;
      }
      .spacer {
        flex: 1;
      }

      .language-select {
        background-color: #f0f0f0;
        color: black;
        border: none;
        .nav-link {
          margin-left: 24px;
        }
        border-radius: 4px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
      }

      .language-select option {
        background-color: #f0f0f0;
        border: none;
        border-radius: 4px;
        padding: 5px;
      }
    `,
  ],
})
export class NavComponent implements OnInit {
  @Output() sectionClick = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();
  private isBrowser: boolean;
  currentLang: string | undefined;

  public locales = [
    { value: 'en', name: '🇺🇸 English' },
    { value: 'es', name: '🇨🇱 Español' },
  ];

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.currentLang = localStorage.getItem('userLang') || 'en';
      this.syncLanguageSelectValue(this.currentLang);
      this.translateService.use(this.currentLang);
    }
  }

  goToSection(sectionId: string): void {
    this.sectionClick.emit(sectionId);
  }

  changeLanguage(event: Event) {
    if (this.isBrowser) {
      const changeEvent = event.target as HTMLInputElement;
      this.translateService.use(changeEvent.value);
      localStorage.setItem('userLang', changeEvent.value);
      console.log('Changed to Language:', changeEvent.value);
      const lang = (event.target as HTMLSelectElement).value;
      console.log('lang=' + lang);
      this.currentLang = lang;
      //not necesaary anymore
      this.languageChange.emit(lang);
    }
  }

  private syncLanguageSelectValue(lang: string) {
    const select = this.document.getElementById('locale') as HTMLSelectElement;
    if (select) {
      select.value = lang;
    }
  }
}
