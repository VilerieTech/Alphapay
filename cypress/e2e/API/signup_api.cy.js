describe('POST /sign-up' , function() {
    let dynamicEmailAddress;
    const DOMAIN = '@yopmail.com';

    before(function () {
        // Generate a unique email address using a timestamp
        const uniqueString = Date.now(); 
        dynamicEmailAddress = `test-user-${uniqueString}${DOMAIN}`;

        cy.log(`Generated Email for this suite: ${dynamicEmailAddress}`);
    });

    it('register users using valid credentials' , function() {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/sign-up',
            body: {
                name: Cypress.env("NAME"),
                email: dynamicEmailAddress,
                password: Cypress.env("PASSWORD"),
                // phone: "+1234567890"
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            // expect(res.body).to.have.property('_id')
            expect(res.body.message).to.include('successful')
        })
    })

    it("should verify account via OTP", () => {
        const emailToVerify = dynamicEmailAddress;
    cy.request("POST", "/email-otp/resend", {
        email: emailToVerify
    });
    cy.wait(7000);
    cy.getYopmailOtp(emailToVerify).then((otp) => {
      cy.log("OTP received:", otp);

      cy.request("POST", "/email-otp/verify", {
        email: emailToVerify,
        otp
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.include("Email verified successfully");
      });
    });
  });

   it.only('should not register user with existing email', () => {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/sign-up',
            body: {
                "name": Cypress.env("NAME"),
                "email": Cypress.env("EMAIL"),
                "password": Cypress.env("PASSWORD"),
                // "phone": "+1234567890"
            }
            .then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.include('exists')
            }
            )
        })
    })

    it('should resend OTP when prompted', () => {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/email-otp/resend',
            body: {
                "email": Cypress.env("EMAIL")
            }
            .then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.message).to.include('OTP sent successfully')
            }
            )
        })
    })

    it('should NOT resend OTP to an account not in database', () => {
        cy.request({
            method: 'POST',
            url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/email-otp/resend',
            body: {
                "email": Cypress.env("wrong@mail.com")
            }
            .then((res) => {
                expect(res.status).to.eq(404)
                expect(res.body.message).to.include('User not found')
            }
            )
        })
    })

    
})


   