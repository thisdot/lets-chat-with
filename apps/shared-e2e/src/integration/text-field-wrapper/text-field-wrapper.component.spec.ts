describe('shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=textfieldwrappercomponent--primary&knob-label&knob-errors&knob-info&knob-name'
    )
  );

  it('should render the component', () => {
    cy.get('cm-text-field-wrapper').should('exist');
  });
});
