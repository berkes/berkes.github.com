// Fonts and other assets are served from local (#172): no CDN.
// Asserts what differs from the CDN setup: local font files load,
// the families are available, and no external asset is referenced.
describe('Local assets', () => {
  it('references no external stylesheets or scripts', () => {
    cy.visit('/');
    cy.get('link[rel="stylesheet"], script[src]').then(($els) => {
      const external = $els
        .toArray()
        .map((el) => el.href || el.src)
        .filter((url) => url && !url.startsWith('http://localhost:8000'));
      expect(external).to.be.empty;
    });
  });

  it('serves the font files locally', () => {
    const fonts = [
      '/assets/fonts/arvo-400.woff2',
      '/assets/fonts/arvo-400-italic.woff2',
      '/assets/fonts/arvo-700.woff2',
      '/assets/fonts/arvo-700-italic.woff2',
      '/assets/fonts/ofl-sorts-mill-goudy-tt-400.woff2',
    ];
    fonts.forEach((path) => {
      cy.request(path).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('font');
      });
    });
  });

  it('loads the vendored font families', () => {
    cy.visit('/');
    cy.window().then((win) => win.document.fonts.ready).then(() => {
      expect(document.fonts.check('1em Arvo')).to.be.true;
      expect(document.fonts.check('1em "OFL Sorts Mill Goudy TT"')).to.be
        .true;
    });
  });
});
