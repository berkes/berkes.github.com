describe('About Page Tests', () => {
  beforeEach(() => {
    cy.visit('/about.html');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'About');
  });

  it('should display the main heading', () => {
    cy.contains('Bèr ‘berkes’ Kessels');
  });

  it('should display the "About Bèr Kessels" section', () => {
    cy.contains('I am Bèr Kessels');
  });

  it('should have the correct language attribute for English content', () => {
    cy.get('html[lang="en"]').should('exist');
  });

  it('should have correct linking between pages', () => {
    cy.get('a[title="Home"]').click();
    cy.url().should('include', '/');
    cy.go('back');
    cy.contains('Articles').click();
    cy.url().should('include', '/archive.html');
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
    cy.contains('Bèr ‘berkes’ Kessels');
    cy.contains('I am Bèr Kessels');
  });
});