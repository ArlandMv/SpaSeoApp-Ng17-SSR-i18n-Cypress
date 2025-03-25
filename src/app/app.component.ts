import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

export interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  template: `
    <app-nav (sectionClick)="onSectionClick($event)"></app-nav>
    <section class="hero-section background1">
      <div class="content">
        <h1>{{ 'HERO_TITLE' | translate }}</h1>
        <p>
          {{ 'HERO_TAGLINE' | translate }}
        </p>
        <button mat-raised-button color="primary">
          {{ 'HERO_CALL_TO_ACTION' | translate }}
        </button>
      </div>
    </section>

    <div id="services-section" class="services-section">
      <mat-card *ngFor="let service of translatedServices">
        <mat-icon>{{ service.icon }}</mat-icon>
        <h3>{{ service.title | translate }}</h3>
        <p>{{ service.description | translate }}</p>
      </mat-card>
    </div>

    <div id="about-section" class="about-section">
      <mat-card>
        <h2 class="about-me-title">About Me</h2>
        <p class="about-me-text">
          I am a passionate full-stack developer with experience in creating web
          applications. I offer several services like custom development,
          landing pages, and consulting.
        </p>
      </mat-card>
    </div>

    <section id="contact-section" class="contact-section background1">
      <mat-card>
        <h2>{{ 'CONTACT_SECTION_TITLE' | translate }}</h2>
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>{{ 'CONTACT_LABEL_NAME' | translate }}</mat-label>
            <input matInput formControlName="name" required />
            <mat-error
              *ngIf="
                contactForm.get('name')?.hasError('required') &&
                contactForm.get('name')?.touched
              "
            >
              {{ 'CONTACT_ERROR_NAME_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>

          <div class="two-fields-container">
            <mat-form-field>
              <mat-label>{{ 'CONTACT_LABEL_EMAIL' | translate }}</mat-label>
              <input matInput formControlName="email" type="email" required />
              <mat-error
                *ngIf="
                  contactForm.get('email')?.hasError('required') &&
                  contactForm.get('email')!.touched
                "
              >
                {{ 'CONTACT_ERROR_EMAIL_REQUIRED' | translate }}
              </mat-error>
              <mat-error
                *ngIf="
                  contactForm.get('email')?.hasError('email') &&
                  contactForm.get('email')!.touched
                "
              >
                {{ 'CONTACT_ERROR_EMAIL_INVALID' | translate }}
              </mat-error>
            </mat-form-field>

            <mat-form-field class="half-width">
              <mat-label>{{ 'CONTACT_LABEL_SERVICE' | translate }}</mat-label>
              <mat-select formControlName="service" required>
                <mat-option
                  *ngFor="let option of serviceOptions"
                  [value]="option.value"
                >
                  {{ option.translationKey | translate }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <mat-form-field>
            <mat-label>{{
              'CONTACT_LABEL_PROJECT_DESCRIPTION' | translate
            }}</mat-label>
            <textarea matInput formControlName="message" required></textarea>
            <mat-error
              *ngIf="
                contactForm.get('message')?.hasError('required') &&
                contactForm.get('message')?.touched
              "
              >{{ 'CONTACT_ERROR_PROJECT_DESCRIPTION_GUIDANCE' | translate }}
            </mat-error>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="contactForm.invalid"
          >
            {{ 'CONTACT_FORM_SUBMIT_BUTTON' | translate }}
          </button>
        </form>
      </mat-card>
    </section>

    <footer>
      <p>©{{ year }} {{ 'FOOTER_COPYRIGHT' | translate }}</p>
    </footer>
  `,
  styles: [
    `
      html {
        scroll-behavior: smooth;
      }
      .background1 {
        background-color: #f5f5f5;
      }
      .hero-section {
        text-align: center;
        padding: 50px 20px;
      }
      .hero .content {
        max-width: 800px;
        margin: 0 auto;
      }
      .services-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 20px;
      }
      .services-section {
        background: linear-gradient(to bottom, #f5f5f5, #e0d0ff);
      }
      mat-card {
        width: 300px;
        text-align: center;
        padding: 20px;
      }
      footer {
        text-align: center;
        padding: 20px;
        background-color: #3f51b5;
        color: white;
      }
      .about-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        background: linear-gradient(to bottom, #e0d0ff, #d0f0ff);
        padding: 20px;
      }
      .about-section mat-card {
        width: 100%;
        max-width: 800px;
        padding: 30px;
      }
      .about-me-title {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 2rem;
      }
      .about-me-text {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
      }
      .contact-section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        background: linear-gradient(to bottom, #d0f0ff, #3f51b5);
      }
      .contact-section mat-card {
        width: 100%;
        max-width: 600px;
        padding: 30px;
        border-radius: 8px;
      }
      .contact-section form {
        display: flex;
        flex-direction: column;
      }
      .contact-section mat-form-field {
        margin-bottom: 20px;
      }
      .contact-section form mat-form-field:nth-child(3) {
        min-height: 300px;
        max-height: 600px;
        overflow: auto;
      }

      .two-fields-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
      .two-fields-container mat-form-field {
        flex-grow: 1;
        margin-bottom: 20px;
      }
      .contact-section button[mat-raised-button] {
        background-color: #3f51b5;
        color: white;
        padding: 10px 20px;
        margin-bottom: 20px;
        border-radius: 4px;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  contactForm: FormGroup = this.fb.group({});
  router = inject(Router);
  translatedServices: Service[] = [];

  isBrowser: boolean;
  year: number | undefined;
  serviceOptions = [
    {
      value: 'Front-End Landing Page Service',
      translationKey: 'CONTACT_SERVICE_OPTION_1',
    },
    {
      value: 'Custom / Full Stack Service',
      translationKey: 'CONTACT_SERVICE_OPTION_2',
    },
    {
      value: 'Consulting Services',
      translationKey: 'CONTACT_SERVICE_OPTION_3',
    },
    {
      value: 'First Time Free Consultation Services',
      translationKey: 'CONTACT_SERVICE_OPTION_4',
    },
  ];

  constructor() {
    const platform = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platform);
    this.createContactForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.year = new Date().getFullYear();
    this.translate.get(['services']).subscribe((translation) => {
      this.translatedServices = translation['services'];
    });
  }

  private createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['First Time Free Consultation Services', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      console.log('ngAfterViewInit called');
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
      // Implement form submission logic here
    }
  }
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  //why
  onSectionClick(sectionId: string) {
    console.log(sectionId);
    this.scrollTo(sectionId);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called:', new Date());
  }
}
