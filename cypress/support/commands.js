// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("getYopmailOtp", (email) => {
//   const inbox = emailAddress.split("@")[0];
//   const url = `https://yopmail.com/mail`;

//   return cy.request({
//     method: "GET",
//     url: url,

//     headers: { "User-Agent": "Mozilla/5.0" }
//   }).then((res) => {

//     // Find the link for the email with subject "Your App"
//     const emailLinkMatch = res.body.match(/<a href="(massage\.php[^"]+)"[^>]*>[\s\S]*?Your App/);

//     if (!emailLinkMatch) {
//       throw new Error('No email with subject "Your App" found in inbox');
//     }

//     const messageUrl = "https://yopmail.com/en/" + emailLinkMatch[1];

//     // Load the email content page
//     return cy.request(messageUrl).then((msgRes) => {
//       const otpMatch = msgRes.body.match(/(\d{6})/); // extract 6-digit OTP

//       if (!otpMatch) {
//         throw new Error("OTP not found in the email content");
//       }

//       return otpMatch[1]; // return OTP
//     });
//   });
// });

// // Located in cypress/support/commands.js

// Cypress.Commands.add("loginAndGetToken", () => {
//   return cy.request({
//     method: "POST",
//     url: "https://9ldgrpnq-3000.uks1.devtunnels.ms/login",
//     body: {
//       // Accessing the mapped variables
//       email: Cypress.env("EMAIL"),      // Mapped from USER_EMAIL
//       password: Cypress.env("PASSWORD") // Mapped from USER_PASSWORD
//     }
//   }).then((res) => {
//     const token = res.body.token;

//     // Store token globally for all tests
//     Cypress.env("jwtToken", token); // This is great for reusing the token!

//     return token;
//   });
// });

// Located in cypress/support/commands.js

// --- Custom command to retrieve an OTP from Yopmail ---
Cypress.Commands.add('getYopmailOtp', (emailAddress) => {
    
    const username = emailAddress.split('@')[0];
    const url = `https://yopmail.com/mail`;

    // 1. Make the request to the Yopmail inbox
    return cy.request({
        method: 'GET',
        url: url,
        qs: {
            login: username,
            d: 'm', // Mobile view for simpler parsing
        },
        failOnStatusCode: false, 
    })
    .then((response) => {
        
        // 2. Load response body to check for OTP
        // Using the standard Cypress Cheerio pattern
        const $ = Cypress.$.load(response.body); 
        
        const messageBody = $('#messa').text(); 
        const otpMatch = messageBody.match(/(\d{4,6})/);

        if (otpMatch && otpMatch[1]) {
            // Success: OTP found
            cy.log(`Successfully extracted OTP: ${otpMatch[1]}`);
            return otpMatch[1]; 
        } else {
            // Failure: OTP not found. Retry logic.
            cy.log(`OTP not found in email body. Waiting 3 seconds and retrying...`);
            cy.wait(3000); 
            // 3. Recursively call the command to try again
            return cy.getYopmailOtp(emailAddress); 
        }
    });
});

Cypress.Commands.add("loginAndGetToken", () => {
  return cy.request({
     method: "POST",
     // Using short path since baseUrl is set in cypress.config.js
    url: "/login",
     body: {
     
      email: Cypress.env("EMAIL"), 
      password: Cypress.env("PASSWORD") 
    }
  }).then((res) => {
   const token = res.body.token;

     // Store token globally for all tests
     Cypress.env("jwtToken", token); 

   return token;
   });
});