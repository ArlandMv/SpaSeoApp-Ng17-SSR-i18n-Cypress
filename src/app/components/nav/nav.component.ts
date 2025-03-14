import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <span class="logo">🌐 1-on-1 Consultations</span>
      <span class="spacer"></span>
      <nav>
        <a mat-button routerLink="/">Home</a>
        <a mat-button routerLink="/services">Services</a>
        <a mat-button routerLink="/contact">Contact</a>
      </nav>
      <button mat-button (click)="changeLanguage('en')">EN</button>
      <button mat-button (click)="changeLanguage('es')">ES</button>
    </mat-toolbar>
  `,
  styles: [`
    .mat-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
    }
    .logo {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .spacer {
      flex: 1;
    }
    nav a {
      margin-right: 12px;
      font-weight: 500;
    }
  `]
})
export class NavComponent {
  public locales = [{value: "es", name:"Español"}, {value: "en", name:"English"}]
  languages = ['en', 'es']; // Example for i18n
  selectedLanguage = 'en';

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    console.log(`Language changed to: ${lang}`);
    // Implement actual i18n switching logic
  }
}
