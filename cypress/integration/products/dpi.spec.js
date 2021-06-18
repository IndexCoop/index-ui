/// <reference types="cypress" />

describe('DPI', () => {
  before(() => {
    cy.visit('http://localhost:3000/dpi')
  })
  beforeEach(() => {
    //cy.wait(1000)
  })

  context('Product Header', () => {
    it('should show product symbol', () => {
      cy.get('.sc-jCPRHX > span').should('contain', 'DPI')
    })
    it('should show product name', () => {
      cy.get('.sc-cfARRi').should('contain', 'DeFi Pulse Index')
    })
    it('should show product price', () => {
      cy.get('.sc-jhDJEt').should('not.be.empty')
    })
    it('should show product percent change', () => {
      cy.get('.sc-enrZtP').should('not.be.empty')
    })
  })

  context('Product Metadata', () => {
    it('should show market cap', () => {
      cy.get(':nth-child(1) > .sc-geBCVM').should('contain', 'Market Cap')
      cy.get(':nth-child(1) > .sc-clGGWX').should('not.be.empty')
    })
    it('should show NAV', () => {
      cy.get(':nth-child(2) > .sc-geBCVM').should('contain', 'Net Asset Value')
      cy.get(':nth-child(2) > .sc-clGGWX').should('not.be.empty')
    })
    it('should show prem/discount', () => {
      cy.get(':nth-child(3) > .sc-geBCVM').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-clGGWX').should('not.be.empty')
    })
  })

  context('Product Market Data', () => {
    it('should render chart', () => {
      cy.get('.recharts-surface').should('not.be.empty')
    })
    it('should have all date range selectors', () => {
      cy.get('.sc-eiQWpL').children().should('have.length', 9) //accounts for spacers
    })
  })

  context('Buy/Sell Widget', () => {
    it('should render', () => {
      cy.get('.sc-havuDZ').should('not.be.empty')
      cy.get('.sc-kBqmDu').should('contain', 'Buy')
      cy.get('.sc-ezjrSx').should('contain', 'Sell')
      cy.get('.sc-iiBnNu > :nth-child(1)').should('contain', 'Pay with')
      cy.get('.sc-dYXZXt > :nth-child(1)').should('contain', 'Buy (estimated)')
      cy.get('.sc-ckTSus').should('not.be.empty')
    })
    it('should have Transak button', () => {
      cy.get('.sc-FRrlG').should('not.be.empty')
    })
  })

  context('Product Stats', () => {
    it('should have a title', () => {
      cy.get(':nth-child(1) > .sc-liAPKD').should('contain', 'Stats')
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
      cy.get(':nth-child(2) > .sc-liAPKD').should('contain', 'My Assets')
    })

    it('should render values', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
      cy.get('.sc-bxLXlR').should('contain', 'DPI')
    })

    it('should contain MetaMask button', () => {
      cy.get('.sc-kJNqyW').should('not.be.empty')
    })
  })

  context('Product Changes', () => {
    it('should have a title', () => {
      cy.get(':nth-child(3) > .sc-liAPKD').should('contain', 'Changes')
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
      cy.get(':nth-child(4) > .sc-liAPKD').should('contain', 'Allocations')
    })

    it('should render allocations', () => {
      cy.get('.sc-jVSGNQ > :nth-child(2) > .sc-QxirK').should('not.be.empty')
      cy.get(':nth-child(3) > .sc-QxirK').should('not.be.empty')
      cy.get(':nth-child(4) > .sc-QxirK').should('not.be.empty')
      cy.get('.sc-jVSGNQ > :nth-child(5)').should('not.be.empty')
      cy.get('.sc-jVSGNQ > :nth-child(6)').should('not.be.empty')
      cy.get('.sc-eCbnUT').should('contain', 'More')
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
