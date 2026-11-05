// Dark mode (#169): follows prefers-color-scheme, pure CSS, no toggle.
// Only the behavior that DIFFERS between dark and light is asserted
// here; light mode is covered by the default-viewport specs.
//
// Chrome's preference is emulated via the DevTools protocol
// (Emulation.setEmulatedMedia) - the same mechanism the OS setting
// drives in a real browser.

const emulateColorScheme = (scheme) =>
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setEmulatedMedia',
    params: {
      features: [{ name: 'prefers-color-scheme', value: scheme }],
    },
  });

describe('Dark mode', () => {
  after(() => {
    // Leave the browser as we found it for any spec that runs after us.
    emulateColorScheme('light');
  });

  it('renders the dark palette when the system prefers dark', () => {
    emulateColorScheme('dark');
    cy.visit('/');
    cy.window().then((win) => {
      const bg = win.getComputedStyle(win.document.body).backgroundColor;
      expect(bg).to.equal('rgb(24, 24, 24)');
      const fg = win.getComputedStyle(win.document.body).color;
      expect(fg).to.equal('rgb(201, 199, 199)');
    });
  });

  it('swaps the logo to its light-on-dark variant', () => {
    emulateColorScheme('dark');
    cy.visit('/');
    // CSS swaps the rendered image via content: url(); the src
    // attribute keeps the light original. Assert on the computed
    // content - the mechanism that drives the swap.
    cy.get('header img[alt="Logo"]').then(($img) => {
      const content = getComputedStyle($img[0]).content;
      expect(content).to.include('logo-dark.png');
    });
  });

  it('keeps the light logo and palette when the system prefers light', () => {
    emulateColorScheme('light');
    cy.visit('/');
    cy.get('header img[alt="Logo"]').then(($img) => {
      const content = getComputedStyle($img[0]).content;
      expect(content).not.to.include('logo-dark.png');
    });
    cy.window().then((win) => {
      expect(win.getComputedStyle(win.document.body).backgroundColor).to.equal(
        'rgb(255, 255, 255)'
      );
    });
  });

  it('renders the code highlight dark in LIGHT mode too (always dark)', () => {
    emulateColorScheme('light');
    cy.visit('/2011/05/29/mailcatcher-for-drupal-and-other-php-applications-the-simple-version/');
    cy.get('article .highlight pre')
      .first()
      .then(($pre) => {
        const bg = $pre[0].ownerDocument.defaultView.getComputedStyle(
          $pre[0]
        ).backgroundColor;
        const channels = bg.match(/\d+/g).map(Number);
        // The pygments scheme is dark: every channel well under mid-gray.
        channels.forEach((c) => expect(c).to.be.at.most(100));
      });
  });

  it('renders the code highlight dark in DARK mode (unchanged)', () => {
    emulateColorScheme('dark');
    cy.visit('/2011/05/29/mailcatcher-for-drupal-and-other-php-applications-the-simple-version/');
    cy.get('article .highlight pre')
      .first()
      .then(($pre) => {
        const bg = $pre[0].ownerDocument.defaultView.getComputedStyle(
          $pre[0]
        ).backgroundColor;
        const channels = bg.match(/\d+/g).map(Number);
        channels.forEach((c) => expect(c).to.be.at.most(100));
      });
  });
});
