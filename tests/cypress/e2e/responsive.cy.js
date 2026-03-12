describe('Responsive Design Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
    cy.get('footer').should('exist');
  });

  it('should display responsive design elements in a wide browser window', () => {
    cy.viewport(1920, 1080); // Full HD
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
    cy.get('footer').should('exist');
  });

  it('should display responsive design elements in a tablet browser window', () => {
    cy.viewport(768, 1024); // iPad
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
    cy.get('footer').should('exist');
  });
});