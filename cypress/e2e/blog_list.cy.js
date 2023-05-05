describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('Login form is shown', () => {
    cy.contains('Log In');
    cy.get('#login-button');
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
        username: 'test_user',
        name: 'Test User',
        password: 'test',
      });
    });
    it('succeeds with correct credentials', () => {
      cy.get('#login-button').click();
      cy.get('#username').type('test_user');
      cy.get('#password').type('test');
      cy.get('#login-form-submit').click();
      cy.contains('Test User is logged in');
    });
    it('fails with wrong credentials', () => {
      cy.get('#login-button').click();
      cy.get('#username').type('test_user');
      cy.get('#password').type('wrong');
      cy.get('#login-form-submit').click();
      cy.get('.error').should('contain', 'Wrong Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', 'Test User is logged in');
    });
  });
});
