describe("DELETE /user", () => {

  before(() => {
    cy.loginAndGetToken();
  });

  it("Should delete the user", () => {
    cy.request({
      method: 'DELETE',
      url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/delete-user',
      headers: {
            Authorization: `Bearer ${Cypress.env("jwtToken")}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.include('Account successfully deleted');
    });    
    })

    it("Should delete the user", () => {
    cy.request({
      method: 'DELETE',
      url: 'https://9ldgrpnq-3000.uks1.devtunnels.ms/delete-user',
      headers: {
            Authorization: `Bearer ${Cypress.env("jwtToken")}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.include('Account already deleted');
    });
  });
})
