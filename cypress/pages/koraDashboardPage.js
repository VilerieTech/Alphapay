class koraDashboardPage {
    visitSite() {
        cy.visit('https://alphapay.netlify.app/');
        cy.url().should('eq', 'https://alphapay.netlify.app/');
    }

    clickSignUpButton() {
        cy.get('.nav_items')
        .find('a[href="/auth/signup"]') 
        .should('be.visible')
        .should('be.enabled')
        .click();
    }

    clickLoginButton() {
        cy.get('.nav_items')
        .find('a[href="/auth/login"]') 
        .should('be.visible')
        //.should('be.enabled')
        .click();
    }

}
export default koraDashboardPage