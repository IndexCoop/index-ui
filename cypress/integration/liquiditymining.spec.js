/// <reference types="cypress" />

describe('Liquidity Mining', () => {
  before(() => {
    cy.visit('http://localhost:3000/liquidity-mining')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('[data-cy=liquidity-mining-title]').should(
        'contain',
        'Liquidity Mining Programs'
      )
      cy.get('[data-cy=liquidity-mining-subtitle]').should(
        'contain',
        'Earn rewards for supplying liquidity for Index Coop products'
      )
    })
  })

  context('Widgets', () => {
    it('should show capital in farms', () => {
      cy.contains('Capital in Farms')
    })
    it('should show $INDEX price', () => {
      cy.contains('$INDEX Price')
    })
  })

  context('Farms', () => {
    it('should show DPI Farm widget', () => {
      const selector = '[data-cy=dpi-farm-widget]'
      cy.get(selector).should('be.visible')
      cy.get(selector).should('contain', 'DPI Liquidity Program')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Staked ETH/DPI Uniswap LP Tokens')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', '(Volatile)')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Unclaimed INDEX in pool')
      cy.get(selector).should('contain', 'Stake')
      cy.get(selector).should('contain', 'Claim')
      cy.get(selector).should('contain', 'Unstake & Claim')
    })
    it('should show MVI Farm widget', () => {
      const selector = '[data-cy=mvi-farm-widget]'
      cy.get(selector).should('be.visible')
      cy.get(selector).should('contain', 'MVI Liquidity Program')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Staked ETH/MVI Uniswap LP Tokens')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', '(Volatile)')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Unclaimed INDEX in pool')
      cy.get(selector).should('contain', 'Stake')
      cy.get(selector).should('contain', 'Claim')
      cy.get(selector).should('contain', 'Unstake & Claim')
    })
    it('should show Expired Farm widget', () => {
      const selector = '[data-cy=expired-farm-widget]'
      cy.get(selector).should('be.visible')
      cy.get(selector).should('contain', 'Expired Liquidity Program')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Staked ETH/DPI Uniswap LP Tokens')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', '(Volatile)')
      cy.get(selector).should('not.be.empty')
      cy.get(selector).should('contain', 'Unclaimed INDEX in pool')
      cy.get(selector).should('contain', 'Unstake & Claim')
    })
  })
})
