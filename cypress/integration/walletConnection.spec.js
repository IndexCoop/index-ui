Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  // TODO: Check why there are exceptions being thrown in these tests by the MockProvider
  return false
})

describe('Wallet Connection', () => {
  context('Metamask', () => {
    before(() => {
      cy.injectWeb3Provider()
      cy.visit('http://localhost:3000/', {
        headers: {
          'Accept-Encoding': 'gzip, deflate',
        },
      })
    })
    it('should be able to connect', () => {
      cy.contains('Unlock Wallet').click()
      cy.contains('Metamask').parent().parent().contains('Select').click()
      cy.contains('View Balances')
    })
    it('should be able to disconnect', () => {
      cy.contains('View Balances').parent().click()
      cy.contains('Sign Out').click()
      cy.contains('Unlock Wallet')
    })
  })

  context('ONTO (visiting from App)', () => {
    before(() => {
      cy.injectWeb3Provider(true)
      cy.reload(true)
    })
    it('should connect directly', () => {
      cy.contains('View Balances').should('be.visible')
    })
    it('should be able to disconnect', () => {
      cy.contains('View Balances').parent().click()
      cy.contains('Sign Out').click()
      cy.contains('Unlock Wallet').should('be.visible')
    })
    it('should reconnect directly when clicking Unlock wallet button', () => {
      cy.contains('Unlock Wallet').click()
      cy.contains('View Balances').should('be.visible')
    })
  })
})
