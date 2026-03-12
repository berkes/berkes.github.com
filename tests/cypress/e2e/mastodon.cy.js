describe('Mastodon Link Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the Mastodon link', () => {
    cy.contains('Mastodon').should('exist');
  });

  it('should have the correct rel attribute on the Mastodon link', () => {
    cy.get('a[href*="mastodon.nl"]').should('have.attr', 'rel', 'me');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('Mastodon').should('exist');
  });
});