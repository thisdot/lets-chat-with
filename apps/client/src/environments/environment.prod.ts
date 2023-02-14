export const environment = {
  production: true,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  graphQlEndpoint: process.env.GRAPHQL_ENDPOINT,
  cognito: {
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
  },
  awsRegion: process.env.REGION,
};
