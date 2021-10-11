/// <reference types="cypress" />

describe('Homepage', () => {
  before(() => {
    cy.visit('http://localhost:3000/', {
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    })
  })

  context('HomeHeader', () => {
    it('should exist', () => {
      cy.get('[data-cy=home-header]').should(
        'contain',
        'The Index Coop currently has'
      )
    })
  })

  context('What is the Index Coop', () => {
    it('should render the correct tiles', () => {
      cy.get('[data-cy=explanation]').should(
        'contain',
        'Diversified Risk Products'
      )
      cy.get('[data-cy=explanation]').should(
        'contain',
        'Decentralized & Autonomous'
      )
      cy.get('[data-cy=explanation]').should(
        'contain',
        'Built with DeFi Leaders'
      )
    })
  })

  context('View Defi Pulse Button', () => {
    it('should navigate to the DPI page', () => {
      cy.get('[data-cy=view-dpi-link]')
        .should('have.attr', 'href')
        .and('include', '/dpi')
    })
  })

  context('Products', () => {
    it('should have the right product buttons', () => {
      cy.get('[data-cy=products-button-group').should('contain', 'DPI')
      cy.get('[data-cy=products-button-group').should('contain', 'ETH2x-FLI')
      cy.get('[data-cy=products-button-group').should('contain', 'MVI')
      cy.get('[data-cy=products-button-group').should('contain', 'BTC2x-FLI')
      cy.get('[data-cy=products-button-group').should('contain', 'BED')
    })

    it('should show the correct product charts', () => {
      cy.get('[data-cy=products-button-group]').contains('ETH2x-FLI').click()
      cy.get('[data-cy=products-chart-header]').should(
        'contain',
        'Ethereum 2x Flexible Leverage Index'
      )
    })
  })

  context('Integrated Products & Tools', () => {
    const testParams = [
      ['Index Coop', 'index', 'View the Pool', 'liquidity-mining'],
      ['Alpha Homora', 'alpha-homora', 'View Pools', 'alphafinance.io'],
      ['Moonswap', 'moonswap', 'View the Pool', 'moonswap.fi'],
      ['SushiSwap', 'sushiswap-yield', 'View the Pool', 'sushi.com'],
      ['Zerion', 'zerion', 'Learn more', 'zerion.io'],
      ['Argent', 'argent', 'Learn more', 'argent.xyz'],
      ['Dharma', 'dharma', 'Learn more', 'dharma.io'],
      ['Opyn', 'opyn', 'View Prices', 'opyn.co'],
      ['CREAM Finance', 'cream', 'View Lend & Borrow Rates', 'cream.finance'],
      ['Nexus Mutual', 'nexus-mutual', 'View Coverage Rates', 'nexusmutual.io'],
      ['Uniswap', 'uniswap', 'Trade DeFi Pulse Index', 'uniswap.org'],
      ['1inch', '1inch', 'Trade DeFi Pulse Index', '1inch.io'],
      ['Balancer', 'balancer', 'Trade DeFi Pulse Index', 'balancer.exchange'],
      ['DeFi Pulse', 'defi-pulse', 'Learn more', 'defipulse'],
      ['Coin Gecko', 'coin-gecko', 'View Price Chart', 'coingecko'],
      ['CoinMarketCap', 'coin-market-cap', 'View Price Chart', 'coinmarketcap'],
    ]
    testParams.forEach(([name, selector, linkText, hrefSubstring]) =>
      context(`${name} (${selector})`, () => {
        const dataCySelector = `[data-cy=${selector}-tile]`
        it(`should contain ${name} tile`, () => {
          cy.get(dataCySelector).should('contain', name)
        })

        it('should link to correct page', () => {
          cy.get(dataCySelector)
            .contains('a', linkText)
            .should('have.attr', 'href')
            .and('include', hrefSubstring)
        })
      })
    )


    context('Footer Links', () => {
      it('should contain all links', () => {
        cy.get('[data-cy=footer-links]').children().should('have.length', 4)
      })
    })
  })
})
