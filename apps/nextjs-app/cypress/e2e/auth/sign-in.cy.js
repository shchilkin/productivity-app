/// <reference types="cypress" />
describe('sign-in page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');
  });
  it('displays login form', () => {
    cy.get('form').should('have.length', 1);
    cy.get('#email').should('have.length', 1);
    cy.get('#password').should('have.length', 1);
  });
  it('should be able to login', () => {
    cy.get('#email').type('test@test.test');
    cy.get('#password').type('test');
    cy.get('form').submit();
  });
  it('login button should be disabled if email or password is empty', () => {
    cy.get('#email').valueOf().should('be.empty');
    cy.get('#password').valueOf().should('be.empty');
    cy.get('button').contains('sign in').should('be.disabled');
  });
  it('should be able to go to register page', () => {
    cy.get('a').contains("Don't have an account?").click();
  });
});
