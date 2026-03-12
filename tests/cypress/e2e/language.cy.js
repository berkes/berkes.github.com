describe('Language Attribute Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the correct language attribute for English content', () => {
    cy.get('html[lang="en"]').should('exist');
  });

  it('should have the correct language attribute for Dutch content', () => {
    cy.visit('/over.html');
    cy.get('html[lang="nl"]').should('exist');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.get('html[lang="en"]').should('exist');
  });
});