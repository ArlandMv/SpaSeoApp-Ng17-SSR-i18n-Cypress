describe('Internationalization (i18n) Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('English Language Tests', () => {
    it('should properly switch to English', () => {
      // Prepare
      cy.get('[data-cy="language-select"]').select('es');
      cy.get('[data-cy="language-select"]').should('have.value', 'es');
      cy.get('[data-cy="locale-option-es"]').should('be.selected');
      cy.screenshot('before-english-switch');
      // Act
      cy.get('[data-cy="language-select"]').select('en');
      // Assert
      cy.get('[data-cy="language-select"]').should('have.value', 'en');
      cy.get('[data-cy="locale-option-en"]').should('be.selected');
      cy.screenshot('after-english-switch');
    });

    it('should display English navigation text', () => {
      cy.get('[data-cy="services-link"]').should('contain', 'services');
      cy.get('[data-cy="about-link"]').should('contain', 'about');
      cy.get('[data-cy="contact-link"]').should('contain', 'contact');
    });
  });

  describe('Spanish Language Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="language-select"]').select('en');
    });

    it('should properly switch to Spanish', () => {
      cy.screenshot('before-spanish-switch');
      cy.get('[data-cy="language-select"]').select('es');
      cy.get('[data-cy="language-select"]').should('have.value', 'es');
      cy.get('[data-cy="locale-option-es"]').should('be.selected');
      cy.screenshot('after-spanish-switch');
    });

    it('should display Spanish navigation text', () => {
      cy.get('[data-cy="language-select"]').select('es');
      cy.get('[data-cy="services-link"]').should('contain', 'servicios');
      cy.get('[data-cy="about-link"]').should('contain', 'sobre nosotros');
      cy.get('[data-cy="contact-link"]').should('contain', 'contacto');
    });
  });

  describe('Language Persistance Tests', () => {
    it('should persist Spanish on reload', () => {
      cy.get('[data-cy="language-select"]').select('es');
      cy.screenshot('spanish-before-reload');
      cy.reload();
      cy.get('[data-cy="language-select"]').should('have.value', 'es');
      cy.screenshot('spanish-after-reload');
    });

    it('should persist English on reload', () => {
      cy.get('[data-cy="language-select"]').select('es');
      cy.get('[data-cy="language-select"]').select('en');
      cy.reload();
      cy.get('[data-cy="language-select"]').should('have.value', 'en');
    });
  });
});