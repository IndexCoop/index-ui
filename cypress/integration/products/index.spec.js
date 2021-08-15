/// <reference types="cypress" />

describe('INDEX', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/index')
  })

  context('Product Header', () => {
    it('should show product symbol', () => {
      cy.get('.sc-cfARRi > span').should('contain', 'INDEX')
    })
    it('should show product name', () => {
      cy.get('.sc-havuDZ').should('contain', 'Index Token')
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
      cy.get('.sc-exqIPC').children().should('have.length', 9) //accounts for spacers
    })
  })

  context('Buy/Sell Widget', () => {
    it('should render', () => {
      cy.get('.sc-havuDZ').should('not.be.empty')
      cy.get('.sc-ezjrSx').should('contain', 'Buy')
      cy.get('.sc-irqbAE').should('contain', 'Sell')
      cy.get('.sc-hmvkKb > :nth-child(1)').should('contain', 'Pay with')
      cy.get('.sc-iiBnNu > :nth-child(1)').should('contain', 'Buy (estimated)')
      cy.get('.sc-ckTSus').should('not.be.empty')
    })
  })

  context('My Assets', () => {
    it('should have a title', () => {
      cy.get(':nth-child(1) > .sc-hJFzke').should('contain', 'My Assets')
    })

    it('should render values', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
      cy.get('.sc-jYKCQm').should('contain', 'INDEX')
    })

    it('should contain MetaMask button', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
    })
  })

  context('Product Changes', () => {
    it('should have a title', () => {
      cy.get(':nth-child(2) > .sc-hJFzke').should('contain', 'Changes')
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

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
