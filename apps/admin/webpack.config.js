const webpack = require('webpack');

const ALLOWED_ENVIRONMENT_VARIABLES = new Set([
  'REGION',
  'ENVIRONMENT',
  'GRAPHQL_ENDPOINT',
  'USER_POOL_ID',
  'USER_POOL_WEB_CLIENT_ID',
]);

function getClientEnvironment(configuration) {
  const raw = Object.keys(process.env)
    .filter((key) => ALLOWED_ENVIRONMENT_VARIABLES.has(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || configuration,
      }
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment(context.configuration)));
  return config;
};
