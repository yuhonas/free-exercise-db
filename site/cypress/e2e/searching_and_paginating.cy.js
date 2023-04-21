// https://docs.cypress.io/api/introduction/api.html

describe('Searching and Paginating', () => {
  // before each test visit the root url
  beforeEach(() => {
    cy.visit('/')
  })

  it('visits the app root url', () => {
    cy.contains('h1', 'Free Exercise DB')
  })

  // it filters the list when i enter a search term into the search input
  it('should filter the list when i enter a search term into the search input', () => {
    // enter the search term "bench press" into an input named "search"
    cy.get('input[name=search]').type('bench press chains')

    // assert that first element with class ".exercise" contains the texxt "Bench Press with Chains"
    cy.get('.exercise').first().contains('Bench Press with Chains')

    // clear the search input named "search"
    cy.get('input[name=search]').clear()

    cy.get('.exercise').first().contains('3/4 Sit-Up')
  })

  it('should paginate with 50 items', () => {
    cy.get('.exercise').should('have.length', 50)
  })
})
