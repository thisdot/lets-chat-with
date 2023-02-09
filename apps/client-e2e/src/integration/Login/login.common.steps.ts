import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(`the login form is filled`, () => {
  cy.get(`[data-test-id="login email"]`).should('be.visible').type('john.mcclane@nakatomi.com');
  cy.get(`[data-test-id="login password"]`).should('be.visible').type('yippie-kay-yay');
});

When(`the login button is clicked`, () => {
  cy.get(`[data-test-id="login button"]`).should('be.visible').click();
});

Then('the login form is displayed', () => {
  cy.get(`[data-test-id="login form"]`).should('be.visible');
});
