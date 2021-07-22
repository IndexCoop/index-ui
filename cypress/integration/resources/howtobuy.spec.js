/// <reference types="cypress" />

describe('How To Buy', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/how-to-buy')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-ljpcbl').should('contain', 'How To Buy The')
      cy.get('.sc-jxFFCz').should('contain', 'DeFi Pulse Index')
    })
    it('should show header image', () => {
      cy.get('.sc-iMCRTP').should('be.visible')
    })
  })

  context('Introduction', () => {
    it('should have header', () => {
      cy.get(':nth-child(2) > div > .sc-juNJA-d').should(
        'contain',
        'Introduction'
      )
    })
    it('should have content', () => {
      cy.get(':nth-child(2) > div > .sc-iJKVRt').should(
        'contain',
        'If this is your first time buying digital assets'
      )
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
