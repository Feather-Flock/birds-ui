describe('Dashboard List Tests', () => {
  beforeEach(() => {
    cy.intercept('/graphql',{
      method: 'POST',
      fixture: '../fixtures/user.json'
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
})