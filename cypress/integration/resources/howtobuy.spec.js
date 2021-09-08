/// <reference types="cypress" />

describe('How To Buy', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/how-to-buy')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('[data-cy=how-to-buy-header]').should('contain', 'How To Buy The')
      cy.get('[data-cy=how-to-buy-header]').should('contain', 'DeFi Pulse Index')
    })
  })

  context('Introduction', () => {
    it('should have header', () => {
      cy.get('[data-cy=how-to-buy-intro]').should(
        'contain',
        'Introduction'
      )
    })
    it('should have content', () => {
      cy.get('[data-cy=how-to-buy-intro]').should(
        'contain',
        'If this is your first time buying digital assets'
      )
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('[data-cy=footer-links]').children().should('have.length', 4)
    })
  })
})
