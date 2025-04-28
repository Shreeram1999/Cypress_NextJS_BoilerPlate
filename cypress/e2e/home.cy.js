describe('Home Page Navigation', () => {
    it('displays users and navigates to user profile', () => {
      cy.visit('/');
  
      cy.contains('Team').should('exist');
  
      cy.contains('Alice Johnson').should('exist');
      cy.contains('View Profile').first().click();
  
      // Should land on /user/1
      cy.url().should('include', '/user/1');
      cy.contains('User Profile');
      cy.contains('User ID: 1');
    });
  });
  