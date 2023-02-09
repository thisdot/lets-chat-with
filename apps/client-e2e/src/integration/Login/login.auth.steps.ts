import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(`the user has valid credentials`, () => {
  cy.clearLocalStorage();
  cy.intercept('POST', `https://cognito-idp.us-east-1.amazonaws.com/`, (req) => {
    /** First cognito request */
    if (req.body.AuthFlow === 'USER_SRP_AUTH') {
      req.alias = 'cognito_request_1';
      req.reply({ fixture: 'auth/cognito_response_1' });
    }
    /** Second cognito request */
    if (req.body.ChallengeName === 'PASSWORD_VERIFIER') {
      req.alias = 'cognito_request_2';
      req.reply({ fixture: 'auth/cognito_response_2' });
    }
    /** Third cognito request */
    if (req.body.AccessToken) {
      req.alias = 'cognito_request_3';
      req.reply({ fixture: 'auth/cognito_response_3' });
    }
  });
});
