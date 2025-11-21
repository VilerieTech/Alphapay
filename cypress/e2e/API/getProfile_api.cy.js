describe("GET profile", () => {

  before(() => {
    cy.loginAndGetToken(); // token saved in Cypress.env()
  });

  it("Should return user profile", () => {
    cy.request({
      method: 'GET',
      url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/profile',
      headers: {
        Authorization: `Bearer ${Cypress.env("jwtToken")}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("email");
    });
  });

});
