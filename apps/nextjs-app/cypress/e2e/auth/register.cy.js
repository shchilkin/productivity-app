/// <reference types="cypress" />

describe('register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('displays register form', () => {
    cy.get('form').should('have.length', 1);
    cy.get('#email').should('have.length', 1);
    cy.get('#password').should('have.length', 1);
    cy.get('#name').should('have.length', 1);
    cy.get('#surname').should('have.length', 1);
  });

  it('register button should be disabled when all of fields are empty', () => {
    cy.get('#email').valueOf().should('be.empty');
    cy.get('#password').valueOf().should('be.empty');
    cy.get('#name').valueOf().should('be.empty');
    cy.get('#surname').valueOf().should('be.empty');
    cy.get('button').contains('Create account').should('be.disabled');
  });

  it('should register the user', () => {
    cy.get('#email').type('test@test.test');
    cy.get('#password').type('test');
    cy.get('#name').type('test');
    cy.get('#surname').type('test');
    cy.get('form').submit();
  });

  it('should be able to go to sign in page', () => {
    cy.get('a').contains('Already have an account?').click();
  });
});
