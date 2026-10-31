// Regression tests for findings from the Hugo port review (#159).
// These assert behavior of the built site (Jekyll or Hugo alike) and
// guard the migration's fragile spots.

describe('Hugo port review findings', () => {
  // The Discu comment script performs a runtime fetch to an external API,
  // which rejects when CI has no external network. That rejection is
  // unrelated to the render under test; the comment templates themselves
  // are covered by the other assertions.
  Cypress.on('uncaught:exception', (err) => {
    if (err.message && err.message.includes('Failed to fetch')) {
      return false;
    }
  });

  it('should show the about text on the about page, not only the photo', () => {
    cy.visit('/about.html');
    cy.contains('I am Bèr Kessels');
    cy.get('img[src*="ber_kessels.png"]').should('exist');
  });

  it('should show the about text on the Dutch about page', () => {
    cy.visit('/over.html');
    cy.contains('Ik ben Bèr Kessels');
  });

  it('should list all presentations on the presentations page', () => {
    cy.visit('/pres.html');
    cy.get('img[src*="ber_kessels_presenting.png"]').should('exist');
    cy.get('ul.posts li').should('have.length', 8);
    cy.get('a[href*="/p/"]').should('have.length', 8);
  });

  it('should show the decorative woodcut on every post', () => {
    // The post whose slug differs from its filename (dashes collapsed),
    // the case where the woodcut initially went missing.
    cy.visit('/2022/12/13/new-project-fedetivity-automate-your-mastodon-account/');
    cy.get('figure.decorative img').should('exist');
    cy.get('figure.decorative img')
      .and(($img) => {
        // naturalWidth > 0 means the image actually loaded
        expect($img[0].naturalWidth, 'woodcut loads').to.be.greaterThan(0);
      });
  });

  it('should serve a valid atom feed (parseable XML, no undefined entities)', () => {
    cy.request('/atom.xml').then((response) => {
      expect(response.status).to.eq(200);
      // Parse strictly: an undefined entity (e.g. &rsquo;) throws here.
      const doc = new DOMParser().parseFromString(response.body, 'text/xml');
      const err = doc.querySelector('parsererror');
      expect(err, 'atom.xml parses as XML').to.not.exist;
      const entries = doc.getElementsByTagName('entry');
      expect(entries.length).to.be.greaterThan(0);
    });
  });

  it('should show a woodcut on an old post_archive-layout post', () => {
    cy.visit('/2004/02/03/werkloos/');
    cy.get('figure.decorative img').should('exist');
  });
});
