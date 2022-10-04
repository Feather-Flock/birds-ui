import { hasOperationName } from "../utils/graphql-test-utils";

describe('User Profile Tests', () => {
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
    cy.visit('http://localhost:3000')
    cy.get('button').contains("View My Profile").click()
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
  });

  it('User should see events that they created', () => {
    cy.get('.bottom-container').should('be.visible')
    .get('.mySwiper').should('be.visible')
    .get('.left-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container > .attending-header').contains('Event You\'ve Created')
    .get('.left-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container > .event-info-container > .event-details > .title').contains('Hanging at a coffee shop')
    .get('.left-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container').contains('button', 'View Details')
  });

  it('User should see events that they are attending hosted by other families', () => {
    cy.get('.bottom-container').should('be.visible')
    .get('.mySwiper').should('be.visible')
    .get('.right-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container > .attending-header').contains('Event you\'re Attending')
    .get('.right-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container > .event-info-container > .event-details > .title').contains('Taking the rent check over')
    .get('.right-container > .swiper > .swiper-wrapper > .swiper-slide > .event-container').contains('button', 'View Details')
  });
});
