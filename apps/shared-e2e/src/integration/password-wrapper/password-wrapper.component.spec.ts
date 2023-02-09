describe('shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordwrappercomponent--primary'));

  it('should render the component', () => {
    cy.get('cm-password-wrapper').should('exist');
  });
});
