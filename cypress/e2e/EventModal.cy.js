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
    .get('.leaflet-marker-icon').should('be.visible').click()
    .wait(`@queryEvent`)
  });

  it('User should see an event header and date', () => {
    cy.get('.modal-header').contains('h1', 'Games at Fremont')
    .get('.modal-grid > :nth-child(1) > :nth-child(2)').contains('h3', '2022-10-31')
  });

  it('User can click on the View Family button to see the Family\'s profile page',() => {
    cy.get('.modal-button').contains('View Family').click()
    .url().should('contain', '/profile')
  });
});
