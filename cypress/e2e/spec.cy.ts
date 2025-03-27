describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the about-section when the About-link is clicked', () => {
    cy.get('[data-cy="about-link"]').click();
    //cy.url().should('include', '/services'); // it's a SPA
    cy.get('[data-cy="about-section"]').should('be.visible');
  });

  it('should navigate to the services-section when the services-link is clicked', () => {
    cy.get('[data-cy="services-link"]').click();
    //cy.url().should('include', '/services'); // it's a SPA
    cy.get('[data-cy="services-section"]').should('be.visible');
  });

  it('should navigate to the contact section when the "Contact" link is clicked', () => {
    // Scroll to top first for consistent starting point
    cy.window().then((win) => win.scrollTo(0, 0));
    
    // Get initial position
    cy.get('[data-cy="contact-section"]').then(($el) => {
      const initialOffset = $el[0].getBoundingClientRect().top;
      
      // Click the contact link
      cy.get('[data-cy="contact-link"]').click();
      
      // Wait for scroll to complete
      cy.wait(500);
      
      // Verify scroll position
      cy.get('[data-cy="contact-section"]')
        .should('be.visible')
        .then(($el) => {
          const newOffset = $el[0].getBoundingClientRect().top;
          const viewportHeight = Cypress.config('viewportHeight');
          const sectionHeight = $el[0].offsetHeight;
          
          // Check scroll position metrics
          cy.log(`Scroll metrics - Initial: ${initialOffset}px, New: ${newOffset}px, Viewport: ${viewportHeight}px, Section: ${sectionHeight}px`);
          
          // Verify section is properly visible
          expect(newOffset).to.be.lessThan(viewportHeight * 0.8, 'Section should be in upper part of viewport');
          expect(newOffset + sectionHeight).to.be.greaterThan(100, 'Bottom of section should be visible');
          expect(newOffset).to.be.lessThan(initialOffset, 'Should have scrolled downward');
        });
    });
  });

  it('should navigate to contact section when hero CTA button is clicked', () => {
    // Scroll to top first to ensure consistent starting point
    cy.window().then((win) => win.scrollTo(0, 0));
    
    // Get initial position of contact section
    cy.get('[data-cy="contact-section"]').then(($el) => {
      const initialOffset = $el[0].getBoundingClientRect().top;
      
      // Click the CTA button
      cy.get('[data-cy="hero-cta-button"]').click();
      
      // Add small delay for scroll to complete
      cy.wait(500);
      
      // Verify section is visible and scrolled into view
      cy.get('[data-cy="contact-section"]')
        .should('be.visible')
        .then(($el) => {
          const newOffset = $el[0].getBoundingClientRect().top;
          const viewportHeight = Cypress.config('viewportHeight');
          
          // Check if section is in viewport (top is above fold, bottom is visible)
          expect(newOffset).to.be.lessThan(viewportHeight);
          expect(newOffset + $el[0].offsetHeight).to.be.greaterThan(0);
          
          // Verify we actually scrolled down
          expect(newOffset).to.be.lessThan(initialOffset);
        });
    });
  });

  
});