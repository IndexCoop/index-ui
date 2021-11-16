/// <reference types="cypress" />

describe('About', () => {
  before(() => {
    cy.visit('http://localhost:3000/about')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('[data-cy=about-title]').should(
        'contain',
        'Creating The Next Generation Of'
      )
      cy.get('[data-cy=about-title]').should('contain', 'Indexes')
    })
    it('should show header image', () => {
      cy.get('[data-cy=new-york-stock-exchange-img]').should('be.visible')
    })
  })

  context('The Vision', () => {
    it('should show image', () => {
      cy.get('[data-cy=100-bill-zoomed-in-img]').should('be.visible')
    })
    it('should have a header', () => {
      cy.get('[data-cy=vision-section]').should('contain', 'The Vision')
      cy.get('[data-cy=vision-section]').should(
        'contain',
        'The Potential Of Next-gen Asset Management'
      )
    })
    it('should have content', () => {
      cy.get('[data-cy=vision-section]').should('contain', 'Within 27 years,')
    })
  })

  context('Getting Started', () => {
    it('should have a header', () => {
      cy.get('[data-cy=getting-started-section]').should(
        'contain',
        'Getting Started'
      )
      cy.get('[data-cy=getting-started-section]').should(
        'contain',
        'Creating The New Index Standard'
      )
    })
    it('should have content', () => {
      cy.get('[data-cy=getting-started-section]').should(
        'contain',
        'Starting with the DeFi Pulse Index'
      )
    })
  })

  context('Who We Are', () => {
    it('should have a header', () => {
      cy.get('[data-cy=who-we-are-section]').should('contain', 'Who We Are')
      cy.get('[data-cy=who-we-are-section]').should(
        'contain',
        'Thinkers, Writers, Builders, and Do-ers.'
      )
    })
    it('should show image', () => {
      cy.get('[data-cy=who-we-are-section]').should('be.visible')
    })
    it('should have content', () => {
      cy.get('[data-cy=who-we-are-section]').should(
        'contain',
        'Our mission is to lead by example'
      )
    })
  })

  context('Join Us', () => {
    it('should have a header', () => {
      cy.get('[data-cy=join-us-section]').should('contain', 'Join Us')
      cy.get('[data-cy=join-us-section]').should(
        'contain',
        'Come Join The Community'
      )
    })
    it('should show cta text', () => {
      cy.get('[data-cy=join-us-section]').should(
        'contain',
        'Say hi on the Discord and forum, and join our passionate community building the future of finance.'
      )
    })
    it('should show buttons', () => {
      cy.get('[data-cy=join-us-buttons').should('contain', 'Discord')
      cy.get('[data-cy=join-us-buttons').should('contain', 'Forum')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('[data-cy=footer-links]').children().should('have.length', 4)
    })
  })
})
