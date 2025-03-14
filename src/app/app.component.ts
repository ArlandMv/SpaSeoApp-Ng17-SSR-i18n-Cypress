import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <section class="hero">
      <div class="content">
        <h1>Empower Your Business with Tailored Development Solutions</h1>
        <p>
          Specializing in Front-End Landing Pages, Custom Applications, and
          Expert Consulting Services
        </p>
        <button mat-raised-button color="primary" routerLink="/contact">
          Get Started
        </button>
      </div>
    </section>

    <div class="services-grid">
      <mat-card *ngFor="let service of services">
        <mat-icon>{{ service.icon }}</mat-icon>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </mat-card>
    </div>

    <section class="contact-section">
      <mat-card>
        <h2>Contact Me</h2>
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required />
            <mat-error
              *ngIf="
                contactForm.get('name')?.hasError('required') &&
                contactForm.get('name')?.touched
              "
            >
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" required />
            <mat-error
              *ngIf="
                contactForm.get('email')?.hasError('required') &&
                contactForm.get('email')!.touched
              "
            >
              Email is required
            </mat-error>
            <mat-error
              *ngIf="
                contactForm.get('email')?.hasError('email') &&
                contactForm.get('email')!.touched
              "
            >
              Please enter a valid email
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Message</mat-label>
            <textarea matInput formControlName="message" required></textarea>
            <mat-error
              *ngIf="
                contactForm.get('message')?.hasError('required') &&
                contactForm.get('message')?.touched
              "
              >Message is required
            </mat-error>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="contactForm.invalid"
          >
            Send Message
          </button>
        </form>
      </mat-card>
    </section>

    <footer>
      <p>© 2025 Arland Michelena Villegas</p>
    </footer>
  `,
  styles: [
    `
      .hero {
        text-align: center;
        padding: 50px 20px;
        background-color: #f5f5f5;
      }
      .hero .content {
        max-width: 800px;
        margin: 0 auto;
      }
      .services-grid {
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
        background-color: #f8f8f8;
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
export class AppComponent {
  title = 'ArlandMV Projects';
  services = [
    {
      icon: 'web',
      title: 'Front-End Landing Pages for Solopreneurs',
      description:
        'Utilizing Jamstack technologies like Angular to create SEO-friendly landing pages with simple contact forms, tailored for professionals offering three types of services.',
    },
    {
      icon: 'developer_mode',
      title: 'Custom Applications',
      description:
        'Developing full-stack applications using Angular, Spring Boot, databases, and reporting tools to meet your unique business requirements.',
    },
    {
      icon: 'support_agent',
      title: 'Consulting Services',
      description:
        'Providing expert consulting in Front-End, Back-End, and Salesforce Apex development, available at competitive hourly rates.',
    },
  ];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
      // Implement your form submission logic here
    }
  }
}
