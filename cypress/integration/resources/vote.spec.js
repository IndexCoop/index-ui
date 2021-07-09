/// <reference types="cypress" />

describe('Vote', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/vote')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-hlXxXZ').should('contain', 'Vote')
      cy.get('.sc-gswFgi').should('contain', 'View and vote on proposals')
      cy.get('.sc-cApVyb').should('contain', 'Proposals')
    })
  })

  context('Widget', () => {
    it('should show votes widget', () => {
      cy.get('.sc-fJxALz > [style="width: 60%;"]').should(
        'contain',
        'Description'
      )
      cy.get('.sc-fJxALz > :nth-child(2)').should('contain', 'State')
      cy.get('.sc-fJxALz > :nth-child(3)').should('contain', 'Action')
      cy.get('.sc-cApVyb').should('not.be.empty')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
