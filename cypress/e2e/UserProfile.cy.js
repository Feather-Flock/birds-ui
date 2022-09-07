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

  it('User should see their family description', () => {
    cy.get('.description-text-box').contains('I love my cats and animation drawing.')
  });

  it('User should see their identifying tags', () => {
    cy.get('.tag-container').contains('p', '2 Kids')
    .get('.tag-container').contains('p', 'MLM')
    .get('.tag-container').contains('p', 'Married')
    .get('.tag-container').contains('p', 'Monogamous')
  });


});


// should have a description
// should have a section for events
