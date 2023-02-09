// These are settings for Cypress E2E tests
// If you will change them, make sure to update the mocks in common.auth.steps.ts, etc.
export const environment = {
  production: true,
  graphQlEndpoint: 'http://localhost:20002/graphql',
  cognito: {
    userPoolId: 'us-east-1_dummyPool',
    userPoolWebClientId: 'dummyUserPoolWebClientId',
  },
  awsRegion: 'us-east-1',
};
