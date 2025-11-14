import koraDashboardPage from "../pages/koraDashboardPage"
import koraLoginPage from "../pages/koraLoginPage";

describe('Login functionality test', () => {
    const site = new koraDashboardPage();
    const login = new koraLoginPage();
     let UserData;
     let invalidData;

    beforeEach('Visit Website', () => {
        site.visitSite();
        site.clickLoginButton();
        cy.fixture('testData').then((data) =>{
        UserData = data.validUser;
        invalidData = data.invalidUser;
        })
    })

    it('should login successfully when using valid credentials', () => {
        login.enterEmail(UserData.validEmail)
        login.enterPassword(Cypress.env('PASSWORD'))
        login.clickSigninButton()
    })

    it('should not login when entering invalid email', () => {
        login.enterEmail(invalidData.invalidEmail)
        login.enterPassword(Cypress.env('PASSWORD'))
        login.clickSigninButton()
    })

    it('should not login when email field is empty', () => {
        login.enterPassword(Cypress.env('PASSWORD'))
        login.clickSigninButton()
        login.assertEmptyEmail()
    })

    it('should not login when entering incorrect password', () => {
        login.enterEmail(UserData.validEmail)
        login.enterPassword(Cypress.env('INVALID_PASSWORD'))
        login.clickSigninButton()
    })

    it('should not login when password field is empty', () => {
        login.enterEmail(UserData.validEmail)
        login.clickSigninButton()
        login.assertEmptyPassword()
    })
})