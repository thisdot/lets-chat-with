export const environment = {
  production: true,
  googleAnalyticsId: '<my-google-analytics-id>',
  graphQlEndpoint: 'https://<unique-appsync-id>.appsync-api.<region>.amazonaws.com/graphql',
  cognito: {
    userPoolId: '<production-user-pool-id>',
    userPoolWebClientId: '<production-user-pool-web-client-id>',
  },
  awsRegion: '<region>',
};
