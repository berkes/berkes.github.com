describe('Visual Regression Tests', () => {
  // The layout loads webfonts from fonts.googleapis.com. Whether they have
  // been applied at screenshot time is otherwise a race, which changes the
  // rendered page height between runs. Wait for fonts to settle first.
  const fontsReady = () =>
    cy.window().then((win) => win.document.fonts.ready);

  // Allow a sliver of pixel differences for antialiasing noise between
  // render environments (local vs CI). The tags page is ~61000px tall, so
  // even 0.01% covers thousands of pixels of noise while still catching
  // real regressions.
  const snapshotOptions = {
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
  };

  it('should match the homepage layout', () => {
    cy.visit('/');
    fontsReady();
    cy.matchImageSnapshot('homepage', snapshotOptions);
  });

  it('should match the archive page layout', () => {
    cy.visit('/archive.html');
    fontsReady();
    cy.matchImageSnapshot('archive', snapshotOptions);
  });

  it('should match the tags page layout', () => {
    cy.visit('/tags.html');
    fontsReady();
    cy.matchImageSnapshot('tags', snapshotOptions);
  });
});