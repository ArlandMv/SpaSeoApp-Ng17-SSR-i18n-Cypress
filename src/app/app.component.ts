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
    <section class="hero-section background1" data-cy="hero-section">
      <div class="content" data-cy="hero-content">
        <h1 data-cy="hero-title">{{ 'HERO_TITLE' | translate }}</h1>
        <p data-cy="hero-tagline">
          {{ 'HERO_TAGLINE' | translate }}
        </p>
        <button
          mat-raised-button
          color="primary"
          data-cy="hero-cta-button"
          (click)="onSectionClick('contact-section')"
        >
          {{ 'HERO_CALL_TO_ACTION' | translate }}
        </button>
      </div>
    </section>

    <section id="services-section" class="services-section" data-cy="services-section"> 
      <mat-card *ngFor="let i of [1, 2, 3]"> 
        <mat-icon>
          {{ 'SERVICES_ICON_' + i | translate }}
        </mat-icon> 
        <h3>{{ 'SERVICES_TITLE_' + i | translate }}</h3> 
        <p>{{ 'SERVICES_DESCRIPTION_' + i | translate }}</p> 
      </mat-card> 
    </section>

     <section id="about-section" class="about-section" data-cy="about-section">
        <mat-card>
            <h2 class="about-me-title" >{{ 'ABOUT_ME_SECTION_TITLE' | translate }}</h2>
            <p class="about-me-text">{{ 'ABOUT_ME_SECTION_DESCRIPTION' | translate }}</p>
            <p class="about-me-text">{{ 'ABOUT_ME_SECTION_EXPERTISE' | translate }}</p>
             <div class="why-choose-me-section">
                <h3>{{ 'ABOUT_ME_SECTION_WHY_CHOOSE_ME' | translate }}</h3>
                <ul>
                    <li>{{ 'ABOUT_ME_SECTION_WHY_CHOOSE_ME_POINT_1' | translate }}</li>
                    <li>{{ 'ABOUT_ME_SECTION_WHY_CHOOSE_ME_POINT_2' | translate }}</li>
                    <li>{{ 'ABOUT_ME_SECTION_WHY_CHOOSE_ME_POINT_3' | translate }}</li>
                </ul>
            </div>
        </mat-card>
    </section>

    <section id="technologies-section">
      
    </section>

    <section id="contact-section" class="contact-section background1" data-cy="contact-section">
      <mat-card>
        <h2>{{ 'CONTACT_SECTION_TITLE' | translate }}</h2>
        <form
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
        >
        <!--name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"-->
          <input type="hidden" name="form-name" value="contact">
          <mat-form-field>
            <mat-label>{{ 'CONTACT_LABEL_NAME' | translate }}</mat-label>
            <input matInput formControlName="name" required data-cy="name-input" />
            <mat-error data-cy="name-error"
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
              <input matInput formControlName="email" type="email" required data-cy="email-input"/>
              <mat-error data-cy="email-error"
                *ngIf="
                  contactForm.get('email')?.hasError('required') &&
                  contactForm.get('email')!.touched
                "
              >
                {{ 'CONTACT_ERROR_EMAIL_REQUIRED' | translate }}
              </mat-error>
              <mat-error data-cy="email-invalid-error"
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
            <textarea matInput formControlName="message" required data-cy="message-textarea">
              <!-- add placeholder -->
            </textarea>
            <mat-error data-cy="message-error"
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
            data-cy="contact-submit-button"
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
        scroll-duration: 2s;
        scroll-timing-function: ease-in-out;
        scroll-snap-type: y proximity;
        scroll-timeline: --page-scroll block;
      }
      @keyframes smooth-scroll {
        to { scroll-snap-align: start; }
      }
      body {
        scroll-snap-type: y mandatory;
        animation: smooth-scroll linear;
        animation-timeline: --page-scroll;
        animation-range: 0% 100%;
      }
      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        scroll-margin-top: 50px; /* account for fixed header */
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
       .why-choose-me-section {
        margin-top: 20px;
        
      }

      .why-choose-me-section ul {
        list-style-type: disc;
        margin-left: 20px;
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
      console.log("scrolling");
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    }
  }

  //why
  onSectionClick(sectionId: string) {
    console.log("go to:" + sectionId);
    this.scrollTo(sectionId);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called:', new Date());
  }
}
