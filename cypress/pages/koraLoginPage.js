class koraLoginPage {

    enterEmail(email) {
        cy.get('input[name="email"]')
        // .wait(5000)
        // .should('have.text', "example@gmail.com")
        .type(email)
    }

    assertEmptyEmail() {
        cy.get('.error:contains("Provide your email please")')
        .should('be.visible');
    }

    enterPassword(password) {
        cy.get('input[name="password"]')
        // .contains('password')
        .type(password)
    }

     assertEmptyPassword() {
        cy.get('.error:contains("Provide a password please")')
        .should('be.visible');
    }

    clickSigninButton() {
        cy.get('button:contains("Sign In")')
        .should('be.enabled')
        .click();
    }
}
export default koraLoginPage