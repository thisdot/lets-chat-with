import { Before, Then } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName === 'listAttendeeEvents') {
      req.alias = req.body.operationName;
      req.reply({
        fixture: 'conferences/listAttendees.json',
      });
      return;
    }

    if (req.body.operationName === 'AccessEvent') {
      req.alias = req.body.operationName;
      req.reply({
        fixture: 'event/accessEvent.json',
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

Then(`the conferences page is opened`, () => {
  cy.wait('@listAttendeeEvents');
  cy.url().should('contain', '/conferences');
});
