describe('Archive Page Tests', () => {
  beforeEach(() => {
    cy.visit('/archive.html');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'Archive');
  });

  it('should display the main heading', () => {
    cy.contains('2024');
  });

  it('should display the "English Articles" section', () => {
    cy.contains('Archive (All English articles)');
  });

  it('should display the "Nederlandse Artikelen" section', () => {
    cy.contains('Archief (Alle Nederlandse artikelen)');
  });

  it('should have the correct language attribute for English content', () => {
    cy.get('html[lang="en"]').should('exist');
  });

  it('should have correct linking between pages', () => {
    cy.get('a[title="Home"]').click();
    cy.url().should('include', '/');
    cy.go('back');
    cy.contains('About').click();
    cy.url().should('include', '/about.html');
    cy.go('back');
    cy.contains('Tags').click();
    cy.url().should('include', '/tags.html');
    cy.go('back');
    cy.contains('Presentations').click();
    cy.url().should('include', '/pres.html');
    cy.go('back');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('2024');
    cy.contains('Archive (All English articles)');
  });
});