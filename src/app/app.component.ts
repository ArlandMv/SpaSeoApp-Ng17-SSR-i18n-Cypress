import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
   inject, PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
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

    <div class="services-section">
      <mat-card *ngFor="let service of translatedServices">
        <mat-icon>{{ service.icon }}</mat-icon>
        <h3>{{ service.title | translate }}</h3>
        <p>{{ service.description | translate }}</p>
      </mat-card>
    </div>

    <section class="contact-section background1">
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

          <mat-form-field>
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

          <mat-form-field>
            <mat-label>{{
              'CONTACT_LABEL_PROJECT_DESCRIPTION' | translate
            }}</mat-label>
            <input matInput formControlName="message" type="text" required />
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
      .contact-section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
      }
      .contact-section mat-card {
        width: 100%;
        max-width: 600px;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .contact-section mat-form-field {
        width: 100%;
        margin-bottom: 20px;
      }
      .contact-section button[mat-raised-button] {
        background-color: #3f51b5;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  contactForm: FormGroup = this.fb.group({});
  translatedServices: Service[] = [];

  isBrowser: boolean;
  year: number | undefined;
  serviceOptions = [
    {
      value: 'Front-End Landing Page Service',
      translationKey: 'SERVICES_SERVICE_1_TITLE',
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

  ngOnDestroy(): void {
    console.log('ngOnDestroy called:', new Date());
  }
}
