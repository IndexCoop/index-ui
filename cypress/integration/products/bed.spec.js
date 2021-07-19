/// <reference types="cypress" />

describe('BED', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/bed')
  })

  context('Product Header', () => {
    it('should show product symbol', () => {
      cy.get('.sc-cfARRi > span').should('contain', 'BED')
    })
    it('should show product name', () => {
      cy.get('.sc-havuDZ').should('contain', 'Bankless BED Index')
    })
    it('should show product price', () => {
      cy.get('.sc-jhDJEt').should('not.be.empty')
    })
    it('should show product percent change', () => {
      cy.get('.sc-jhDJEt').should('not.be.empty')
    })
  })

  context('Product Metadata', () => {
    it('should show market cap', () => {
      cy.get(':nth-child(1) > .sc-hndLF').should('contain', 'Market Cap')
      cy.get(':nth-child(1) > .sc-clGGWX').should('not.be.empty')
    })
    it('should show NAV', () => {
      cy.get(':nth-child(2) > .sc-hndLF').should('contain', 'Net Asset Value')
      cy.get(':nth-child(2) > .sc-clGGWX').should('not.be.empty')
    })
    it('should show prem/discount', () => {
      cy.get(':nth-child(3) > .sc-hndLF').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-clGGWX').should('not.be.empty')
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

  context('Product Stats', () => {
    it('should have a title', () => {
      cy.get(':nth-child(1) > .sc-hJFzke').should('contain', 'Stats')
    })

    it('should render values', () => {
      cy.get(':nth-child(1) > .sc-liAPKD').should('not.be.empty')
      cy.get(':nth-child(1) > .sc-fiCYzP').should('not.be.empty')
      cy.get(':nth-child(2) > .sc-hfVBHA').should('not.be.empty')
      cy.get(':nth-child(2) > .sc-fiCYzP').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-hfVBHA').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-fiCYzP').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-hfVBHA').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-hfVBHA').should('not.be.empty')
    })
  })

  context('My Assets', () => {
    it('should have a title', () => {
      cy.get(':nth-child(2) > .sc-hJFzke').should('contain', 'My Assets')
    })

    it('should render values', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
      cy.get('.sc-jYKCQm').should('contain', 'BED')
    })

    it('should contain MetaMask button', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
    })
  })

  context('Product Changes', () => {
    it('should have a title', () => {
      cy.get(':nth-child(3) > .sc-hJFzke').should('contain', 'Changes')
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

  context('Product Allocations', () => {
    it('should have a title', () => {
      cy.get(':nth-child(4) > .sc-hJFzke').should('contain', 'Allocations')
    })

    it('should render allocations', () => {
      cy.get('.sc-jVSGNQ > :nth-child(2) > .sc-QxirK').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-QxirK').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-QxirK').should('not.be.empty')
      cy.get('.sc-jVSGNQ > :nth-child(5)').should('not.be.empty')
      cy.get('.sc-jVSGNQ > :nth-child(6)').should('not.be.empty')
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
