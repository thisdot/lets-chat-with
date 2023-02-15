# LCW Serverless Backend

This part of the documentation will give you some tips & tricks for developing using serverless.

## File Structure

The [serverless.yml](./serverless.yml) config file is organized into the following sections:

- `plugins`
  - Specifies all the plugins we use i.e. `serverless-appsync-plugin`, `serverless-dynamodb-local`
- `package`
  - Specifies patterns that decide what files are bundled with each lambda.
- `params`
  - Defines stage-specific parameters
- `provider`
  - This is relevant mostly for lambdas. It specifies the permissions that lambdas have, as well as environment variables that are injected into each lambda.
- `functions`
  - Here you specify the lambdas that our backend will have. Have a look at the [Creating new lambdas](#creating-new-lambdas) section below for more information on how to create new lambdas.
- `custom`
  - This is a plugin configuration. It contains a configuration for DynamoDB offline, as well as for the AppSync plugin. The AppSync plugin references several files:
    - [serverless.mapping-templates.yml](./serverless.mapping-templates.yml)
      - **You don't need to edit this file.** This file is generated automatically by the `process-schema` task and contains mappings between GraphQL types and VTL templates.
    - [serverless.appsync-function-configs.yml](./serverless.appsync-function-configs.yml)
      - This file can be modified. It contains mappings between lambda data sources and VTL templates (the VTL template is the same for all lambdas). Whenever you have a lambda that is specified in the [amplify-schema.graphql](./amplify-schema.graphql) file, you need to include it here. Just follow the convention for other lambdas.
    - [serverless.data-sources](./serverless.data-sources.yml)
      - This file can also be modified. Here you should specify all lambda data sources and DynamoDB data sources. If you need to add new tables to the database have a look at [Creating new tables](#creating-new-tables) section for more details.
  - `resources`
    - This specifies all AWS resources that we are creating. Since there are many of them, they are listed in a separate file: [serverless.resources.yml](./serverless.resources.yml)

## Creating New Environment (Or Re-Creating Existing One)

If you ever need to create a new environment in addition to the existing one, or if you need to drop and re-create an existing environment, this will re-generate some identifiers which the UI requires.

These are the properties in the root environment file found at `<root-dir>/.env` you will need to set for your new environment:

```shell
GRAPHQL_ENDPOINT="https://<your-serverless-subdomain>.appsync-api.<your-region>.amazonaws.com/graphql"
USER_POOL_ID="<your-user-pool-id>"
USER_POOL_WEB_CLIENT_ID="<your-user-pool-web-client-id>"
```

- You'll find the `GRAPHQL_ENDPOINT` in the console output of `sls deploy`.
- You'll find the `USER_POOL_ID` under [Cognito User Pools](https://console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1).
- You'll find the `USER_POOL_WEB_CLIENT_ID` if you open the above user pool and go to "App integration", and scroll down to the bottom.

## Creating New Lambdas

Creating new lambdas is straightforward as long as we follow the conventions which are currently used in the serverless config file.

First, create the actual lambda file in `serverless/handlers/lambda-name-in-kebab-case/index.js`. The lambda file at a minimum could look like this:

```javascript
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

async function handler(event) {
  // Your implementation
}

exports.handler = handler;
```

Now, add the lambda to the serverless config under the `functions` property:

```
functions:
  lambdaNameInCamelCase:
    handler: handlers/lambda-name-in-kebab-case/index.handler
```

That's it - the lambda can be deployed through `sls deploy`. For more advanced cases, here are some other tips:

- If you need to access any DynamoDB tables, then you need to provide the DynamoDB table names through the environment. This is done in the `provider.environment` property.
- If the lambda will be a DynamoDB trigger, see `generateCandidates` for additional properties you'll need to specify.
- If the lambda will be a Cognito trigger, see `addUserAfterConfirmation` for additional properties you'll need to specify.
- If you need to invoke the lambda through GraphQL, then have a look at `updateAttendee` as an example.
  - you'll need to add it to [amplify-schema.graphql](./amplify-schema.graphql)
  - run the `process-schema` task from the root [package.json](../package.json)
  - add it to [serverless.appsync-function-configs.yml](./serverless.appsync-function-configs.yml)
  - add it to [serverless.data-sources.yml](./serverless.data-sources.yml)

## Creating New Tables

The first step for creating new tables is modeling the respective types and annotating them with the `@model` directive in the GraphQL schema: [amplify-schema.graphql](./amplify-schema.graphql). If you need to have relationships between tables, they are specified by the `@connection` directive. Once the schema is updated, run the `process-schema` task to generate mappings for it in the [serverless.mapping-templates.yml](./serverless.mapping-templates.yml) file.

Afterward, define the data sources in the [serverless.data-sources.yml](./serverless.data-sources.yml) file. The purpose of this file is to define the actual DynamoDB tables that will be used by the types in the GraphQL schema. The naming convention of each DynamoDB resource is `[TypeName]DataSource`. See `AttendeeDataSource` for an example.
