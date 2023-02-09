import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(`the app redirects to {string}`, (targetUrl: string) => {
  cy.url().should('contain', targetUrl);
});
