describe('shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=countercomponent--primary&knob-count=0&knob-total=0&knob-class.cm-counter--bg=true'
    )
  );

  it('should render the component', () => {
    cy.get('cm-counter').should('exist');
  });
});
