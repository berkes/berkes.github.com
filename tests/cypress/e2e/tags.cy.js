describe('Tags Page Tests', () => {
  beforeEach(() => {
    cy.visit('/tags.html');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'Tags');
  });

  it('should display the main heading', () => {
    cy.contains('programming');
  });

  it('should display the "Tags" section', () => {
    cy.contains('Tags');
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
    cy.contains('Presentations').click();
    cy.url().should('include', '/pres.html');
    cy.go('back');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('programming');
    cy.contains('Tags');
  });
});