import { hasOperationName } from "../utils/graphql-test-utils";

describe('Event Modal Tests', () => {
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
    cy.get('.leaflet-marker-icon').should('be.visible').click()
    cy.wait(`@queryEvent`)
  });

  it('User should see an event header', () => {
    cy.get('.modal-header').contains('h1', 'Games at Fremont')
  });

});