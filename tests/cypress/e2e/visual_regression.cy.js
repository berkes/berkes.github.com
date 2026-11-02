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
  // The Jekyll (production) and Hugo (port) builds render slightly
  // differently - the archive month-grouping fix alone changes the page
  // height. Keep separate baselines per builder until the cutover, and
  // pick one by reading the generator meta tag the served build emits.
  const builderSnapshotsDir = () =>
    cy
      .get('meta[name="generator"]')
      .invoke('attr', 'content')
      .then((content) =>
        content && content.startsWith('Hugo') ? 'cypress/snapshots/hugo' : ''
      );

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
    builderSnapshotsDir().then((customSnapshotsDir) =>
      cy.matchImageSnapshot('homepage', { ...snapshotOptions, customSnapshotsDir })
    );
  });

  it('should match the archive page layout', () => {
    cy.visit('/archive.html');
    fontsReady();
    builderSnapshotsDir().then((customSnapshotsDir) =>
      cy.matchImageSnapshot('archive', { ...snapshotOptions, customSnapshotsDir })
    );
  });

  it('should match the tags page layout', () => {
    cy.visit('/tags.html');
    fontsReady();
    builderSnapshotsDir().then((customSnapshotsDir) =>
      cy.matchImageSnapshot('tags', { ...snapshotOptions, customSnapshotsDir })
    );
  });
});