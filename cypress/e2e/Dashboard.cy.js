import { hasOperationName } from "../utils/graphql-test-utils";

describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (hasOperationName(req, 'event')) {
        req.alias = 'queryEvent'
        req.reply({
          fixture: '../fixtures/event.json'
        })
      }

      if (hasOperationName(req, 'user')) {
        req.alias = 'queryUser'
        req.reply({
          fixture: '../fixtures/user.json'
        })
      }
    })
    cy.visit('http://localhost:3000/')
  });

  it('User is welcomed onto the page', () => {
    cy.get('.dashboard-container').contains('h1', 'BLUESKIIII')
  });

  it('User sees upcoming events they are attending', () => {
    cy.get('.rsvp-eventcards').should('be.visible')
    .get('.event-container').contains('h2', 'Event You\'re Attending')
    .get('.title').contains('p', 'What: Taking the rent check over')
    .get('.date').contains('p', '2022-10-20')
    .get('.time').contains('p', '18:00:00')
  });

  it('User sees a map with nearby events on page load', () => {
    cy.get('#map').should('be.visible')
    .get('.leaflet-marker-icon').should('be.visible')
  });

  it('User can click on an event their attending and have an event modal pop up with details', () => {
    cy.get('.view-details-button').first().contains('View Details').click()
    cy.wait(`@queryEvent`)
      .its('response.body.data.event')
      .should('have.property', "title")
  });

  it('User can click the markers for events and have a similar modal pop up', () => {
    cy.get('.leaflet-marker-icon').should('be.visible').click()
    cy.wait(`@queryEvent`)
      .its('response.body.data.event')
      .should('have.property', "title")
  });

  it('User can navigate to an event form from their Dashboard', () => {
    cy.get('.site-nav').contains('button', 'Create Event').click()
    .url().should('contain', '/new-event')
    .get('.event-form').should('be.visible')
  });

  it('User can navigate to their profile page', () => {
    cy.get('.site-nav').contains('button', 'View My Profile').click()
    .url().should('contain', '/profile')
    .get('.name-wrapper').contains('h2', 'BLUESKIIII')
  });
});
