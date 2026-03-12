describe('Images in Posts Tests', () => {
  beforeEach(() => {
    cy.visit('/2022/12/13/new-project-fedetivity-automate-your-mastodon-account/');
  });

  it('should display images in blog posts', () => {
    cy.get('figure img').should('exist');
  });

  it('should have correct image paths', () => {
    cy.get('figure img').should('have.attr', 'src').and('include', '/images/2022/12/13/');
  });

  it('should have correct alt text', () => {
    cy.get('figure img').should('have.attr', 'alt', 'Woodcut from Doré. Purely illustrative');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.get('figure img').should('exist');
  });
});