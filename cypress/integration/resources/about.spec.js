/// <reference types="cypress" />

describe('About', () => {
  before(() => {
    cy.visit('http://localhost:3000/about')
  })
  beforeEach(() => {
    //cy.wait(1000)
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-bXexck').should('contain', 'Creating The Next Generation Of')
      cy.get('.sc-eGJWMs').should('contain', 'Indexes')
    })
    it('should show header image', () => {
      cy.get('.sc-gIvpjk').should('be.visible')
    })
  })

  context('The Vision', () => {
    it('should show image', () => {
      cy.get('.sc-fHCHyC > .sc-bsatvv').should('be.visible')
    })
    it('should have a header', () => {
      cy.get(':nth-child(2) > :nth-child(2) > .sc-dFRpbK').should(
        'contain',
        'The Vision'
      )
      cy.get(':nth-child(2) > :nth-child(2) > .sc-csTbgd').should(
        'contain',
        'The Potential Of Next-gen Asset Management'
      )
    })
    it('should have content', () => {
      cy.get(':nth-child(2) > :nth-child(2) > .sc-dkQUaI').should(
        'contain',
        'Within 27 years,'
      )
    })
  })

  context('Getting Started', () => {
    it('should have a header', () => {
      cy.get('[style="margin-bottom: 0px;"] > .sc-dFRpbK').should(
        'contain',
        'Getting Started'
      )
      cy.get('[style="margin-bottom: 0px;"] > .sc-csTbgd').should(
        'contain',
        'Creating The New Index Standard'
      )
    })
    it('should have content', () => {
      cy.get('[style="margin-bottom: 0px;"] > .sc-WZYut').should(
        'contain',
        'Starting with the DeFi Pulse Index'
      )
    })
  })

  context('Who We Are', () => {
    it('should have a header', () => {
      cy.get(':nth-child(4) > :nth-child(2) > .sc-dFRpbK').should(
        'contain',
        'Who We Are'
      )
      cy.get(':nth-child(4) > :nth-child(2) > .sc-csTbgd').should(
        'contain',
        'Thinkers, Writers, Builders, and Do-ers.'
      )
    })
    it('should show image', () => {
      cy.get('.sc-dtLLSn > .sc-bsatvv').should('be.visible')
    })
    it('should have content', () => {
      cy.get(':nth-child(4) > :nth-child(2) > .sc-dkQUaI').should(
        'contain',
        'Our mission is to lead by example'
      )
    })
  })

  context('Join Us', () => {
    it('should have a header', () => {
      cy.get(':nth-child(5) > .sc-dFRpbK').should('contain', 'Join Us')
      cy.get(':nth-child(5) > .sc-csTbgd').should(
        'contain',
        'Come Join The Community'
      )
    })
    it('should show cta text', () => {
      cy.get(':nth-child(5) > .sc-WZYut').should(
        'contain',
        'Say hi on the Discord and forum, and join our passionate community building the future of finance.'
      )
    })
    it('should have content', () => {
      cy.get(':nth-child(4) > :nth-child(2) > .sc-dkQUaI').should(
        'contain',
        'Our mission is to lead by example'
      )
    })
    it('should show buttons', () => {
      cy.get('[href="https://discord.gg/XNMVW4Egdr"] > .sc-biJonm').should(
        'be.visible'
      )
      cy.get('[href="https://gov.indexcoop.com/"] > .sc-biJonm').should(
        'be.visible'
      )
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
