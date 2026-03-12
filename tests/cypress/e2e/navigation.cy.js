describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have correct linking between pages', () => {
    cy.contains('About').click();
    cy.url().should('include', '/about.html');
    cy.go('back');
    cy.contains('Over (NL)').click();
    cy.url().should('include', '/over.html');
    cy.go('back');
    cy.contains('Articles').click();
    cy.url().should('include', '/archive.html');
    cy.go('back');
    cy.contains('Artikelen (NL)').click();
    cy.url().should('include', '/archief.html');
    cy.go('back');
    cy.contains('Presentations').click();
    cy.url().should('include', '/pres.html');
    cy.go('back');
    cy.contains('Tags').click();
    cy.url().should('include', '/tags.html');
    cy.go('back');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('About');
    cy.contains('Over (NL)');
  });
});