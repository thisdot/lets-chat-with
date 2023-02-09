# Testing

[//]: # 'TODO: Add best practices, required code coverage, etc.'

## E2E Testing

E2E testing is provided by Cypress. You can run the E2E tests using the `npm run e2e` or `ng e2e` commands.

## Unit/Integration Testing

Non-E2E testing is available via the standard `npm run test` or `ng test` commands. If you want to run the test for just a specific workspace, you can use:

```
ng run <client|api|shared>:test
```

For development, you can additionally provide the `--watch` flag.
