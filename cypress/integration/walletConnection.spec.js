/// <reference types="cypress" />

describe('Wallet Connection', () => {
  beforeEach(() => {
    cy.injectWeb3Provider();
    cy.visit('http://localhost:3000/', {
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    })
  })

  context('Injected Web3 Provider', () => {
    it('should be able to connect', () => {
      cy.get('[data-cy=home-header]').should(
        'contain',
        'The Index Coop currently has'
      )
    })
  })
})
