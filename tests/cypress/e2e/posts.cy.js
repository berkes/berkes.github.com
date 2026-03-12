describe('Blog Posts Tests', () => {
  beforeEach(() => {
    cy.visit('/archive.html');
  });

  it('should display blog posts', () => {
    cy.contains('August 10, 2024');
  });

  it('should display the correct content in blog posts', () => {
    cy.contains('August 10, 2024');
    cy.contains('Ignore Rust\'s target build directories in Deja-Dup');
  });

  it('should have the correct language attribute for English posts', () => {
    cy.get('html[lang="en"]').should('exist');
  });

  it('should have the correct language attribute for Dutch posts', () => {
    cy.visit('/archief.html');
    cy.get('html[lang="nl"]').should('exist');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('August 10, 2024');
  });
});