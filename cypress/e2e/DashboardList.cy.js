import { hasOperationName } from "../utils/graphql-test-utils";

describe('Dashboard List Tests', () => {
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
    cy.visit('http://localhost:3000/Dashboard-List')
  });

  it('User sees upcoming events they are attending', () => {
    cy.get('.event-list-rsvp').should('be.visible')
    .get('.event-container').first().contains('h2', 'Event you\'re Attending')
    .get('.title').first().contains('p', 'What: Taking the rent check over')
    .get('.date').first().contains('p', 'When: 2022-10-20')
    .get('.time').first().contains('p', 'Time: 18:00:00')
  });

  it('User sees upcoming events near them', () => {
    cy.get('.event-list-user').should('be.visible')
    .get('.event-container').last().contains('h2', 'Event Near You')
    .get('.title').last().contains('p', 'What: Kitten Play Time')
    .get('.date').last().contains('p', 'When: 2022-09-15')
    .get('.time').last().contains('p', 'Time: 18:00:00')
  });

  it('User should be able to click view details and a modal populates', () => {
    cy.get('.view-details-button').first().contains('View Details').click()
    cy.wait(`@queryEvent`)
      .its('response.body.data.event')
      .should('have.property', "title")
  })

  it('Should be able to select a range from the dropdown list', () => {
    cy.get('.select-list-dropdown input').first().click({force: true})
    .get('#react-select-2-option-4').should('have.text', '20 miles').click({force: true})
    .get('.select-list-dropdown input').first().parent().siblings().contains('20 miles')
  })
})