/// <reference types="cypress" />

describe('Liquidity Mining', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/liquidity-mining')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get(':nth-child(1) > .sc-dSnXvR').should(
        'contain',
        'Liquidity Mining Programs'
      )
      cy.get(':nth-child(1) > .sc-hYRTwp').should(
        'contain',
        'Earn rewards for supplying liquidity for Index Coop products'
      )
    })
  })

  context('Widgets', () => {
    it('should show capital in farms', () => {
      cy.get(
        ':nth-child(1) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .QxpiM > .sc-cTJkRt'
      ).should('be.visible')
      cy.get(
        ':nth-child(1) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .fgTdQE > .sc-efHYUO'
      ).should('not.be.empty')
      cy.get(
        ':nth-child(1) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .fgTdQE > .sc-iBzEeX'
      ).should('contain', 'Capital in Farms')
    })
    it('should show $INDEX price', () => {
      cy.get(
        ':nth-child(3) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .QxpiM > .sc-cTJkRt'
      ).should('be.visible')
      cy.get(
        ':nth-child(3) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .fgTdQE > .sc-efHYUO'
      ).should('not.be.empty')
      cy.get(
        ':nth-child(3) > .sc-jSFjdj > .SFMFb > .ctlBxL > .etUwLo > .fgTdQE > .sc-iBzEeX'
      ).should('contain', '$INDEX Price')
    })
  })

  context('Farms', () => {
    it('should show DPI Farm widget', () => {
      cy.get('.sc-cbeScs').should('be.visible')
      cy.get('.sc-gVFcvn').should('contain', 'DPI Liquidity Program')
      cy.get('.sc-fWWYYk').should('not.be.empty')
      cy.get(':nth-child(1) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(1) > div > .sc-eXuyPJ').should(
        'contain',
        'Staked ETH/DPI Uniswap LP Tokens'
      )
      cy.get(':nth-child(3) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(3) > div > .sc-eXuyPJ').should('contain', '(Volatile)')
      cy.get(':nth-child(5) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(5) > div > .sc-eXuyPJ').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get('.sc-iGkqmO').children().should('have.length', 5)
      cy.get('.sc-iGkqmO > :nth-child(1) > .sc-dlnjwi').should(
        'contain',
        'Stake'
      )
      cy.get('.sc-iGkqmO > :nth-child(3) > .sc-dlnjwi').should(
        'contain',
        'Claim'
      )
      cy.get('.sc-iGkqmO > :nth-child(5) > .sc-dlnjwi').should(
        'contain',
        'Unstake & Claim'
      )
    })
    it('should show MVI Farm widget', () => {
      cy.get('.sc-irKDMX').should('be.visible')
      cy.get('.sc-dvUynV').should('contain', 'MVI Liquidity Program')
      cy.get('.sc-jtiXyc').should('not.be.empty')
      cy.get(':nth-child(1) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(
        '.sc-crzoAE > :nth-child(3) > .sc-bdnxRM > .sc-bdnxRM > .sc-cKRKFl > .sc-jNnpgg > .sc-dPaNzc > div > .sc-gstuGz'
      ).should('contain', 'Staked ETH/MVI Uniswap LP Tokens')
      cy.get(':nth-child(3) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(3) > div > .sc-eXuyPJ').should('contain', '(Volatile)')
      cy.get(':nth-child(5) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(5) > div > .sc-eXuyPJ').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get('.sc-iGkqmO').children().should('have.length', 5)
      cy.get('.sc-iGkqmO > :nth-child(1) > .sc-dlnjwi').should(
        'contain',
        'Stake'
      )
      cy.get('.sc-iGkqmO > :nth-child(3) > .sc-dlnjwi').should(
        'contain',
        'Claim'
      )
      cy.get('.sc-iGkqmO > :nth-child(5) > .sc-dlnjwi').should(
        'contain',
        'Unstake & Claim'
      )
    })
    it('should show Expired Farm widget', () => {
      cy.get('.sc-fXgAZx').should('be.visible')
      cy.get('.sc-jXcxbT').should('contain', 'Expired Liquidity Program')
      cy.get('.sc-eEVmNe').should('not.be.empty')
      cy.get(':nth-child(1) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(1) > div > .sc-htmcrh').should(
        'contain',
        'Staked ETH/DPI Uniswap LP Tokens'
      )
      cy.get(':nth-child(3) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(3) > div > .sc-eXuyPJ').should('contain', '(Volatile)')
      cy.get(':nth-child(5) > div > .sc-flUlpA').should('not.be.empty')
      cy.get(':nth-child(5) > div > .sc-eXuyPJ').should(
        'contain',
        'Unclaimed INDEX in pool'
      )
      cy.get(':nth-child(5) > .SFMFb > .sc-iCoGMd > .sc-fujyAs').should(
        'contain',
        'Unstake & Claim'
      )
    })
  })

  context('Index Airdrop', () => {
    it('should show header', () => {
      cy.get(':nth-child(4) > .sc-dSnXvR').should('contain', 'Index Airdrop')
      cy.get(':nth-child(4) > .sc-hYRTwp').should(
        'contain',
        'See if you qualified for the Index Airdrop'
      )
      cy.get('.sc-tsGVs').should('be.visible')
      cy.get('.ctlBxL > .sc-bdnxRM > .sc-iBzEeX').should(
        'contain',
        'Claim Your INDEX Rewards'
      )
      cy.get(
        '.jZyOmc > .sc-jSFjdj > .SFMFb > .sc-iCoGMd > :nth-child(1) > button > span'
      ).should('contain', 'Claim INDEX')
      cy.get(
        '.jZyOmc > .sc-jSFjdj > .SFMFb > .sc-iCoGMd > :nth-child(3) > button > span'
      ).should('contain', 'Claim Externally')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
