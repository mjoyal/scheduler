


describe('Appointments', () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset")
    cy.visit("/");
    cy.contains('Monday');
  })

  it('should book an interview', () => {
    cy.get('.appointment__add-button')
      .first()
      .click() 
    cy.get("[data-testid=student-name-input]")
      .type('Mackenzie Joyal', {delay: 100})
    
    cy.get(".interviewers__item-image")
      .first()
      .click()
  
    cy.get('.button--confirm')
      .click()
    
    cy.contains('.appointment__card--show', "Mackenzie Joyal")

  });

  
});