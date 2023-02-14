export const environment = {
  production: false,
  graphQlEndpoint: process.env.GRAPHQL_ENDPOINT,
  cognito: {
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
  },
  awsRegion: process.env.REGION,
};
