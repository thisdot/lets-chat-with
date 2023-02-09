describe('shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=socialinputwrappercomponent--primary&knob-platform'));

  it('should render the component', () => {
    cy.get('cm-social-input-wrapper').should('exist');
  });
});
