/// <reference types="cypress" />

describe('Rewards', () => {
  before(() => {
    cy.visit('http://localhost:3000/rewards')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('[data-cy=styled-page-header]').should('contain', 'Rewards')
    })
    it('should show content', () => {
      const selector = '[data-cy=contributor-rewards-header]'
      cy.get(selector).should(
        'contain',
        'Monthly contributor rewards distributor'
      )
      cy.get(selector).should(
        'contain',
        'Use a web3 wallet only, not a centralized exchange account'
      )
      cy.get(selector).should(
        'contain',
        'If you have further questions, please ask on'
      )
    })
  })

  context('Widget', () => {
    it('should show', () => {
      cy.get('.SFMFb').should('not.be.empty')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('[data-cy=footer-links]').children().should('have.length', 4)
    })
  })
})
