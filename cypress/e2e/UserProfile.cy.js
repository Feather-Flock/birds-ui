describe('User Profile Test', () => {
  beforeEach(() => {
    cy.intercept('/graphql',{
      method: 'POST',
      fixture: '../fixtures/user.json'
    })
    cy.visit('http://localhost:3000/profile')
  });

  it('User should see their name at the top of the page', () => {
    cy.get('.name-wrapper').contains('h2', 'BLUESKIIII')
  });

});


// should have a family name
// should have a location
// should have a description
// should have a section for events
