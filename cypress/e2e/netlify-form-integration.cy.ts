describe('Netlify Form Integration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="contact-section"]').scrollIntoView();
  });

  const testCases = [
    {
      name: 'Valid submission',
      data: {
        name: 'Arland Michelena',
        email: 'arlandmichelenav@gmail.com',
        service: 'First Time Free Consultation Services',
        message: 'I need help with my Angular project'
      },
      expectedStatus: 200,
      isSpam: false
    },
    {
      name: 'Spam submission (short fields)',
      data: {
        name: 'test1',
        email: 'test1@gmail.com',
        service: 'Consulting Services',
        message: 'test',
        'bot-field': 'filled' // Triggers Netlify's spam filter
      },
      expectedStatus: 200,
      isSpam: true
    },
    {
      name: 'Malicious submission',
      data: {
        name: 'JhonDoe',
        email: 'JhonDoe@gmail.com',
        service: 'Custom / Full Stack Service',
        message: '<script>alert("XSS")</script>'
      },
      expectedStatus: 200,
      isSpam: false
    }
  ];

  testCases.forEach((testCase) => {
    it(`should handle ${testCase.name}`, () => {
      cy.intercept('POST', '/', {
        statusCode: testCase.expectedStatus
      }).as('formSubmission');

      // Fill form
      cy.get('[formControlName="name"]').clear().type(testCase.data.name);
      cy.get('[formControlName="email"]').clear().type(testCase.data.email);
      cy.get('mat-select[formControlName="service"]').click();
      cy.get(`mat-option[ng-reflect-value="${testCase.data.service}"]`).click(); //
      cy.get('[formControlName="message"]').clear().type(testCase.data.message);

      // If testing bot field
      if (testCase.data['bot-field']) {
        cy.get('#bot-field').type(testCase.data['bot-field'], { force: true });
      }

      cy.get('[data-cy="contact-submit-button"]').click();

      cy.wait('@formSubmission').then((interception) => {
        // Verify form-name is included
        expect(interception.request.body).to.include('form-name=contact');
        
        // Verify honeypot field
        if (testCase.isSpam) {
          expect(interception.request.body).to.include('bot-field=filled');
        } else {
          expect(interception.request.body).to.include('bot-field=');
        }

        // Verify content is properly encoded
        if (testCase.name.includes('Malicious')) {
          expect(interception.request.body).to.include(
            encodeURIComponent(testCase.data.message)
          );
        }
      });

      // Verify UI response
      if (testCase.expectedStatus === 200) {
        if (testCase.isSpam) {
          // Netlify might still return 200 for spam but filter it
          cy.contains('CONTACT_FORM_SUCCESS').should('not.exist');
        } else {
          cy.contains('CONTACT_FORM_SUCCESS').should('be.visible');
        }
      }
    });
  });

  it('should include all required Netlify fields', () => {
    cy.intercept('POST', '/', {}).as('formSubmission');

    // Fill minimal valid form
    cy.get('[formControlName="name"]').type('Test User');
    cy.get('[formControlName="email"]').type('test@example.com');
    cy.get('[formControlName="message"]').type('Test message');
    cy.get('[data-cy="contact-submit-button"]').click();

    cy.wait('@formSubmission').then((interception) => {
      expect(interception.request.body).to.include('form-name=contact');
      expect(interception.request.body).to.include('bot-field=');
    });
  });
});