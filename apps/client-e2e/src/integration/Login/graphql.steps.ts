import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(`the user has joined some conferences`, () => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName === 'listAttendeeEvents') {
      req.alias = req.body.operationName;
      req.reply({
        fixture: 'conferences/listAttendees.json',
      });
      return;
    }
    if (req.body.operationName === 'GetUserByOwner') {
      req.alias = req.body.operationName;
      req.reply({
        fixture: 'user/GetUserByOwner.json',
      });
      return;
    }

    req.continue();
  });
});

Then(`the conferences are fetched`, () => {
  cy.wait('@listAttendeeEvents');
  cy.wait('@GetUserByOwner');
});
