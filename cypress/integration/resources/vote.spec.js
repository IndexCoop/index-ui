/// <reference types="cypress" />

describe('Vote', () => {
  before(() => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/vote')
  })

  context('Page Header', () => {
    it('should show header text', () => {
      cy.get('.sc-gswFgi').should('contain', 'Vote')
      cy.get('.sc-cApVyb').should('contain', 'View and vote on proposals')
      cy.get('.sc-gpEJdM').should('contain', 'Proposals')
    })
  })

  context('Widget', () => {
    it('should show votes widget', () => {
      cy.get('.sc-cSiAOC > [style="width: 60%;"]').should(
        'contain',
        'Description'
      )
      cy.get('.sc-cSiAOC > :nth-child(2)').should('contain', 'State')
      cy.get('.sc-cSiAOC > :nth-child(3)').should('contain', 'Action')
    })
  })

  context('Footer Links', () => {
    it('should contain all links', () => {
      cy.get('.sc-jQAxuV > .sc-dsXzNU').children().should('have.length', 4)
    })
  })
})
