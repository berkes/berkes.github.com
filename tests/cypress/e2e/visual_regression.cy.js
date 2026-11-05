// The layout loads webfonts from fonts.googleapis.com. Whether they have
// been applied at screenshot time is otherwise a race, which changes the
// rendered page height between runs. Wait for fonts to settle first.
const fontsReady = () => cy.window().then((win) => win.document.fonts.ready);

// Allow a sliver of pixel differences for antialiasing noise between
// render environments (local vs CI). The tags page is ~61000px tall, so
// even 0.01% covers thousands of pixels of noise while still catching
// real regressions.
const snapshotOptions = {
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
    // cy.screenshot() is capped by the global responseTimeout (5s, to
    // fail stalled commands fast), but these pages are very tall and
    // take tens of seconds to capture in CI - more on a slow local
    // machine. Give the screenshot itself the headroom it needs,
    // without slowing down every other command.
    timeout: 120000,
  };

  // The tags page is absurdly tall (~61000px desktop, ~95000px mobile):
  // a ~36M-pixel bitmap that is slow to capture, slow to diff, and can
  // OOM a local Chrome. Clip it to the first 20000px - the header,
  // intro and the bulk of the cloud. A layout regression shows up in
  // the first screens; the remainder of the list is structurally
  // identical.
  const snapshotOptionsTall = {
    ...snapshotOptions,
    clip: { x: 0, y: 0, width: 1000, height: 20000 },
  };
  const snapshotOptionsTallMobile = {
    ...snapshotOptions,
    clip: { x: 0, y: 0, width: 375, height: 20000 },
  };

describe('Visual Regression Tests', () => {

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
    cy.matchImageSnapshot('tags', snapshotOptionsTall);
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
    cy.matchImageSnapshot('tags-mobile', snapshotOptionsTallMobile);
  });

  it('should match a post page layout', () => {
    cy.visit('/2022/12/23/fediverse-never-forgets/');
    fontsReady();
    cy.matchImageSnapshot('post-mobile', snapshotOptions);
  });
});
