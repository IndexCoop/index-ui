/// <reference types="cypress" />

describe('Rewards', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/rewards')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-hBezlf').should('contain', 'Rewards')
    })
    it('should show content', () => {
      cy.get('.sc-crzoAE > :nth-child(3)').should(
        'contain',
        'Monthly contributor rewards distributor'
      )
      cy.get('.sc-crzoAE > :nth-child(5)').should(
        'contain',
        'Use a web3 wallet only, not a centralized exchange account'
      )
      cy.get('.sc-crzoAE > :nth-child(7)').should(
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
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
