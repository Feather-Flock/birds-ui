describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('/graphql',{
      method: 'POST',
      fixture: '../fixtures/user.json'
    })
    cy.visit('http://www.birds-of-a-feather.net/new-event')
  });

  it('User sees a map on page load', () => {
    cy.get('#map')
  })
  it.only('Can type into the form', () => {
    cy.get('input').eq(0).click().type('Trip to Zoo')
    cy.get('input').eq(0).click().should('eq', 'Trip to Zoo')
  })
  it('When the user types into the location bar suggestions should populate', () => {
    cy.visit('https://example.cypress.io')
  })
  it('When a user selects a location from the suggestions the suggestion box should dissapear', () => {
    cy.visit('https://example.cypress.io')
  })
  it('When a user selects a location a map with a marker should populate', () => {
    cy.visit('https://example.cypress.io')
  })
  it('When a user tries to submit the form without all field filled out an error alert should popup', () => {
    cy.visit('https://example.cypress.io')
  })
  it('When a user submits the form a confirmation should pop up and the fields should reset', () => {
    cy.visit('https://example.cypress.io')
  })
  it('User should be able to navigate back to dashboard from event form', () => {
    cy.visit('https://example.cypress.io')
  })
  it('User should be able to navigate to user profile from event form', () => {
    cy.visit('https://example.cypress.io')
  })
  it('User should see new event on profile after they submitted event', () => {
    cy.visit('https://example.cypress.io')
  })
})
