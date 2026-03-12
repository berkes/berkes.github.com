describe('Presentations Page Tests', () => {
  beforeEach(() => {
    cy.visit('/pres.html');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'Presentations');
  });

  it('should display the main heading', () => {
    cy.contains('Presentations');
  });

  it('should display the "Presentations" section', () => {
    cy.contains('Presentations');
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
    cy.contains('Articles').click();
    cy.url().should('include', '/archive.html');
    cy.go('back');
    cy.contains('Tags').click();
    cy.url().should('include', '/tags.html');
    cy.go('back');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('Presentations');
  });
});