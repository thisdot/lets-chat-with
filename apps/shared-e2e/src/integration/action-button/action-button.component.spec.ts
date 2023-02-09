describe('shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=actionbuttoncomponent--primary&knob-icon&knob-size=lg&knob-type')
  );

  it('should render the component', () => {
    cy.get('[cm-action-button]').should('exist');
  });
});
