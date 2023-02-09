describe('shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary&knob-type=primary'));

  it('should render the component', () => {
    cy.get('[cm-button]').should('exist');
  });
});
