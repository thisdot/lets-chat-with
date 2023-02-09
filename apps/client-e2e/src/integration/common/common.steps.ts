import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { getLastAlias, setLastAlias } from './last-alias.util';

Given(`the {string} url is visited`, (url: string) => {
  cy.visit(url);
});

Given(`the application is opened on an iPhone 5/SE size phone`, () => {
  Cypress.config('viewportHeight', 568);
  Cypress.config('viewportWidth', 320);
});

Given(`the application is opened on an iPhone X size phone`, () => {
  Cypress.config('viewportHeight', 812);
  Cypress.config('viewportWidth', 375);
});

When(`the {string} button is clicked`, (dataTestId: string) => {
  cy.get(`[data-test-id="${dataTestId}"]`)
    .as(setLastAlias(dataTestId))
    .should('be.visible')
    .and('not.be.disabled')
    .click();
});

When(`typing {string} into {string} input field`, (text: string, dataTestId: string) => {
  cy.get(`[data-test-id="${dataTestId}"]`).should('be.visible').and('not.be.disabled').type(text);
});

And(`lost focus from {string} input field`, (dataTestId: string) => {
  cy.get(`[data-test-id="${dataTestId}"]`).trigger('blur');
});

Then(`the {string} element/button/item does not exist`, (dataTestId: string) => {
  cy.get(`[data-test-id="${dataTestId}"]`).should('not.exit');
});

Then(`the {string} element/input/button is visible`, (dataTestId: string) => {
  cy.get(`[data-test-id="${dataTestId}"]`).as(setLastAlias(dataTestId)).should('be.visible');
});

And(`it is disabled`, () => {
  cy.get(getLastAlias()).should('be.disabled');
});

And(`it is not disabled`, () => {
  console.log(`"it" refers to: ${getLastAlias()}`);
  cy.get(getLastAlias()).should('not.be.disabled');
});

When(`it is clicked`, () => {
  cy.get(getLastAlias()).click();
});

When(`it receives {string} as an input`, (text: string) => {
  cy.get(getLastAlias()).type(text);
});
