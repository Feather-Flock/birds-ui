describe('User Profile Test', () => {
  beforeEach(() => {
    cy.intercept('/graphql',{
      method: 'POST',
      fixture: '../fixtures/user.json'
    })
    cy.visit('http://localhost:3000/profile')
  });

  it('User should see their username at the top of the page', () => {
    cy.get('.name-wrapper').contains('h2', 'BLUESKIIII')
  });

  it('User should see their location zipcode', () => {
    cy.get('.material-symbols-outlined').should('be.visible')
    .get('.location-wrapper').contains('h3', '80220')
  });



});


// should have a location
// should have a description
// should have a section for events
