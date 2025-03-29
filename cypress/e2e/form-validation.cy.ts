describe('Contact Form Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="contact-link"]').click();
    cy.get('[data-cy="contact-section"]').should('be.visible');
  });

  // Field validation tests
  it('should validate required fields with mat-error', () => {
    // Test initial untouched state
    cy.get('mat-error').should('not.exist');
    
    // Simulate user interaction with fields
    cy.get('[formControlName="name"]')
      .focus()
      .blur();
    cy.get('[formControlName="email"]')
      .focus()
      .blur();
    cy.get('[formControlName="message"]')
      .focus()
      .blur();

      // Verify error appears after being touched
    cy.contains('Name is required').should('be.visible'); 

    cy.get('mat-error').should('exist');
    cy.get('mat-error')
      .should('contain', 'Name is required')
      .and('contain', 'Email is required');
    cy.get('[data-cy="message-error"]').should('exist');
    
    // Take organized screenshot only if needed
    if (Cypress.currentTest.title.includes('validate required fields')) {
      cy.screenshot(`form-validation/${Cypress.currentTest.title}-errors`, { overwrite: true });
    }
  });

  it('Form submission test', () => {
    cy.get('[data-cy="contact-submit-button"]')
      .should('be.disabled')
    cy.get('[data-cy="contact-submit-button"]').should('exist') 
    
    cy.get('[formControlName="name"]').type('Test Name');
    cy.get('[formControlName="email"]').type('test@example.com');
    cy.get('[formControlName="message"]').type('Test message');
    
    // cy.intercept('POST', '/api/contact', { statusCode: 200 }).as('submitForm'); 
    cy.get('[data-cy="contact-submit-button"]')
      .should('not.be.disabled')
      .click();

    //cy.wait('@submitForm');
  });

  
  it('should validate email format', () => {
    const testCases = [
      { input: 'plain', shouldShowError: true },
      { input: 'test@', shouldShowError: true },
      { input: 'test@example.', shouldShowError: true },
      { input: 'valid@example.com', shouldShowError: false }
    ];

    testCases.forEach(({ input, shouldShowError }) => {
      // Action
      cy.get('[data-cy="email-input"]')
        .clear()
        .type(input)
        .blur();

      // Assertions
      if (shouldShowError) {
        cy.get('[data-cy="email-invalid-error"]')
          .should('exist')
          .and('be.visible')
          .and('contain', 'Please enter a valid email');
        cy.get('[data-cy="email-input"]').should('have.class', 'ng-invalid');
      } else {
        cy.get('[data-cy="email-invalid-error"]')
          .should('not.exist');
        cy.get('[data-cy="email-input"]').should('have.class', 'ng-valid');
      }
    });

  });

  
  // There is always a service selected for better UX
  it('should require service selection', () => {
    cy.get('mat-select[formControlName="service"]')
      .click()
      .get('mat-option')
      .first()
      .click();
    
    cy.get('[formControlName="service"]').should('not.have.class', 'mat-invalid');
  });

  // Form submission test example
  /*
  it('should submit valid form', () => {
    // Fill valid form
    cy.get('[formControlName="name"]').type('Test User');
    cy.get('[formControlName="email"]').type('test@example.com');
    cy.get('[formControlName="message"]').type('Test message');
    
    // Mock successful submission
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true }
    }).as('submitForm');

    cy.get('[data-cy="contact-submit-button"]').click();
    cy.wait('@submitForm').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: 'Test User',
        email: 'test@example.com',
        service: 'First Time Free Consultation Services',
        message: 'Test message'
      });
      
      // Verify success feedback
      cy.contains('Message sent successfully').should('be.visible');
    });
  });
  */
});