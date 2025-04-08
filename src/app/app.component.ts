import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { SeoService } from './core/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

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

    <section
      id="services-section"
      class="services-section"
      data-cy="services-section"
    >
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
        <h2 class="about-me-title">
          {{ 'ABOUT_ME_SECTION_TITLE' | translate }}
        </h2>
        <p class="about-me-text">
          {{ 'ABOUT_ME_SECTION_DESCRIPTION' | translate }}
        </p>
        <p class="about-me-text">
          {{ 'ABOUT_ME_SECTION_EXPERTISE' | translate }}
        </p>
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

    <section id="technologies-section"></section>
    <!--router-outlet></router-outlet-->

    <section
      id="contact-section"
      class="contact-section background1"
      data-cy="contact-section"
    >
      <mat-card>
        <h2>{{ 'CONTACT_SECTION_TITLE' | translate }}</h2>
        <form
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <mat-form-field>
            <mat-label>{{ 'CONTACT_LABEL_NAME' | translate }}</mat-label>
            <input
              matInput
              name="name"
              formControlName="name"
              required
              data-cy="name-input"
            />
            <mat-error
              data-cy="name-error"
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
              <input
                matInput
                name="email"
                formControlName="email"
                type="email"
                required
                data-cy="email-input"
              />
              <mat-error
                data-cy="email-error"
                *ngIf="
                  contactForm.get('email')?.hasError('required') &&
                  contactForm.get('email')!.touched
                "
              >
                {{ 'CONTACT_ERROR_EMAIL_REQUIRED' | translate }}
              </mat-error>
              <mat-error
                data-cy="email-invalid-error"
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
              <mat-select name="service" formControlName="service" required>
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
            <textarea
              matInput
              name="message"
              formControlName="message"
              required
              data-cy="message-textarea"
            >
              <!-- add placeholder -->
            </textarea
            >
            <mat-error
              data-cy="message-error"
              *ngIf="
                contactForm.get('message')?.hasError('required') &&
                contactForm.get('message')?.touched
              "
              >{{ 'CONTACT_ERROR_PROJECT_DESCRIPTION_GUIDANCE' | translate }}
            </mat-error>
          </mat-form-field>

          <!-- enctype="multipart/form-data" makes error-->
          <input type="hidden" name="form-name" value="contact" />
          <div style="display: none;">
            <input
              type="text"
              name="bot-field"
              id="bot-field"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <!-- Example of future file input -->
          <!--  <mat-form-field>
                <label>Attachment</label>
                <input type="file" name="attachment" formControlName="attachment" />
                </mat-form-field>
          -->

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
      <footer>
        <p>©{{ year }} {{ 'FOOTER_COPYRIGHT' | translate }}</p>
      </footer>
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
        to {
          scroll-snap-align: start;
        }
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
        /*Make hero take more space */
        /* min-height: 80vh;*/
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
        /*padding: 40px 20px;  Increased padding */
        /*min-height: 60vh;  Give section some minimum height */
        /*align-items: center;  Center cards vertically if space allows */
      }
      .services-section {
        background: linear-gradient(to bottom, #f5f5f5, #e0d0ff);
      }
      mat-card {
        width: 300px;
        text-align: center;
        padding: 20px;
        /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  Add subtle shadow */
        /*transition: transform 0.3s ease;  Add hover effect */
      }
      /* mat-card:hover {
        transform: translateY(-5px); Lift card on hover 
      }*/
      footer {
        text-align: center;
        padding: 20px;
        background-color: #3f51b5;
        color: white;
        /*margin-top: 40px;  Add space before footer */
      }
      .about-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        background: linear-gradient(to bottom, #e0d0ff, #d0f0ff);
        padding: 20px;
        /* padding: 40px 20px; Increased padding */
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
        color: #3f51b5; /* Use theme color */
      }
      .why-choose-me-section {
        margin-top: 30px; /* Increased spacing */
      }
      .why-choose-me-section h3 {
        color: #3f51b5; /* Use theme color */
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.2rem;
      }
      .why-choose-me-section ul {
        list-style-type: disc;
        margin-left: 20px;
        /* padding-left: 10px; Adjust padding */
      }
      .why-choose-me-section li {
        margin-bottom: 10px; /* Space out list items */
        line-height: 1.6;
      }

      .about-me-text {
        margin-top: 0;
        margin-bottom: 15px; /* Increased spacing */
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
        /*background: linear-gradient(
          to bottom,
          #d0f0ff,
          #f0f0f0
        );  Adjusted gradient */
        min-height: 80vh; /* Ensure it takes significant space */
      }

      .contact-section mat-card {
        width: 100%;
        max-width: 600px;
        padding: 18px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .contact-section form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      .contact-section mat-form-field {
        margin-bottom: 8px;
        width: 100%;
      }

      /* 1. Target the mat-form-field */
      //.contact-section form mat-form-field:nth-child(3) {
      .contact-section mat-form-field:has(textarea[formControlName='message']) {
        flex-grow: 1;
        display: flex;
        min-height: 300px;
        flex-direction: column;
      }

      /* 2. Target the INNER wrapper*/
      .contact-section
        mat-form-field:has(textarea[formControlName='message'])
        .mat-mdc-form-field-flex {
        flex-grow: 1;
        display: flex;
        min-height: 0;
      }

      /* 3. Style the textarea itself */
      .contact-section textarea[matInput] {
        height: 100%;
        box-sizing: border-box; /* Include padding/border */
        min-height: 10lh;
        overflow: auto;
      }
      .two-fields-container {
        display: flex;
        flex-direction: row;
        gap: 8px 8px;
      }
      .two-fields-container mat-form-field {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
      }
      .contact-section button[mat-raised-button] {
        background-color: #3f51b5;
        color: white;
        padding: 8px 24px;
        margin-bottom: 16px;
        border-radius: 4px;
      }

      /* --- Media Query for Small Screens --- */
      @media (max-width: 599px) {
        .contact-section {
          padding: 20px 10px; /* Reduce overall section padding */
        }

        .contact-section mat-card {
          padding: 15px; /* Reduce card padding */
        }

        .contact-section mat-form-field {
          margin-bottom: 10px; /* Reduce vertical spacing */
        }

        .two-fields-container {
          gap: 10px; /* Reduce horizontal gap */
          /* Optional: Stack them if needed */
          /* flex-direction: column; */
        }

        /* Optional: If stacking .two-fields-container */
        /* .two-fields-container mat-form-field {
             margin-bottom: 10px;
         } */
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  private seoService = inject(SeoService);
  contactForm: FormGroup = this.fb.group({});
  router = inject(Router);
  //plataformId: any = inject(PLATFORM_ID) //compare stats

  // '!' for definite assignment assertion or check in onSubmit
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  isBrowser: boolean;
  currentLang: string | undefined;
  year: number | undefined;
  //compare stats-> year: number = new Date().getFullYear();

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
    this.year = new Date().getFullYear(); //compare stats vs in
    this.seoService.updateTags({
      titleKey: 'META_HOME_TITLE',
      descriptionKey: 'META_HOME_DESCRIPTION',
    });
    if (this.isBrowser) {
      this.currentLang = localStorage.getItem('userLang') || 'en';
    }
  }

  private createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // TODO: refactor strings out of ts files, use variables always.
      service: ['First Time Free Consultation Services', Validators.required],
      //service: [this.defaultServiceValue, Validators.required],
      message: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      console.log('ngAfterViewInit called');
    }
  }

  onSubmit() {
    // 1. Build FormData from FormGroup
    const formData = new FormData();
    Object.keys(this.contactForm.value).forEach((key) => {
      formData.append(key, this.contactForm.value[key]);
    });

    // 2. Append the hidden Netlify fields
    formData.append('form-name', 'contact');
    const botField = document.getElementById('bot-field') as HTMLInputElement;
    formData.append('bot-field', botField ? botField.value : '');
    // or formData.set('bot-field', botField?.value ?? '');

    // 3. Log formData for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // 4. Include a relevant comment to explain this part of the code.
    fetch('/', {
      method: 'POST',
      //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then((response) => {
        /*if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `Form submission failed: ${response.status} ${response.statusText} - ${text}`
            );
          });
        }*/
        console.log('Form submission successful', response);
        this.formDirective.resetForm();
        this.translate.get('CONTACT_FORM_SUCCESS').subscribe((msg) => {
          alert(msg);
          // this.router.navigate(['/thank-you']); // TODO: Uncomment when router is implemented
        });
      })
      .catch((error) => {
        console.error('Form submission failed', error);
        this.translate.get('CONTACT_FORM_ERROR').subscribe((msg) => {
          alert(`${msg}: ${error}`);
          console.log('Error handling completed');
        });
      });
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      console.log('scrolling');
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      //refactor to SCSS
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    }
  }

  sendDemoRequest() {
    const dummyData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      service: 'Consulting Services',
      message: 'This is a test message.',
      'form-name': 'contact',
      'bot-field': '',
    };
    try {
      fetch('/hooks/demo-submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dummyData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onSectionClick(sectionId: string) {
    console.log('section click called on + ' + sectionId);
    this.scrollTo(sectionId);
    //this.sendDemoRequest();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called:', new Date());
  }
}
