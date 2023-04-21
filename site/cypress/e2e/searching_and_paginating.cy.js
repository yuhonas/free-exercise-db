// https://docs.cypress.io/api/introduction/api.html

describe('Searching and Paginating', () => {
  // before each test visit the root url
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have a page title', () => {
    cy.contains('h1', 'Free Exercise DB')
  })

  it('should expand the collapsed section when I click on the link with text "More"', () => {
    // within the first element with class ".exercise" find the link with text "More" and click it
    cy.get('.exercise').first().find('a').contains('More').click()
    // assert that the exercise no longer contains the more link
    cy.get('.exercise').first().should('not.contain', 'More')
  })

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

  it('should paginate another 50 items when I scroll to the bottom', () => {
    cy.scrollTo('bottom')
    cy.get('.exercise').should('have.length', 100)
  })
})
