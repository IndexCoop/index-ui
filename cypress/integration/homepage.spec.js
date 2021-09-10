/// <reference types="cypress" />

describe('Homepage', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/')
  })

  context('HomeHeader', () => {
    it('should exist', () => {
      cy.get('[data-cy=home-header]').should('contain', 'The Index Coop currently has')
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
      cy.get('[data-cy=view-dpi-link]').should('have.attr', 'href').and('include', '/dpi')
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
      cy.get('[data-cy=products-button-group] > :nth-child(3)').click()
      cy.get('.sc-hndLF').should(
        'contain',
        'Ethereum 2x Flexible Leverage Index'
      )
    })
  })

  context('Integrated Products & Tools', () => {
    context('Index Coop', () => {
      it('should contain Index Coop tile', () => {
        cy.get(
          ':nth-child(2) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Index Coop')
      })

      it('should link to LM page', () => {
        cy.get(
          ':nth-child(2) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'liquidity-mining')
      })
    })

    context('Alpha Homora', () => {
      it('should contain Alpha Homora tile', () => {
        cy.get(
          ':nth-child(2) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Alpha Homora')
      })

      it('should link to Alpha Homora page', () => {
        cy.get(
          ':nth-child(2) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'alphafinance.io')
      })
    })

    context('Moonswap', () => {
      it('should contain Moonswap tile', () => {
        cy.get(
          ':nth-child(2) > :nth-child(5) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Moonswap')
      })

      it('should link to Moonswap page', () => {
        cy.get(
          ':nth-child(2) > :nth-child(5) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'moonswap.fi')
      })
    })

    context('Zerion', () => {
      it('should contain Zerion tile', () => {
        cy.get(
          ':nth-child(5) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Zerion')
      })

      it('should link to Zerion page', () => {
        cy.get(
          ':nth-child(5) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'zerion.io')
      })
    })

    context('Argent', () => {
      it('should contain Argent tile', () => {
        cy.get(
          ':nth-child(5) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Argent')
      })

      it('should link to Argent page', () => {
        cy.get(
          ':nth-child(5) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'argent.xyz')
      })
    })

    context('Dharma', () => {
      it('should contain Dharma tile', () => {
        cy.get(
          ':nth-child(5) > :nth-child(5) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Dharma')
      })

      it('should link to Dharma page', () => {
        cy.get(
          ':nth-child(5) > :nth-child(5) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'dharma.io')
      })
    })

    context('Opyn', () => {
      it('should contain Opyn tile', () => {
        cy.get(
          ':nth-child(10) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Opyn')
      })

      it('should link to Opyn page', () => {
        cy.get(
          ':nth-child(10) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'opyn.co')
      })
    })

    context('CREAM Finance', () => {
      it('should contain CREAM Finance tile', () => {
        cy.get(
          ':nth-child(8) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'CREAM Finance')
      })

      it('should link to CREAM Finance page', () => {
        cy.get(
          ':nth-child(8) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'cream.finance')
      })
    })

    context('Nexus Mutual', () => {
      it('should contain Nexus Mutual tile', () => {
        cy.get(
          ':nth-child(10) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Nexus Mutual')
      })

      it('should link to Nexus Mutual page', () => {
        cy.get(
          ':nth-child(10) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'nexusmutual.io')
      })
    })

    context('Uniswap', () => {
      it('should contain Uniswap tile', () => {
        cy.get(
          ':nth-child(13) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Uniswap')
      })
    })

    context('1inch', () => {
      it('should contain 1inch tile', () => {
        cy.get(
          ':nth-child(13) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', '1inch')
      })
    })

    context('Sushiswap', () => {
      it('should contain Sushiswap tile', () => {
        cy.get(
          ':nth-child(14) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'SushiSwap')
      })
    })

    context('Balancer', () => {
      it('should contain Balancer tile', () => {
        cy.get(
          ':nth-child(14) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Balancer')
      })
    })

    context('Dune Analytics', () => {
      it('should contain Dune Analytics tile', () => {
        cy.get(
          ':nth-child(16) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Dune Analytics')
      })

      it('should link to Dune Analytics page', () => {
        cy.get(
          ':nth-child(16) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'duneanalytics')
      })
    })

    context('DeFi Pulse', () => {
      it('should contain DeFi Pulse tile', () => {
        cy.get(
          ':nth-child(16) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'DeFi Pulse')
      })

      it('should link to DeFi Pulse page', () => {
        cy.get(
          ':nth-child(16) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'defipulse')
      })
    })

    context('Coin Gecko', () => {
      it('should contain CoinGecko tile', () => {
        cy.get(
          ':nth-child(17) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'Coin Gecko')
      })

      it('should link to CoinGecko page', () => {
        cy.get(
          ':nth-child(17) > :nth-child(1) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'coingecko')
      })
    })

    context('CoinMarketCap', () => {
      it('should contain CoinMarketCap tile', () => {
        cy.get(
          ':nth-child(17) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-jfkLlK'
        ).should('contain', 'CoinMarketCap')
      })

      it('should link to CoinMarketCap page', () => {
        cy.get(
          ':nth-child(17) > :nth-child(3) > .sc-jSFjdj > .sc-dHMioH > .sc-fkmfBh'
        )
          .should('have.attr', 'href')
          .and('include', 'coinmarketcap')
      })
    })

    context('Footer Links', () => {
      it('should contain all links', () => {
        cy.get('[data-cy=footer-links]').children().should('have.length', 4)
      })
    })
  })
})
