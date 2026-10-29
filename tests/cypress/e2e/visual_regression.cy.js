describe('Visual Regression Tests', () => {
  // The layout loads webfonts from fonts.googleapis.com. Whether they have
  // been applied at screenshot time is otherwise a race, which changes the
  // rendered page height between runs. Wait for fonts to settle first.
  const fontsReady = () =>
    cy.window().then((win) => win.document.fonts.ready);

  it('should match the homepage layout', () => {
    cy.visit('/');
    fontsReady();
    cy.matchImageSnapshot('homepage');
  });

  it('should match the archive page layout', () => {
    cy.visit('/archive.html');
    fontsReady();
    cy.matchImageSnapshot('archive');
  });

  it('should match the tags page layout', () => {
    cy.visit('/tags.html');
    fontsReady();
    cy.matchImageSnapshot('tags');
  });
});