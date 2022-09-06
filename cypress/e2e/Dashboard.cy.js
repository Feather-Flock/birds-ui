// import { aliasQuery } from

describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://birds-api.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'user') {
        req.alias = "GetUser"
        req.continue()
      }
    })
    // need another intercept for the mapquest request
    cy.visit('http://localhost:3000/')
  })

  it('User sees upcoming events they are attending', () => {
    cy.get('.rsvp-eventcards').should('be.visible')
    .get('.event-container').contains('h2', 'Event you\'re Attending')
    .get('.title').contains('p', 'What: ')
    .get('.date').contains('p', 'When: ')
    .get('.time').contains('p', 'Time: ')
  })

  // it('User sees a map with nearby events on page load', () => {
    // cy.get('#map').should('be.visible')
  // })

  // it('User is welcomed onto the page', () => {
  //   cy.visit('https://example.cypress.io')
  // })

  // it('User can click on an event their attending and have an event modal pop up with details', () => {
  //   cy.visit('https://example.cypress.io')
  // })

  // it('User can click the markers for events and have a similar modal pop up', () => {
  //   cy.visit('https://example.cypress.io')
  // })

  // it('User can navigate to an event form from their Dashboard', () => {
  //   cy.visit('https://example.cypress.io')
  // })

  // it('User can navigate to their profile page', () => {
  //   cy.visit('https://example.cypress.io')
  // })
});
