describe('shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=topnavcomponent--primary&knob-backButton&knob-progress')
  );

  it('should render the component', () => {
    cy.get('cm-top-nav').should('exist');
  });
});
