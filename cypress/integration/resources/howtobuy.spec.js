/// <reference types="cypress" />

describe('How To Buy', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/how-to-buy')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-juNJA-d').should('contain', 'How To Buy The')
      cy.get('.sc-gDyJDg').should('contain', 'DeFi Pulse Index')
    })
    it('should show header image', () => {
      cy.get('.sc-fSvVUw').should('be.visible')
    })
  })

  context('Introduction', () => {
    it('should have header', () => {
      cy.get(':nth-child(2) > div > .sc-iMCRTP').should(
        'contain',
        'Introduction'
      )
    })
    it('should have content', () => {
      cy.get(':nth-child(2) > div > .sc-hLiTib').should(
        'contain',
        'If this is your first time buying digital assets'
      )
    })
  })

  context('Steps to buying DPO', () => {
    it('should have header', () => {
      cy.get(':nth-child(3) > :nth-child(1) > .sc-iMCRTP').should(
        'contain',
        'Steps to buying DPI'
      )
    })
    context('Option 1', () => {
      it('should have a header', () => {
        cy.get('.sc-fVnRWS').should('contain', 'Buy DPI in your wallet')
      })
      it('should have content', () => {
        cy.get('.sc-hLiTib').should(
          'contain',
          'For the purposes of this option'
        )
      })
      it('should load all images', () => {
        cy.get('ol > :nth-child(5) > :nth-child(1) > .sc-iJKVRt').should(
          'be.visible'
        )
        cy.get('ol > :nth-child(5) > :nth-child(2) > .sc-iJKVRt').should(
          'be.visible'
        )
        cy.get(':nth-child(10) > :nth-child(1) > .sc-iJKVRt').should(
          'be.visible'
        )
        cy.get(':nth-child(10) > :nth-child(2) > .sc-iJKVRt').should(
          'be.visible'
        )
        cy.get(
          '[style="display: flex; justify-content: center;"] > :nth-child(1) > .sc-iJKVRt'
        ).should('be.visible')
        cy.get(
          '[style="display: flex; justify-content: center;"] > :nth-child(2) > .sc-iJKVRt'
        ).should('be.visible')
      })
    })
    context('Option 2', () => {
      it('should have a header', () => {
        cy.get('.sc-fVnRWS').should(
          'contain',
          'on the Web using indexcoop.com or a decentralized exchange'
        )
      })
      it('should have content', () => {
        cy.get('.sc-hLiTib').should('contain', 'Before purchasing DPI')
      })
      it('should load all images', () => {
        cy.get(':nth-child(5) > .sc-iJKVRt').should('be.visible')
        cy.get(':nth-child(9) > .sc-iJKVRt').should('be.visible')
      })
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
