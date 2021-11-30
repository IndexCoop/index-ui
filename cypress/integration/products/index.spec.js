/// <reference types="cypress" />

describe('INDEX', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/index')
  })

  context('Product Header', () => {
    it('should show product symbol', () => {
      cy.get('[data-cy=token-symbol]').should('contain', 'INDEX')
    })
    it('should show product name', () => {
      cy.get('[data-cy=token-name]').should('contain', 'Index Token')
    })
    it('should show product price', () => {
      cy.get('.sc-jhDJEt').should('not.be.empty')
    })
    it('should show product percent change', () => {
      cy.get('.sc-jhDJEt').should('not.be.empty')
    })
  })

  context('Product Market Data', () => {
    it('should render chart', () => {
      cy.get('.recharts-surface').should('not.be.empty')
    })
    it('should have all date range selectors', () => {
      // 5 date range selectors and 4 spacers between. 5 + 4 = 9
      cy.get('[data-cy=date-range-selector]')
        .children()
        .should('have.length', 9)
    })
  })

  context('Buy/Sell Widget', () => {
    it('should render', () => {
      cy.get('[data-cy=buy-sell-selector]').should('contain', 'Buy')
      cy.get('[data-cy=buy-sell-selector]').should('contain', 'Sell')
      cy.get('[data-cy=buy-sell-selector]').should('contain', 'Pay with')
      cy.get('[data-cy=buy-sell-selector]').should('contain', 'Buy (estimated)')
    })
  })

  context('My Assets', () => {
    it('should have a title', () => {
      cy.get('[data-cy=my-assets]').should('contain', 'My Assets')
    })

    it('should render values', () => {
      cy.get('[data-cy=my-assets-token-balance]').should('not.be.empty')
      cy.get('[data-cy=my-assets-token-balance]').should('contain', 'INDEX')
    })

    it('should contain MetaMask button', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
    })
  })

  context('Product Changes', () => {
    it('should have a title', () => {
      cy.get('[data-cy=changes]').should('contain', 'Changes')
    })

    it('should render values', () => {
      cy.get(':nth-child(1) > .sc-bTJQgd').should('not.be.empty')
      cy.get(':nth-child(1) > .sc-hQYpqk').should('not.be.empty')
      cy.get(':nth-child(2) > .sc-bTJQgd').should('not.be.empty')
      cy.get(':nth-child(2) > .sc-hQYpqk').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-bTJQgd').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-hQYpqk').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-bTJQgd').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-hQYpqk').should('not.be.empty')
    })
  })

  context('Product Content', () => {
    it('should not be empty', () => {
      cy.get('.sc-gVtoEh > :nth-child(5)').should('not.be.empty')
    })
  })
})
