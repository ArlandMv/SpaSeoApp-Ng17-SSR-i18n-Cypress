import { Component, EventEmitter, Output, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <span class="logo">🌐 Software Services</span>
      <span class="spacer"></span>
            <nav>
        <a mat-button (click)="goToSection('services-section')">services</a>
        <a mat-button (click)="goToSection('about-section')">about</a>
        <a
          mat-raised-button
          class="nav-link"
          color="accent"
          (click)="goToSection('contact-section')"
          >contact</a>
        
      </nav>
      <select
        class="language-select"
        name="locale"
        id="locale"
        (change)="changeLanguage($event)"
      >
        <option *ngFor="let locale of locales" [value]="locale.value">
          {{ locale.name }}
        </option>
      </select>

      <!--button mat-button (click)="changeLanguage('en')">EN</button>
      <button mat-button (click)="changeLanguage('es')">ES</button-->
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
        max-width: 1200px;
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
export class NavComponent {
  @Output() sectionClick = new EventEmitter<string>();

  public locales = [
    { value: 'en', name: '🇺🇸 English' },
    { value: 'es', name: '🇨🇱 Español' },
  ];

  constructor(private translateService: TranslateService) {}

  goToSection(sectionId: string): void {
    this.sectionClick.emit(sectionId);
  }

  
    changeLanguage(event: Event) {
    const changeEvent = event.target as HTMLInputElement;
    this.translateService.use(changeEvent.value);

    console.log('Changed to Language:', changeEvent.value);
  }
}
