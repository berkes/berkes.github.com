// Mobile view (single breakpoint: <=767px, see mobile.css).
// Covers the requirements of the mobile issue: hamburger nav, no
// horizontal scrolling, aside images below content.
const MOBILE_WIDTH = 375;
const MOBILE_HEIGHT = 667; // iPhone 6/7/8 class
const mobileViewport = () => cy.viewport(MOBILE_WIDTH, MOBILE_HEIGHT);

describe('Mobile view', () => {
  it('shows the hamburger and hides the inline menu on a small screen', () => {
    mobileViewport();
    cy.visit('/');
    cy.get('.nav-toggle-label').should('be.visible');
    cy.get('nav#main .onion ul').should('not.be.visible');
  });

  it('opens a full-screen vertical menu from the hamburger', () => {
    mobileViewport();
    cy.visit('/');
    cy.get('.nav-toggle-label').click();
    cy.get('nav#main .onion ul').should('be.visible');
    // Full-screen: the list covers the viewport, vertically stacked.
    // (A position:fixed overlay spans the viewport minus the underlying
    // document's scrollbar, so allow that gutter rather than exact width.)
    cy.get('nav#main .onion ul').then(($ul) => {
      const rect = $ul[0].getBoundingClientRect();
      expect(rect.width).to.be.at.least(MOBILE_WIDTH - 20);
      expect(rect.height).to.be.at.least(MOBILE_HEIGHT - 20);
      expect(rect.top).to.equal(0);
      expect(rect.left).to.equal(0);
    });
    cy.get('nav#main a[href="/about.html"]').should('be.visible');
    // And it navigates.
    cy.get('nav#main a[href="/about.html"]').click();
    cy.url().should('include', '/about.html');
  });

  it('shows the inline menu without a hamburger on a wide screen', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('.nav-toggle-label').should('not.be.visible');
    cy.get('nav#main .onion ul').should('be.visible');
  });

  // Nothing may introduce horizontal scrolling on the key pages.
  const pages = ['/', '/about.html', '/archive.html', '/tags.html', '/pres.html'];
  pages.forEach((path) => {
    it(`has no horizontal scrolling on ${path}`, () => {
      mobileViewport();
      cy.visit(path);
      cy.window().then((win) => {
        expect(win.document.documentElement.scrollWidth).to.be.at.most(
          win.innerWidth
        );
      });
    });
  });

  it('has no horizontal scrolling on a post with code blocks', () => {
    mobileViewport();
    cy.visit('/2011/05/29/mailcatcher-for-drupal-and-other-php-applications-the-simple-version/');
    cy.window().then((win) => {
      expect(win.document.documentElement.scrollWidth).to.be.at.most(
        win.innerWidth
      );
    });
  });

  it('drops the aside (woodcut) image below the content on a post', () => {
    mobileViewport();
    cy.visit('/2022/12/23/fediverse-never-forgets/');
    cy.get('article .body').then(($body) => {
      cy.get('article figure').then(($figure) => {
        // The figure (aside column) must start below the body column.
        expect($figure[0].getBoundingClientRect().top).to.be.greaterThan(
          $body[0].getBoundingClientRect().top
        );
      });
    });
  });
});
