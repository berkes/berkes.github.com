describe('Blog Posts Tests', () => {
  beforeEach(() => {
    cy.visit('/archive.html');
  });

  it('should display blog posts', () => {
    cy.contains('August 10, 2024');
  });

  it('should display the correct content in blog posts', () => {
    cy.contains('August 10, 2024');
    cy.contains('Ignore Rust\'s target build directories in Deja-Dup');
  });

  it('should have the correct language attribute for English posts', () => {
    cy.get('html[lang="en"]').should('exist');
  });

  it('should have the correct language attribute for Dutch posts', () => {
    cy.visit('/archief.html');
    cy.get('html[lang="nl"]').should('exist');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.contains('August 10, 2024');
  });
});
  describe('related posts (Read on)', () => {
    it('suggests tag-relevant posts in the same language on an English post', () => {
      cy.visit('/2022/12/23/fediverse-never-forgets/');
      cy.contains('h1', 'Read on:');
      // Tag relevance beats recency: the Mastodon/Fediverse-tagged posts
      // surface, and no Dutch post sneaks in via date proximity.
      cy.get('aside a[href="/2022/12/13/new-project-fedetivity-automate-your-mastodon-account/"]').should('exist');
      cy.get('aside a[href*="/nl/"]').should('not.exist');
    });

    it('suggests same-language posts on a Dutch post', () => {
      cy.visit('/2012/05/24/een-nieuw-weblog/');
      cy.contains('h1', 'Lees verder:');
      // Its English twin shares tags and date but must not be suggested.
      cy.get('aside a[href="/2012/05/24/a-new-blog/"]').should('not.exist');
    });

    it('hides the Read on aside entirely for posts without tags', () => {
      cy.visit('/2002/02/02/set-of-avatars/');
      cy.contains('h1', 'Read on:').should('not.exist');
      cy.contains('h1', 'Lees verder:').should('not.exist');
    });
  });
