describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'Bèr ‘berkes’ Kessels');
  });

  it('should display the main heading', () => {
    cy.contains('Bèr ‘berkes’ Kessels');
  });

  it('should display the "About Bèr Kessels" section', () => {
    cy.contains('About Bèr Kessels');
  });

  it('should display the "Over Bèr Kessels" section', () => {
    cy.contains('Over Bèr Kessels');
  });

  it('should display the "Articles" section', () => {
    cy.contains('Articles');
  });

  it('should display the "Artikelen" section', () => {
    cy.contains('Artikelen');
  });

  it('should display the "Presentations" section', () => {
    cy.contains('Presentations');
  });

  it('should display the "Presentaties" section', () => {
    cy.contains('Presentations');
  });

  it('should display the "Tags" section', () => {
    cy.contains('Tags');
  });

  it('should display the "RSS" link', () => {
    cy.contains('RSS');
  });

  it('should display the "Mastodon" link', () => {
    cy.contains('Mastodon');
  });

  it('should have the correct language attribute for English content', () => {
    cy.get('html[lang="en"]').should('exist');
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
    cy.contains('Bèr ‘berkes’ Kessels');
    cy.contains('About Bèr Kessels');
    cy.contains('Over Bèr Kessels');
  });
});