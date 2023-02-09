import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(`the user is logged in and opens the {string} page`, (target: string) => {
  cy.intercept('POST', `https://cognito-idp.us-east-1.amazonaws.com/`, (req) => {
    /** First cognito request */
    if (req.body.AuthFlow === 'USER_SRP_AUTH') {
      req.alias = 'cognito_request_1';
      req.reply({ fixture: 'auth/cognito_response_1' });
    }
    /** Second cognito request */
    if (
      req.body.ChallengeName === 'PASSWORD_VERIFIER' ||
      req.body.AuthFlow === 'REFRESH_TOKEN_AUTH'
    ) {
      req.alias = 'cognito_request_2';
      req.reply({ fixture: 'auth/cognito_response_2' });
    }
    /** Third cognito request */
    if (req.body.AccessToken) {
      req.alias = 'cognito_request_3';
      req.reply({ fixture: 'auth/cognito_response_3' });
    }
  });

  cy.intercept('POST', `https://cognito-idp.us-east-1.amazonaws.com/`, (req) => {
    if (req.body.IdentityPoolId) {
      req.alias = 'cognito_identity_1';
      req.reply({ fixture: 'auth/cognito_identity_response_1' });
    }
    if (req.body.IdentityId) {
      req.alias = 'cognito_identity_2';
      req.reply({ fixture: 'auth/cognito_identity_response_2' });
    }
  });

  cy.visit(target, {
    onBeforeLoad(win: Cypress.AUTWindow) {
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.ab477a2b-221f-4bc1-a4ac-4ff564b77ac4.refreshToken',
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.KdDbEXrH6N64aG2vcWsaVq26WxV2JxRCIS5L4t39y4AJO7Z4Us4IsxfGHwymxtC27mZSbv-sTYpJG_rc7Nb8iMMX74KQx1bx9i8JFS1toM0QJD2SKdFwFWzqVNmyxqgZ8zlifxPuzDA-dDauArvCKts5H-lQSgsaNZSmp1HZd0g9lxJusxvY-0sh0UClxoxFNCA4cJ-SZY1RjhelfGRF7xD7lA52KcXGT8n7mEbLEoD1A0G5ERuWih3RxxmnvMsA_CRwP1ZUOFmEVBe-ZGQ6ie3hajoIlVdSO2bCTH30h3suQBNcH6i6lxkhIHkGdSAtnRUAKeC0bpYdNR5qTmmMKg.DUa9V4U9NgWMU68L.yi64sdepcHsWqkpr8C9o31E8ig17OM4WOZldTSpKV6tGUKe3-2U5JbINtPkWt6ac4eS0DMzFm3tP9W_4dUwdfLaMHfD5ZOxuviuj0EKPt4Q7e4jejSJKehRpzb9XufSVIo4cfq57Q8mcd1J4TCLpmmV0ZY7dMVF5igEU3973PwAu3x6Eww0J77uE5Bzu9sHsJXRw-MHPRdOQlTwXD5J90DWulFRhHiltrSbHNnoxApEg0OhJd82RKwWydHM6OVm1ohaFduReSwXhIZTQYa_3Cgl2AX1dLu2S58PlwkXE6JQ1zHY-ZbSN3atJ7DNuK2B0jyH7sKfoqCreKyafmSygv9SPRsMxfCSvoIaS40cMhNmQPDln1i3AWFs6xScSeU_kQ-SGB-q8KKZUgZtpdkc2k8eqHM8hUFrpZOxjnI80Wk4APF5OzXY6Iy_LX0g-kci4iX7RS0o3eGSax0bGmnWDbrrdVkdqWthx_oYljh6UMbfi2Uhu0WJ4yDbjCrs-YbIQKnw5pNIjsQE54ww6aSFZG0Gc3RMEnECzIa6ZfcJWg3CLE6rfTc7_N2gUlvP1h4GDhExJCEAOB7q_tbubvaKkCkwf6ds61T1Uw5v30pbLflBqg3eATZ0KCk8TdKMO6AgKoIS1RqLMWtYP0pA2sU_-Rcv8ZGBCeqLY_TDwCERQ5AZSJCyeRH2H_j5vsWVHDcX6BQ7t_Zn4Ftyq6xWfpXRaL9MtJgUB0BdydzZR0gixbuZLO7hkhhItA6IVnNiYAiHihWo0xyS4TFB_PIzeW263Zk7N6UdMMcvrwYQWEZZKSmiq_XLez5lJrRRJIc6S_I5tCfV1w_FPz-iAxJGOEzRv8mTSqrH8MFx1v2x9BOfEgQlyDbAKixV2152PecqiJD352zareIAu-PDjyby9AxMeC6jd_nW_80n-45cVcfeWyJG29MwRpRFuXh7BcN2T4wX_U8TO8c7V88vXh7k0obHcThoTbxIFNOy34J60occSOrw8BHAW-ysyKSXwsv_nhXHj-Zz0t4WiaG1G2d1_xHkBbcTKwUv8SW9lmhG-caGXYXYE_5Z-AHZ64YEKm-vSNMTdKhlP4eMFabVTTkdC2D5LIKvwgu1WZ42wCwYcA4kr5srnHPCQTac2UveK8aIJesrDq5VmYOOc7Uqac3C3v51Vd5n1Lkr700yraMoZV-I8PvPoFbAXCHTkuIe_aaEfY1TdR3vLpda94k981x4TTncWRXdAYVilnN1TBNHshqV_eQlGBkajvKTedfN6qaJ9UdjCTIaSWrYAKlLpPAigEbcCioCBprngrGNEsZLJcMwsEK6_7aiTPPlhwnV0a-3UmA.fDk0JwcmUNXErCe3-twCFA'
      );
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.ab477a2b-221f-4bc1-a4ac-4ff564b77ac4.idToken',
        'eyJraWQiOiI3eEMzZ1AyaTdqWUVuQmE2MGFzNnJkWjd5SERlKzZnQTVya0wrU21jTGZjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2Y2MyOGMxOC0xYmQ5LTQ4YjAtYWFlYy00NDE2OWQ4MmIyYWMiLCJldmVudF9pZCI6IjZlNmRhZmE1LTZlOTMtNDVmMi1hN2FmLTI0ZDM1ZTkwNjg0MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTg0MDM3NTYsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xX21pN0NaUEFUOSIsImV4cCI6MTYxODQwNzM1NiwiaWF0IjoxNjE4NDAzNzU2LCJqdGkiOiJiZjFhNGYxMi04ZGI4LTQxYTUtYjI1NC00YjYyMzgxY2Y1OWYiLCJjbGllbnRfaWQiOiI2Y3E1ZGw3YmZtM2t1ZGFnYml0bnQwaHNtIiwidXNlcm5hbWUiOiI2Y2MyOGMxOC1hc2RmLWFzZGYtYXNkZi1hc2RmYXNkZmIyYWMifQ.XwJ9Rlc3SjkTOD0WsuipShjCcWnliDCwfMI1ksogkdU4Y7u70yvc6msLM2mEmIGnasWIOvgUIMyRb9r4Va45phxM5Itrg4OpVMQbX6m_GJw5wXW90OHqA4ChRhqwbsLxled1Gl9-kSvMZjH1idVnVLqC7XkuHe9cGR4Rv-L61Nh1SSmjFkaHqWQPECTfYbf5NdJl4HE1NBnzdoUdC20Adwb1HrAqcAKmi40dGH_Lnx6EMWHZmMGl0A11KoKtkx_t3wZzKkncTc6usIMxbjktpMNawtmUhxZbmmIRWH8rLEOLtE4TZb7VFupjXl9Lri-teqcIv7ZJbbTJYJIp8pRf2A'
      );
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.ab477a2b-221f-4bc1-a4ac-4ff564b77ac4.clockDrift',
        '0'
      );
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.LastAuthUser',
        'ab477a2b-221f-4bc1-a4ac-4ff564b77ac4'
      );
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.ab477a2b-221f-4bc1-a4ac-4ff564b77ac4.accessToken',
        'eyJraWQiOiJxVEdualdSVUlaUTlRVTU3YUZXUXJoeFI3Vkplcm5pYlpBbTJTWDkyRUI4PSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiOWFkMGVmMTEtMjlmZi00NTY3LWEzMzEtYWM4NWJiMWY5ODA4Iiwic3ViIjoiYWI0NzdhMmItMjIxZi00YmMxLWE0YWMtNGZmNTY0Yjc3YWM0IiwiZXZlbnRfaWQiOiJiNDFhMmYwNy1mYjAxLTQxNzktOWU0MC01MGQ5NTc4MzUwMjAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjQ3MDk0NjYwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9DN2VKMjlHaU8iLCJleHAiOjE2NDcwOTgyNjAsImlhdCI6MTY0NzA5NDY2MCwianRpIjoiMjI5ODk3MzctODg3Zi00NDc0LThlZjMtZGI5MjZmZWUzZDA1IiwiY2xpZW50X2lkIjoiM2U0MWlqb3JtYzB0YzFqZGJwdDNqbHFvdDkiLCJ1c2VybmFtZSI6ImFiNDc3YTJiLTIyMWYtNGJjMS1hNGFjLTRmZjU2NGI3N2FjNCJ9.pU44-PCCoZ1BTwqvRyDJi1DZHkdgdhtoA5q01fMbz4DOZBJ7AHGYumJZFKksYgOLNTz2hWK7oWpSZHCbyxNbEN_P255G2CL2mlruQ7O7W3ees9pXMSmpUbNATGmoOpx-aAm_VxYURsb7ImOBDpn4_E7Vxsm4B_O5IyOp7dtL_BYqzjtwL5V2G_vgO7I9q3L8nLUd-kOLhrQzNeFUglBhPntXlht9KW_kEtudz-OHarQDbobexYGlfH5Cwqy6jQpfm8QkWPcWIi6mPncxcGPmBtlSwMxMK-yK1ha5aT46Bf51NlivEG3BHq45FASDADuQoPumHz5tHC4YrtF0GOKLyA'
      );
      win.localStorage.setItem(
        'CognitoIdentityServiceProvider.dummyUserPoolWebClientId.ab477a2b-221f-4bc1-a4ac-4ff564b77ac4.userData',
        JSON.stringify({
          UserAttributes: [
            { Name: 'sub', Value: 'ab477a2b-221f-4bc1-a4ac-4ff564b77ac4' },
            { Name: 'email_verified', Value: 'true' },
            { Name: 'email', Value: 'john.mcClane@nakatomi.com' },
          ],
          Username: 'ab477a2b-221f-4bc1-a4ac-4ff564b77ac4',
        })
      );
      win.localStorage.setItem(
        'user',
        JSON.stringify({ cognitoId: 'ab477a2b-221f-4bc1-a4ac-4ff564b77ac4', emailVerified: true })
      );
    },
  });
});
