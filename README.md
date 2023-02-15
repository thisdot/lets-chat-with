# Let's Chat With

## Installation Instructions

### AWS

The first step is to install the AWS CLI. Follow the [official guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) for the installation instructions on your operating system. Once you have AWS installed, you need to create a local profile with the access key.

You will need Access Key ID and Secret Access Key. We suggest creating a new IAM user on your AWS account and add the following permissions policies to it:

- AmazonDynamoDBFullAccess
- IAMFullAccess
- PowerUserAccess

After creating a new user you need to create an access key. You can do that in the `Security credentials` tab of edit user page. The `Access Key ID` and `Secret Access Key` will be necessary for the next step

> The profile doesn't need to be named **lcw**, but it's recommended.

Run the following to save the Access Key ID and Secret Access Key to local configuration in the `~/.aws` folder in the profile named `lcw`.

```shell
aws configure --profile lcw

AWS Access Key ID [None]: YOURACCESSKEYID
AWS Secret Access Key [None]: YOURSECRETACCESSKEY
Default region name [None]: YOUR-REGION (e.g. us-east-1)
Default output format [None]: json
```

### Amplify

Next, install the Amplify CLI. The Amplify CLI is used only for code generation:

```shell
npm install -g @aws-amplify/cli
```

Now install the Serverless Framework CLI. This one is used for backend deployment:

```shell
npm install -g serverless
```

Since there are two `package.json` files, one in the root folder, and one in the serverless folder, you will need to run `npm install` twice. (In the future, we may simplify this.)

```shell
npm install
cd serverless
npm install
```

While in the `serverless` folder, create a file named `.env` for your environment variables and add the `REGION` and `AWS_PROFILE` properties, which are mandatory. For example, this should be the content of the file if your AWS is named `lcw` as suggested earlier and uses the `us-east-1` region:

```md
REGION=us-east-1
AWS_PROFILE=lcw
```

### Angular

To be able to use the Angular CLI run the following command:

```bash
npm install -g @angular/cli
```

### User Pool

In order to use the app and seed it locally, you need to have a User Pool set up in AWS. You can do that in the AWS management console:

- Go to Amazon Cognito and click "Create user pool".
- In the first step, as a sign-in option, select "Email".
- In the second step, choose "Cognito defaults" as Password policy and "No MFA" for Multi-factor authentication.
- In the third step, leave everything at default.
- In the fourth step, select "Send email with Cognito".
- In the fifth step, just enter names for your user pool and app client.
- In the last step, review your settings and create the user pool.

> If you are planning to deploy a staging environment and use its user pool for local development, you can skip to the "Configuring Environments and Deployment" section. And then fill in the value of the created pool into your `.env`.

The newly created pool information needs to be configured in [.env](./.env) for the main app and in [serverless/.env](./serverless/.env) for the admin app. You can find the `USER_POOL_ID` directly in the list of your user pools or in the details of the pool in the "User pool overview" section. To obtain `USER_POOL_WEB_CLIENT_ID` you need to go to the pool details and under `App integration` tab find `App client list` section you'll find the `Client ID` value.

> Don't forget to also replace the `REGION` value in your `.env` files with the actual region you are using (e.g. "us-east-1").

### Offline Serverless Backend

In order to have some initial data available we've created a script to generate some Cognito users and seed data. You can run the following command (from the root directory) and follow the prompts to generate the seed data:

```shell
npm run generate-seed-data
```

**IMPORTANT NOTE:** You need to run this command at least once to have some seed data available before running offline serverless backend. You will also be prompted for the Cognito user pool id that should have been generated earlier.

The initial password for each user is set to `TestPassword1.`

Install Java by any means you wish - as long as the `java` binary is in the PATH environment variable. For example, you can use Brew:

```shell
brew install java
```

Add the Java folder to PATH as suggested by the installer.

Install Watchman. Watchman will monitor your directory for changes to your GraphQL schema or lambdas.

```shell
brew install watchman
```

Now for these next commands we need to change our working directory into the `serverless/` subdirectory, otherwise they will not work. This is the case for all of the `sls` command invocations. The `sls` command is in the PATH if serverless is installed globally. If you installed it as instructed before, then it should be accessible.

Install DynamoDB locally:

```shell
sls dynamodb install
```

To verify that Serverless offline works, execute the following command:

```shell
sls offline start
```

You can also invoke `npm start` to start the `sls` offline server in the root directory of the project.

The above command will automatically migrate and seed the DynamoDB tables whenever it executed. You can verify that the backend is running by opening the health check endpoint http://localhost:3000/health-check. Press Cmd+C/Ctrl+C to stop it once you've verified that it works.

However if the profile you're using isn't the default one, make sure to specify it using the `AWS_PROFILE` environment variable.

```shell
# Linux / macOS
export AWS_PROFILE=profile_name

# Windows
set AWS_PROFILE=profile_name
```

**NOTE:** If at any point any of the `sls` invocations fail, make sure to clean up any `java` processes lingering in the background. When `sls` fails it doesn't always do a great job of cleaning itself up and will forget to release ports that may prevent future invocations from working properly.

## Quick Start

Before running the server you need to have some environment variables set in the root `.env` file. We keep some of the environment configuration values outside of source control so that we don't need to commit changes to them to alter those values. You can copy the `.env.example` file as `.env` as a baseline to get started.

```shell
# Replace these values with your own.
REGION=us-east-1
ENVIRONMENT=staging
# Use the local serverless GraphQL API.
GRAPHQL_ENDPOINT="http://localhost:20002/graphql"
# Cognito credentials that you need to generate yourself.
USER_POOL_ID="<your-user-pool-id>"
USER_POOL_WEB_CLIENT_ID="<your-user-pool-web-client-id>"
```

After all the above installations and your environment variables are set in the root `.env`, you can now run the client app for the first time. To do so, it's as simple as running:

```shell
npm run start:local
```

for local development or

```shell
npm run start
```

to run against the config you have in [apps/client/src/environments/environment.ts](./apps/client/src/environments/environment.ts). You can put either local or remote configuration in that file.

**Note:** The Angular CLI serve allows for live reloading of the app whenever you make changes to the client app code. However, there's a bug with this project that causes the CLI to live reload when no active code changes have been made and will reload on you frequently during development. To avoid this, you can run (just remember to refresh your browser by hand when you make changes!):

```shell
npm run start:noreload
```

Once the app is running on http://localhost:4200/, you should see the app's sign in page. If this is your first time running the app, go ahead and create your account in the signup flow on http://localhost:4200/signup (use a real email you have access to, you will need to multi-factor authenticate!). One helpful tip for development is if you use a Gmail account, you can sign up as multiple users using one email account. To do so, just add a `+1` at the end of your handle. For example: `letschatwith@thisdot.co`, `letschatwith+1@thisdot.co`, `letschatwith+2@thisdot.co`, etc.

After signing in with your newly created account, you will notice your only option is to join a conference. Select the `Enter conference URL`, there are a few different conferences you can join if you look through `serverless/seed/event.json`, but for now you can just type `ngconf` to quickly proceed. There will be a few screens with basic prompts to fill out, this will create your **conference specific** `Attendee` object and any other conferences you join you will see these same prompts. Take special note of the interests and identifiers you select -- usually for testing it's easiest to select them all, but the selections do matter for potential matches!

Depending on the state of the databases and how often people are testing, you may not see any cards. Log into a `+1` user in a separate browser/browser instance and follow the same steps and choose similar interests/identfiers, the two users should see each other's cards and be able to match each other. From there you can interact/unmatch/report, edit your conference profile, and join other conferences as you need!

### Admin App

You can start the admin app in a similar way by running:

```shell
npm run start:admin:local
```

or

```shell
npm run start:admin
```

**Note:** Just like for the client app, the admin app also needs to be configured. Make sure your AWS credentials are in `libs/client/admin/core/environments/src/lib/environment.local.ts` when running the local server, or whatever the respective environment file is if you're testing another configuration.

The app will run on http://localhost:4201.

But you will not be able to log in as a normal user because only administrators can log in. To be an administrator, a userneeds to be a member of a group called `ADMINS`. Therefore you need to create a group with that name in your user pool if it doesn't exist already and add a user to it. You should be then able to log in as that user into the admin app.

## Configuring Environments and Deployment

Aside from developing locally, you'll also want to set up and deploy online environments.
The repos come prepared for two environments: "staging" and "production".

### Deploying serverless backend

If you are setting up the project, or you've made changes to your backend you will need to deploy your serverless app to AWS. Because we need to create an S3 bucket which has to be globally unique we are using `bucketSuffix` param in the [serverless/serverless.yml](./serverless/serverless.yml) file. Please generate your own uuid (or a different unique suffix value of your choice) and put it instead of the default value.

You will also need to know the URLs at which your FE apps will be available and configure these URLs in the `confirmationMailRedirectUrl` field in your [serverless/serverless.yml](./serverless/serverless.yml) file by replacing the placeholder `<dev-app-url>` and `<production-app-url>` values in order for your app to redirect users properly to the email confirmation page.

After configuring the bucket suffix and `confirmationMailRedirectUrl` you should be able to deploy the backend by running the following command inside of `serverless` directory:

```shell
sls deploy --stage <dev | prod> --region <my-region>
```

So for example if you want to deploy to the staging environment and your region is `us-east-1`, the command would be:

```shell
sls deploy --stage dev --region us-east-1
```

You can also use the `--appURL` and `bucketSuffix` parameters when running `sls deploy` instead of replacing them in the `serverless.yml` file:

```shell
sls deploy --stage dev --region us-east-1 --param="bucketSuffix=someUUID" --param="appURL=https://my-url"
```

After you deploy the app you will see the GraphQL endpoint URL in the console output. It will look like that:

```
appsync endpoints:
  https://<unique-appsync-id>.appsync-api.<region>.amazonaws.com/graphql
```

Copy that URL and put as `graphQlEndpoint` property into:

- [apps/client/src/environments/environment.stage.ts](./apps/client/src/environments/environment.stage.ts) and [apps/client/src/environments/environment.stage.ts](./apps/client/src/environments/environment.stage.ts) in case of staging ("dev") and
- [apps/client/src/environments/environment.prod.ts](./apps/client/src/environments/environment.prod.ts) and [apps/client/src/environments/environment.prod.ts](./apps/client/src/environments/environment.prod.ts) in case of production environment ("prod").

In the same files, you will also need to configure your Cognito properties.

When deploying the app a new Cognito user pool was created. You can find it in your AWS console under `CognitoPool_dev` name in case of staging environment and `CognitoPool_prod` in case of production. User pool id should be visible in the list of your pools. To obtain `userPoolWebClientId` you need to go to the pool details and under `App integration` tab find `App client list` section you'll find the `Client ID` value.

In case you skipped creating a user pool for local development, you will also need to use the same Cognito user pool values in [apps/client/src/environments/environment.local.ts](./apps/client/src/environments/environment.local.ts) and [apps/client/src/environments/environment.local.ts](./apps/client/src/environments/environment.local.ts)

> Don't forget to also replace the `<region>` placeholder in your environment files with the actual region you are using (e.g. "us-east-1").

Then you can build and deploy the front end applications e.g. to AWS Amplify and they should be able to communicate with your serverless backends. You can also use the staging environment to develop against.

### Offline Testing

As noted in the installation steps, there is a serverless capability in the app which allows development of the app and its backend in a nearly 100% offline scenario. First, you need to ensure that you're running the seeded serverless dynamodb process, as lined out in the [offline backend section](#offline-serverless-backend). Currently, AWS Cognito is still not mockable in our serverless setup, so you will still need to have signed up and logged in as a real user. You will also need to add your User to [the seed](./serverless/seed/user.json) -- with the app running (in normal online scenario) and your user logged in, open the console, switch to the network tab, and select `XHR/Fetch` to filter only our network calls. Find the `graphql` call that fetched `getUserByOwner` (you may need to refresh to see it) and add your user in the following format to `user.json`, substituting your `owner` and `id` IDs in the fetch response you just grabbed:

```json
{
  "__typename": "User",
  "notificationConfig": {
    "matches": true,
    "messages": true,
    "subscribe": true
  },
  "updatedAt": "2022-03-02T16:53:34.056Z",
  "createdAt": "2022-03-02T16:53:34.056Z",
  "owner": "a5a21abf-67bc-4ecf-ad18-efba8a07f4b8",
  "id": "d04cc28e-89d2-49dc-8db7-3c93c1b581f6",
  "email": "you@thisdot.co"
}
```

Also, update the `email` property so that we know who this record belongs to.

In the project root, run `npm run start:serverless:dynamodb` in one terminal, while one of the following commands in another:

```shell
npm run start:local
```

or

```shell
npm run start:local:noreload
```

This will both start the offline DynamoDB process and the UI.

Sign into your account if not already, and open the Network tab in your console, if the app is successfully fetching `graphql` calls from `localhost`, you're successfully running the app in offline mode!

## Compodoc

For further documentation of the Client app's code and structure, run:

```shell
npm run compodoc:client:start
```

## Tech Stack

Check out the [Tech Stack Docs](./docs/technology-stack.md).

## Serverless Framework

Check out the [Serverless Framework Docs](./serverless/README.md).

## Development Workflow

Check out the [Development Workflow Docs](./docs/development-workflow.md).

## Architectural Guidelines

Check out the [Architectural Guidelines Docs](./docs/architectural-guidelines.md).

## Testing

Check out the [Testing Docs](./docs/testing.md).

## Storybook

Check out the [Storybook Docs](./docs/storybook.md).

## CI/CD

Check out the [CI/CD Docs](./docs/ci-cd.md).

## Additional Resources

Check out the [Additional Resources Docs](./docs/additional-resources.md).

## Contributors

| [<img alt="Amdrel" src="https://avatars.githubusercontent.com/u/4316134?v=4&s=117" width="117">](https://github.com/Amdrel) | | [<img alt="TapaiBalazs" src="https://avatars.githubusercontent.com/u/13385210?v=4&s=117" width="117">](https://github.com/TapaiBalazs) | | [<img alt="ktrz" src="https://avatars.githubusercontent.com/u/22615575?v=4&s=117" width="117">](https://github.com/ktrz) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [Amdrel](https://github.com/Amdrel)                                              | |                                             [TapaiBalazs](https://github.com/TapaiBalazs)                                              | |                                             [ktrz](https://github.com/ktrz)                                              |

| [<img alt="cmwhited" src="https://avatars.githubusercontent.com/u/18075124?v=4&s=117" width="117">](https://github.com/cmwhited) | | [<img alt="Coly010" src="https://avatars.githubusercontent.com/u/12140467?v=4&s=117" width="117">](https://github.com/Coly010) | | [<img alt="dariodjuric" src="https://avatars.githubusercontent.com/u/5459296?v=4&s=117" width="117">](https://github.com/dariodjuric) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [cmwhited](https://github.com/cmwhited)                                              | |                                             [Coly010](https://github.com/Coly010)                                              | |                                             [dariodjuric](https://github.com/dariodjuric)                                              |

| [<img alt="dillionmegida" src="https://avatars.githubusercontent.com/u/42855542?v=4&s=117" width="117">](https://github.com/dillionmegida) | | [<img alt="dustinsgoodman" src="https://avatars.githubusercontent.com/u/1815379?v=4&s=117" width="117">](https://github.com/dustinsgoodman) | | [<img alt="frederikprijck" src="https://avatars.githubusercontent.com/u/2146903?v=4&s=117" width="117">](https://github.com/frederikprijck) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [dillionmegida](https://github.com/dillionmegida)                                              | |                                             [dustinsgoodman](https://github.com/dustinsgoodman)                                              | |                                             [frederikprijck](https://github.com/frederikprijck)                                              |

| [<img alt="hawkgs" src="https://avatars.githubusercontent.com/u/4449497?v=4&s=117" width="117">](https://github.com/hawkgs) | | [<img alt="iansamz" src="https://avatars.githubusercontent.com/u/15368874?v=4&s=117" width="117">](https://github.com/iansamz) | | [<img alt="flakolefluk" src="https://avatars.githubusercontent.com/u/11986564?v=4&s=117" width="117">](https://github.com/flakolefluk) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [hawkgs](https://github.com/hawkgs)                                              | |                                             [iansamz](https://github.com/iansamz)                                              | |                                             [flakolefluk](https://github.com/flakolefluk)                                              |

| [<img alt="honzikec" src="https://avatars.githubusercontent.com/u/11267785?v=4&s=117" width="117">](https://github.com/honzikec) | | [<img alt="jdwilkin4" src="https://avatars.githubusercontent.com/u/67210629?v=4&s=117" width="117">](https://github.com/jdwilkin4) | | [<img alt="JiaLiPassion" src="https://avatars.githubusercontent.com/u/1442575?v=4&s=117" width="117">](https://github.com/JiaLiPassion) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [honzikec](https://github.com/honzikec)                                              | |                                             [jdwilkin4](https://github.com/jdwilkin4)                                              | |                                             [JiaLiPassion](https://github.com/JiaLiPassion)                                              |

| [<img alt="KyleMit" src="https://avatars.githubusercontent.com/u/4307307?v=4&s=117" width="117">](https://github.com/KyleMit) | | [<img alt="thetaPC" src="https://avatars.githubusercontent.com/u/13530427?v=4&s=117" width="117">](https://github.com/thetaPC) | | [<img alt="morgnism" src="https://avatars.githubusercontent.com/u/9042219?v=4&s=117" width="117">](https://github.com/morgnism) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [KyleMit](https://github.com/KyleMit)                                              | |                                             [thetaPC](https://github.com/thetaPC)                                              | |                                             [morgnism](https://github.com/morgnism)                                              |

| [<img alt="NachoVazquez" src="https://avatars.githubusercontent.com/u/9338604?v=4&s=117" width="117">](https://github.com/NachoVazquez) | | [<img alt="primedev22" src="https://avatars.githubusercontent.com/u/29854456?v=4&s=117" width="117">](https://github.com/primedev22) | | [<img alt="robocel" src="https://avatars.githubusercontent.com/u/7085874?v=4&s=117" width="117">](https://github.com/robocel) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [NachoVazquez](https://github.com/NachoVazquez)                                              | |                                             [primedev22](https://github.com/primedev22)                                              | |                                             [robocel](https://github.com/robocel)                                              |

| [<img alt="Zelig880" src="https://avatars.githubusercontent.com/u/9040770?v=4&s=117" width="117">](https://github.com/Zelig880) | | [<img alt="stevenspads" src="https://avatars.githubusercontent.com/u/496718?v=4&s=117" width="117">](https://github.com/stevenspads) | | [<img alt="tvanantwerp" src="https://avatars.githubusercontent.com/u/2487968?v=4&s=117" width="117">](https://github.com/tvanantwerp) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [Zelig880](https://github.com/Zelig880)                                              | |                                             [stevenspads](https://github.com/stevenspads)                                              | |                                             [tvanantwerp](https://github.com/tvanantwerp)                                              |

| [<img alt="wescopeland" src="https://avatars.githubusercontent.com/u/3984985?v=4&s=117" width="117">](https://github.com/wescopeland) | | [<img alt="WillHutt" src="https://avatars.githubusercontent.com/u/20880360?v=4&s=117" width="117">](https://github.com/WillHutt) | | [<img alt="BrettZeidler" src="https://avatars.githubusercontent.com/u/54006458?v=4&s=117" width="117">](https://github.com/BrettZeidler) |
| :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: | | :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [wescopeland](https://github.com/wescopeland)                                              | |                                             [WillHutt](https://github.com/WillHutt)                                              | |                                             [BrettZeidler](https://github.com/BrettZeidler)                                              |

| [<img alt="devpato" src="https://avatars.githubusercontent.com/u/11162114?v=4&s=117" width="117">](https://github.com/devpato) |
| :------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [devpato](https://github.com/devpato)                                              |
