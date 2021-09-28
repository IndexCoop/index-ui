/// <reference types="cypress" />

describe('Liquidity Mining', () => {
  before(() => {
    cy.wait(5000)
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
      cy.get(
        ':nth-child(1) > .sc-jSFjdj > .SFMFb'
      ).should('contain', 'Capital in Farms')
    })
    it('should show $INDEX price', () => {
      cy.get(
        ':nth-child(3) > .sc-jSFjdj > .SFMFb'
      ).should('contain', '$INDEX Price')
    })
  })

  context('Farms', () => {
    it('should show DPI Farm widget', () => {
      cy.get(':nth-child(3) > .SFMFb').should('be.visible')
      cy.get(':nth-child(3) > .SFMFb').should('contain', 'DPI Liquidity Program')
      cy.get(':nth-child(3) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(3) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(3) > .SFMFb').should(
        'contain',
        'Staked ETH/DPI Uniswap LP Tokens'
      )
      cy.get(':nth-child(3) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(3) > .SFMFb').should('contain', '(Volatile)')
      cy.get(':nth-child(3) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(3) > .SFMFb').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get(':nth-child(3) > .SFMFb').should(
        'contain',
        'Stake'
      )
      cy.get(':nth-child(3) > .SFMFb').should(
        'contain',
        'Claim'
      )
      cy.get(':nth-child(3) > .SFMFb').should(
        'contain',
        'Unstake & Claim'
      )
    })
    it('should show MVI Farm widget', () => {
      cy.get(':nth-child(5) > .SFMFb').should('be.visible')
      cy.get(':nth-child(5) > .SFMFb').should('contain', 'MVI Liquidity Program')
      cy.get(':nth-child(5) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(5) > .SFMFb').should('not.be.empty')
      cy.get(
        ':nth-child(5) > .SFMFb'
      ).should('contain', 'Staked ETH/MVI Uniswap LP Tokens')
      cy.get(':nth-child(5) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(5) > .SFMFb').should('contain', '(Volatile)')
      cy.get(':nth-child(5) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(5) > .SFMFb').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get(':nth-child(5) > .SFMFb').should(
        'contain',
        'Stake'
      )
      cy.get(':nth-child(5) > .SFMFb').should(
        'contain',
        'Claim'
      )
      cy.get(':nth-child(5) > .SFMFb').should(
        'contain',
        'Unstake & Claim'
      )
    })
    it('should show Expired Farm widget', () => {
      cy.get(':nth-child(7) > .SFMFb').should('be.visible')
      cy.get(':nth-child(7) > .SFMFb').should('contain', 'Expired Liquidity Program')
      cy.get(':nth-child(7) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(7) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(7) > .SFMFb').should(
        'contain',
        'Staked ETH/DPI Uniswap LP Tokens'
      )
      cy.get(':nth-child(7) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(7) > .SFMFb').should('contain', '(Volatile)')
      cy.get(':nth-child(7) > .SFMFb').should('not.be.empty')
      cy.get(':nth-child(7) > .SFMFb').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get(':nth-child(7) > .SFMFb').should(
        'contain',
        'Unstake & Claim'
      )
    })
  })

  context('Index Airdrop', () => {
    it('should show header', () => {
      cy.get(':nth-child(4) > .sc-ehALMs').should('contain', 'Index Airdrop')
      cy.get(':nth-child(4) > .sc-hGwcmR').should(
        'contain',
        'See if you qualified for the Index Airdrop'
      )
      cy.get('.jZyOmc > .sc-jSFjdj > .SFMFb').should(
        'contain',
        'Claim Your INDEX Rewards'
      )
      cy.get(
        '.jZyOmc > .sc-jSFjdj > .SFMFb'
      ).should('contain', 'Claim INDEX')
      cy.get(
        '.jZyOmc > .sc-jSFjdj > .SFMFb'
      ).should('contain', 'Claim Externally')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('[data-cy=footer-links]').children().should('have.length', 4)
    })
  })
})
