const { ModelAuthTransformer } = require('graphql-auth-transformer');
const { FunctionTransformer } = require('graphql-function-transformer');
const { KeyTransformer } = require('graphql-key-transformer');
const { ModelConnectionTransformer } = require('graphql-connection-transformer');
const { DynamoDBModelTransformer } = require('graphql-dynamodb-transformer');
const { GraphQLTransform } = require('graphql-transformer-core');
const { SearchableModelTransformer } = require('graphql-elasticsearch-transformer');
const path = require('path');
const fs = require('fs');
const SCHEMA = fs.readFileSync(path.join(__dirname, 'amplify-schema.graphql')).toString();

// Source: https://medium.com/collaborne-engineering/generate-appsync-vtl-files-without-amplify-cli-e5658fca2da5
const transformer = new GraphQLTransform({
  featureFlags: {
    getBoolean: () => true,
  },
  transformConfig: {
    Version: 5, // We fake the version so that *InputCondition types are generated
  },
  transformers: [
    new DynamoDBModelTransformer(),
    new SearchableModelTransformer(),
    new KeyTransformer(),
    new FunctionTransformer(),
    new ModelConnectionTransformer(),
    new ModelAuthTransformer({
      authConfig: {
        defaultAuthentication: {
          authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        },
      },
    }),
  ],
});
const out = transformer.transform(SCHEMA);
fs.writeFileSync(path.join(__dirname, './appsync-schema.graphql'), out.schema);

Object.keys(out.resolvers).forEach((key) => {
  const vtl = out.resolvers[key];
  fs.writeFileSync(path.resolve(path.join(__dirname, './mapping-templates'), key), vtl);
});

function getDataSource(dataSourceName) {
  if (dataSourceName === 'NONE') {
    return 'NONE';
  }
  if (dataSourceName.name === 'Fn::ImportValue') {
    return dataSourceName.payload.payload[1][2];
  }
  return dataSourceName['Fn::GetAtt'][0];
}
function createServerlessResources(entity) {
  const unitResolvers = Object.values(out.stacks[entity].Resources)
    .filter((resource) => resource.Type === 'AWS::AppSync::Resolver' && !resource.Properties.Kind)
    .map((resource) => {
      const props = resource.Properties;
      const type = props.TypeName;
      const field = props.FieldName;
      const datasource = getDataSource(props.DataSourceName);
      return `
  - type: ${type}
    field: ${field}
    dataSource: ${datasource}
    request: ${type}.${field}.req.vtl
    response: ${type}.${field}.res.vtl`;
    })
    .join('');

  const pipelineResolvers = Object.values(out.stacks[entity].Resources)
    .filter((resource) => resource.Type === 'AWS::AppSync::Resolver' && resource.Properties.Kind)
    .map((resource) => {
      const props = resource.Properties;
      const type = props.TypeName;
      const field = props.FieldName;
      // ToDo add support for reading multiple functions
      const functionName = resource.Properties.PipelineConfig.Functions[0]['Fn::GetAtt'][0];
      return `
  - type: ${type}
    field: ${field}
    kind: 'PIPELINE'
    request: ${type}.${field}.req.vtl
    response: ${type}.${field}.res.vtl
    functions:
      - ${functionName}`;
    })
    .join('');

  return unitResolvers + pipelineResolvers;
}
const serverless = Object.keys(out.stacks).map(createServerlessResources).join('\n');
fs.writeFileSync(path.join(__dirname, './serverless.mapping-templates.yml'), serverless);

console.log('%cSchema generated successfully', 'color: green');
