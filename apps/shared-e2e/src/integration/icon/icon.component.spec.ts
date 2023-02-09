describe('shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=iconcomponent--primary&knob-name&knob-size=md'));

  it('should render the component', () => {
    cy.get('cm-icon').should('exist');
  });
});
