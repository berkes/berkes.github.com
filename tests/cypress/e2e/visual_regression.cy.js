describe('Visual Regression Tests', () => {
  it('should match the homepage layout', () => {
    cy.visit('/');
    cy.matchImageSnapshot('homepage');
  });

  it('should match the archive page layout', () => {
    cy.visit('/archive.html');
    cy.matchImageSnapshot('archive');
  });

  it('should match the tags page layout', () => {
    cy.visit('/tags.html');
    cy.matchImageSnapshot('tags');
  });
});