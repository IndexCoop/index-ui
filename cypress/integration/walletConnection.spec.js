Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  // TODO: Check why there are exceptions being thrown in these tests by the MockProvider
  return false
})

const testRunnerShortAddress = '0xf39F...2266'

xdescribe('Wallet Connection', () => {
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
      cy.contains('Connect Wallet').click()
      cy.contains('Metamask').parent().parent().contains('Select').click()
      cy.contains(testRunnerShortAddress)
    })
    it('should be able to disconnect', () => {
      cy.contains(testRunnerShortAddress).parent().click()
      cy.contains('Sign Out').click()
      cy.contains('Connect Wallet')
    })
  })

  context('ONTO (visiting from App)', () => {
    before(() => {
      cy.injectWeb3Provider(true)
      cy.reload(true)
    })
    it('should connect directly', () => {
      cy.contains(testRunnerShortAddress).should('be.visible')
    })
    it('should be able to disconnect', () => {
      cy.contains(testRunnerShortAddress).parent().click()
      cy.contains('Sign Out').click()
      cy.contains('Connect Wallet').should('be.visible')
    })
    it('should reconnect directly when clicking Connect Wallet button', () => {
      cy.contains('Connect Wallet').click()
      cy.contains(testRunnerShortAddress).should('be.visible')
    })
  })
})
