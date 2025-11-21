// // // const { defineConfig } = require("cypress");

// // // module.exports = defineConfig({
// // //   e2e: {
// // //     setupNodeEvents(on, config) {
// // //       // implement node event listeners here
// // //     },
// // //   },
// // // });

// // require('dotenv').config();
// // const { defineConfig } = require('cypress');

// // module.exports = defineConfig({
// //   reporter: "mochawesome",
// //   reporterOptions: {
// //     reportDir: "cypress/reports",
// //     overwrite: false,
// //     html: true,
// //     json: true
// //   },

// //   e2e: {
// //     baseUrl: 'https://9ldgrpnq-3000.uks1.devtunnels.ms',
// //     video: true,
// //     screenshotsFolder: "cypress/screenshots",
// //     videosFolder: "cypress/videos",
// //     setupNodeEvents(on, config) {
// //       config.env.BASE_URL = process.env.BASE_URL;
// //       config.env.NAME = process.env.USER_NAME;
// //       config.env.PASSWORD = process.env.USER_PASSWORD;
// //       config.env.OTP = process.env.OTP;
// //       config.env.EMAIL = process.env.USER_EMAIL;
// //       config.env.UNVERIFIED_EMAIL = process.env.UNVERIFIED_EMAIL;
// //       config.env.SSN = process.env.USER_SSN;
// //       config.env.SHORT_PASSWORD = process.env.SHORT_PASSWORD;
// //       config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;
// //       const env = config.env.configFile || 'dev';
// //       const path = `.env.${env}`;
// //       dotenv.config({ path });
      
// //       // CRITICAL FIX: Set the baseUrl from the environment variable
// //       if (process.env.CYPRESS_BASE_URL) {
// //           config.baseUrl = process.env.CYPRESS_BASE_URL;
// //       }

// //       // Mapping other variables:
// //       config.env.EMAIL = process.env.USER_EMAIL;
// //       // ... other mappings ...

// //       console.log(`Cypress is running against: ${config.baseUrl}`);
// //       return config;
// //     },
// //   }
// // });

// const { defineConfig } = require('cypress');
// const dotenv = require('dotenv'); 


// module.exports = defineConfig({
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: true
//   },

//   e2e: {
//     // This is the static fallback URL.
//     baseUrl: 'https://9ldgrpnq-3000.uks1.devtunnels.ms',
//     video: true,
//     screenshotsFolder: "cypress/screenshots",
//     videosFolder: "cypress/videos",

//     setupNodeEvents(on, config) {
      
//       const env = config.env.configFile || 'dev';
//       const path = `.env.${env}`;
  
//       dotenv.config({ path }); 

//       config.env.BASE_URL = process.env.BASE_URL;
//       config.env.NAME = process.env.USER_NAME;
//       config.env.PASSWORD = process.env.USER_PASSWORD;
//       config.env.OTP = process.env.OTP;
//       config.env.EMAIL = process.env.USER_EMAIL;
//       config.env.UNVERIFIED_EMAIL = process.env.UNVERIFIED_EMAIL;
//       config.env.SSN = process.env.USER_SSN;
//       config.env.SHORT_PASSWORD = process.env.SHORT_PASSWORD;
//       config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;


//       // STEP 3: DYNAMIC BASE URL (Overwrite the static baseUrl if provided)
//       if (process.env.CYPRESS_BASE_URL) {
//           config.baseUrl = process.env.CYPRESS_BASE_URL;
//       }

//       console.log(`Cypress is running against: ${config.baseUrl}`);
//       return config;
//     },
//   }
// });

const { defineConfig } = require('cypress');
const dotenv = require('dotenv'); 

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: 'https://9ldgrpnq-3000.uks1.devtunnels.ms',
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    setupNodeEvents(on, config) {
      
      // 1. --- CRITICAL FIX: LOAD THE FILE FIRST ---
      // Determine environment (defaults to 'dev')
      const env = config.env.configFile || 'dev';
      const path = `.env.${env}`;
      
      // THIS MUST HAPPEN FIRST to populate process.env
      dotenv.config({ path }); 
      
      // 2. --- MAPPING: MAP LOADED VARIABLES INTO CYPRESS ---
      // Now that process.env is populated, we map the values safely.
      config.env.BASE_URL = process.env.BASE_URL;
      config.env.NAME = process.env.USER_NAME;
      config.env.PASSWORD = process.env.USER_PASSWORD;
      config.env.OTP = process.env.OTP;
      config.env.EMAIL = process.env.USER_EMAIL;
      config.env.UNVERIFIED_EMAIL = process.env.UNVERIFIED_EMAIL;
      config.env.SSN = process.env.USER_SSN;
      config.env.SHORT_PASSWORD = process.env.SHORT_PASSWORD;
      config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;


      // 3. DYNAMIC BASE URL
      if (process.env.CYPRESS_BASE_URL) {
          config.baseUrl = process.env.CYPRESS_BASE_URL;
      }

      console.log(`Cypress is running against: ${config.baseUrl}`);
      return config;
    },
  }
});
