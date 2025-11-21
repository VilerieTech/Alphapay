describe('LOGIN API tests', () => {
    it('should login user with valid credentials and generate token', () => {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/login',
            body: {
                "email": Cypress.env("EMAIL"),
                "password": Cypress.env("PASSWORD")
            }
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.message.body).to.include('Login successful')
            })
        })
    })

    it('should not login when incorrect password is entered', () => {
        cy,request ({
            method: 'POST', 
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/login',
            body: {
                "email": Cypress.env("EMAIL"),
                "password": Cypress.env("INVALID_PASSWORD")
            }
            .then((res) => {
                expect(res.status).to.eq(401)
                expect(res.body.message).to.include('Email or password incorrect')
            })
        })
    })

    it('should not login when incorrect email is entered', () => {
        cy,request ({
            method: 'POST', 
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/login',
            body: {
                "email": Cypress.env("INVALID_EMAIL"),
                "password": Cypress.env("INVALID_PASSWORD")
            }
            .then((res) => {
                expect(res.status).to.eq(401)
                expect(res.body.message).to.include('Email or password incorrect')
            })
        })
    })

    it('should not login when providing an unverified email', () => {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/login',
            body: {
                "email": Cypress.env("UNVERIFIED_EMAIL"),
                "password": Cypress.env("INVALID_PASSWORD")
            }
            .then((res) => {
                expect(res.status).to.eq(401)
                expect(res.body.message).to.include('User not found')
            })
        })
    })
})