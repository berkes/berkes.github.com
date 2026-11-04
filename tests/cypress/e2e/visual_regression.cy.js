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
    // cy.screenshot() is capped by the global responseTimeout (5s, to
    // fail stalled commands fast), but these pages are up to ~61000px
    // tall and take ~23s to capture in CI. Give the screenshot itself
    // the headroom it needs, without slowing down every other command.
    timeout: 60000,
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
// Mobile view (single breakpoint, <=767px): separate snapshot set,
// same pages, at a phone viewport. Regenerated together with the
// desktop ones via `just update-visual-diffs`.
describe('Visual Regression Tests (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
  });

  it('should match the homepage layout', () => {
    cy.visit('/');
    fontsReady();
    cy.matchImageSnapshot('homepage-mobile', snapshotOptions);
  });

  it('should match the archive page layout', () => {
    cy.visit('/archive.html');
    fontsReady();
    cy.matchImageSnapshot('archive-mobile', snapshotOptions);
  });

  it('should match the tags page layout', () => {
    cy.visit('/tags.html');
    fontsReady();
    cy.matchImageSnapshot('tags-mobile', snapshotOptions);
  });

  it('should match a post page layout', () => {
    cy.visit('/2022/12/23/fediverse-never-forgets/');
    fontsReady();
    cy.matchImageSnapshot('post-mobile', snapshotOptions);
  });
});
