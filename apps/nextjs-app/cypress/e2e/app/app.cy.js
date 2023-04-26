/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('app page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');
    cy.get('#email').type('test@test.test');
    cy.get('#password').type('test');
    cy.get('form').submit();
  });

  it('displays app page', () => {
    cy.get('h2').contains('inbox');
  });

  it('Save task button should be disabled if task title is empty', () => {
    cy.get('button').contains('Add task').click();
    cy.get('#save-task').should('be.disabled');
  });

  it('should be able to add new task', () => {
    const taskName = faker.lorem.word(5);
    const taskDescription = faker.lorem.sentence(10);
    cy.get('button').contains('Add task').click();
    cy.get('#task-name').type(taskName);
    cy.get('#task-description').type(taskDescription);
    cy.get('#save-task').click();
    cy.get('h1').contains(taskName);
    cy.get('p').contains(taskDescription);
  });
});
