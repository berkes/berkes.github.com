// Art & works section, merged from art.berk.es (#177, #179, #180).
// Covers: homepage gallery, works overview, work pages (images,
// floats, videos), navigation, mobile behavior, and that works do
// not leak into the article archive.
describe('Works section', () => {
  it('shows the selected-works gallery on the homepage', () => {
    cy.visit('/');
    cy.contains('h2', 'Selected work');
    cy.contains('All work »').should('have.attr', 'href', '/works/');
    cy.get('ul.gallery a[href="/works/noodle-love/"]').should('exist');
    cy.get('ul.gallery a[href="/works/metromap/"]').should('exist');
  });

  it('lists all works on the overview, with the creative-coder intro', () => {
    cy.visit('/works/');
    cy.contains('h1', 'Art & Works');
    cy.contains('Creative Coder');
    cy.contains('ber@berk.es');
    const works = ['kroos', 'lost-in-love', 'metromap', 'noodle-love'];
    works.forEach((w) => {
      cy.get(`ul.gallery a[href="/works/${w}/"]`).should('exist');
    });
  });

  it('renders a work page with image and video', () => {
    cy.visit('/works/kroos/');
    cy.get('article.work-page h1').contains('kroos');
    cy.get('article.work-page img.marked-image').should('exist');
    cy.get('article.work-page video')
      .should('have.attr', 'src')
      .and('include', 'kroos.mp4');
  });

  it('renders floated images via the f shortcode', () => {
    cy.visit('/works/noodle-love/');
    cy.get('.float-container.position-right').should('exist');
    cy.get('.float-container img').should('exist');
  });

  it('has the Art menu entry on desktop and in the mobile hamburger', () => {
    cy.visit('/');
    cy.get('nav#main a[href="/works/"]').should('be.visible');
    cy.viewport(375, 667);
    cy.get('.nav-toggle-label').click();
    cy.get('nav#main a[href="/works/"]').should('be.visible');
  });

  it('has no horizontal scrolling on the works pages', () => {
    cy.viewport(375, 667);
    ['/works/', '/works/kroos/', '/works/noodle-love/'].forEach((path) => {
      cy.visit(path);
      cy.window().then((win) => {
        expect(win.document.documentElement.scrollWidth).to.be.at.most(
          win.innerWidth
        );
      });
    });
  });

  it('does not leak works into the article archive', () => {
    cy.visit('/archive.html');
    cy.get('section, article, main')
      .find('ul li a[href^="/works/"]')
      .should('not.exist');
  });

  it('shows the migrated art note as a blog post', () => {
    cy.visit('/2025/10/09/first-canvas-sketch-trial/');
    cy.contains('h1', 'First canvas-sketch trial');
    cy.get('article .highlight').should('exist');
    // And it is in the English homepage post list.
    cy.visit('/');
    cy.get('section.posts[lang="en"] a[href*="first-canvas-sketch-trial"]').should(
      'exist'
    );
  });
});
