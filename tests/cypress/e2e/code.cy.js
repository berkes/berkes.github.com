describe('Code in Posts Tests', () => {
  beforeEach(() => {
    cy.visit('/2022/08/09/ruby-slow-database-slow/');
  });

  it('should display code blocks in blog posts', () => {
    cy.get('pre').should('exist');
  });

  it('should have correct syntax highlighting', () => {
    cy.get('pre code').should('exist');
  });

  it('should display responsive design elements in a narrow browser window', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.get('pre').should('exist');
  });
});