import { hasOperationName } from "../utils/graphql-test-utils";

describe('empty spec', () => {
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
    cy.visit('http://www.birds-of-a-feather.net/new-event')
  });

  it('User sees a map on page load', () => {
    cy.get('#map')
  })

  it('Can type into the form', () => {
    cy.get('input').eq(0).click().type('Trip to Zoo')
    cy.get('input').eq(1).click()
    cy.get('input').eq(2).click().type('The Zoo')
    cy.get('input').eq(3).click().type('We want to go to the zoo with you!')
    cy.get('input').eq(0).click().should('have.value', 'Trip to Zoo')
    cy.get('input').eq(3).click().should('have.value','We want to go to the zoo with you!')
  })

  it('When the user types into the location bar suggestions should populate', () => {
    cy.get('input').eq(2).click().type('The Zoo Crew')
    cy.get('[value="The Zoo Crew Store, 141 Chadwick Ave, Newark, NJ"]').click()
    cy.get('input').eq(2).should('have.value', 'The Zoo Crew Store, 141 Chadwick Ave, Newark, NJ')
  })

  it('When a user selects a location from the suggestions the suggestion box should dissapear', () => {
    cy.get('input').eq(2).click().type('The Zoo Crew')
    cy.get('[value="The Zoo Crew Store, 141 Chadwick Ave, Newark, NJ"]').click()
    cy.get('input').eq(2).should('have.value', 'The Zoo Crew Store, 141 Chadwick Ave, Newark, NJ')
    cy.get('input').eq(3).click()
    cy.get('option').should('not.exist')
  })

  it('When a user submits the form a confirmation should pop up and the fields should reset', () => {
    cy.get('input').eq(0).click().type('Trip to Zoo')
    cy.get('input').eq(1).click()
    cy.get('input').eq(2).click().type('The Zoo, Boulder CO')
    cy.get('option').eq(0).click()
    cy.get('input').eq(3).click().type('We want to go to the zoo with you!')
    cy.get('input').eq(0).click().should('have.value', 'Trip to Zoo')
    cy.get('input').eq(3).click().should('have.value','We want to go to the zoo with you!')
    cy.get('button').eq(3).click()
    cy.intercept('POST', '/graphql', (req) => {
      if (hasOperationName(req, 'event')) {
        req.alias = 'mutationEvent'
        req.reply({
          fixture: '../fixtures/new-event.json'
        })
      }
    })
    cy.on('window:alert',(t)=>{
         expect(t).to.contains('New Event Made!');
      })
})
  it('User should be able to navigate back to dashboard from event form', () => {
    cy.wait(500)
    cy.get('button').eq(0).click()
    cy.url().should('eq', 'http://www.birds-of-a-feather.net/')
  })

  it('User should be able to navigate to user profile from event form', () => {
    cy.get('button').eq(1).click()
    cy.url().should('eq', 'http://www.birds-of-a-feather.net/profile')
  })

})
