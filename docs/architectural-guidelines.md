# Architectural Guidelines

## Monorepo Architectural Guidelines

LCW uses a monorepo architecture with Nx to organize the codebase. The following sections describes a set of patterns that are used to guide the development of LCW.

### Library types

Nrwl describes in its [free ebook](https://connect.nrwl.io/app/books/enterprise-angular-monorepo-patterns) and [website documentation](https://nx.dev/latest/react/structure/library-types) some patterns and guidelines for splitting our applications into libraries.

These divisions are focused on increasing our applications' shareability, organization, and even performance (tooling).

When splitting our functionalities into library types, we are effectively creating layers, and by the use of tags, we can create layers restriction, both horizontally and vertically.

We would extend over the Nrwl recommendations for the current project and described the desired architecture with a multi-platform (web and mobile) approach in mind.

Nrwl also provides some guidelines about tagging our libraries and applying layer restrictions in the mentioned architecture book and [website documentation](https://nx.dev/structure/monorepo-tags#tags).

There are two main categories of tags, `scope` and `type.`

Scope tags are used to define the vertical layers, and `type` tags are used to determine horizontal layers.

This guideline will show examples of splitting libraries and tags, but refer to the provided documentation for deeper analysis.

Finally, we will describe how to define `grouping folders` for additional structure. Grouping folders are folders that contain libraries or other grouping folders. They enforce vertical layers in our repository, which could be in the category of Bounded Context, Vertical Slices, or Application grouping folders. Each grouping folder would also create a matching tag.

For a more deep dive into grouping folders, we can relate to the following [article](https://dev.to/this-is-learning/semantic-grouping-folders-with-nx-3467) and the Nx [website](https://nx.dev/latest/react/structure/grouping-libraries).

#### Feature

**Feature libraries** should only contain `container components`. Those are components that communicate with the data-access layer and manage the business behavior of the applications.

Commonly they represent a business use-case or a page, but they are not restricted to those scenarios.

Hopefully, these components should not contain any presentational logic; they should have minimum templates and almost no styles.

For more information about Container components, we recommend this [article](https://dev.to/this-is-angular/container-components-with-angular-4o05)

Features libraries are not constrained to contain a single container component.

Ex:
Library: feature-report-modal
Parent Grouping Folder: report
Basic Tags: [type:feature,scope:report]

Feature libraries MUST only depend on the following library types: feature, data-access, UI, util.

#### UI

UI libraries only contain presentational components. Presentational components should not manage any business logic.

They are in charge of presenting data pass to them via **Inputs**, and they should notify other components of internal events by using **Outputs**.

For more information about Presentational components, we recommend this [article](https://dev.to/this-is-angular/presentational-components-with-angular-3961)

These components should contain most of the HTML and CSS of our application.

They will also contain presentational logic, like forms, date calculations, etc.

UI libraries are not constrained to contain a single presentational component.

Ex:
Library: ui-buttons
Parent Grouping Folder: shared
Tags: [type:ui,scope:shared]

UI libraries MUST only depend on the following library types: ui, util. (Sometimes feature libraries are allowed for composition purposes, TBD)

### Data Access

Data Access libraries contain all the data-related logic, including state management and back-end communication.

Commonly we have one of these components per vertical slice, but if the library starts to grow, we can split it into several more specific libraries.

Ex:

Library: data-access
Parent Grouping Folder: report
Tags: [type:data-access,scope:report]

Data Access libraries MUST only depend on the following library types: data-access, util.

### Util

Utils libraries contain agnostic reusable functionalities. It can be framework-centric like custom generic angular pipes, database query builder, etc. Or it can be framework-independent, mostly pure functions like date and currency helpers.

These are primarily stored in a shared grouping folder not matter at what level.

Ex:

Library: util-dates
Parent Grouping Folder: shared
Tags: [type:util,scope:shared]

Util libraries MUST only depend on the following library types: util.

### Shell

Shell libraries' responsibility is to orchestrate and configure a subset of feature libraries acting as an entry point for the rest of the system.

There are different types of Shell libraries; for the objective of the current project, we will use the `composite-shell` library, but we would call them just shell libraries for simplicity.

For more information about the different shell libraries and their use-cases, refer to the following [article](https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures).

The goal of using Shell libraries is to provide individual entry points to the different areas (vertical slices, bounded contexts) of our application, depending on the platform we target.

In other words, with shell libraries, we can create two different entry points for a group of functionalities depending if we are on mobile or desktop. This is helpful when the two versions of the app share most of the logic and UI/UX, but there are some differences.

Shell libraries also orchestrate routes and high-level configurations.

Ex:

Library: shell
Parent Grouping Folder: report
Tags: [type:shell,scope:report]

Shell libraries MUST only depend on the following library types: shell, feature, util.

### LCW Preferences

This section will address the particular requirements of the current project.

The LCW project does not represent a complex dependency because most of the application's functionality is specific to a single application.

However, some utils functions, UI elements and data-access libraries are shared between different applications.

In the high-level view, LCW is composed by three applications: the api (Serverless) application, the B2C, client or lcw application and the B2B or admin application.

From that perspective, the project root grouping folders are: server and client. And its related tags are `technology:server` and `technology:client`.

> Note that currently we have a client app and a client tag value for the technology layer. To avoid confusions we should rename the client app to lcw.

#### Folder structure

The following is a representation of the folder structure of the LCW project after applying the necessary refactoring iterations.

```md
<root-dir>/
├── apps/
│ ├── admin/
│ ├── admin-e2e/
│ ├── client/
│ ├── client-e2e/
│ └── shared-e2e/
├── libs/
│ │ ├── api/ // Server-side GraphQL related libraries
│ │ │ ├── src/
│ │ │ │ ├── lib/
│ │ │ │ │ ├── graphql-client/
│ │ │ │ │ ├── model/
│ │ │ │ │ ├── mutations/
│ │ │ │ │ ├── queries/
│ │ │ │ │ └── .../
│ │ ├── client/ // Client-side related libraries
│ │ │ ├── src/
│ │ │ │ ├── lib/
│ │ │ │ │ ├── admin/ // Admin-specific code
│ │ │ │ │ ├── conference/ // App-specific code
│ │ │ │ │ └── shared/ // Shared client code
│ │ ├── core/ // Technology Grouping Folder
│ │ │ ├── src/
│ │ │ │ ├── lib/
│ │ │ │ │ ├── amplify
│ │ │ │ │ ├── auth
│ │ │ │ │ ├── models
│ │ │ │ │ ├── operators
│ │ │ │ │ ├── state
│ │ │ │ │ └── utils
│ │ ├── shared // Technology-level Shared Grouping Folder
│ │ │ ├── src
│ │ │ │ ├── lib
│ │ │ │ │ ├── action-button // Angular Component
│ │ │ │ │ ├── attendee-card // Angular Component
│ │ │ │ │ └── .../
│ │ │ ├── ui-auth // Utils Library
│ │ │ ├── ui-notifications // Utils Library
│ │ │ └── .../
│ │ └── utilities/ // Technology-level Shared Grouping Folder
│ │ │ ├── src
│ │ │ │ ├── lib
│ │ │ │ │ └── .../
├── serverless/
│ ├── seed/ // Seed data for the local DynamoDB database when developing
│ ├── package.json
│ ├── serverless.yaml
│ └── .../
├── tools/
├── workspace.json
├── nx.json
├── package.json
└── tsconfig.json
```

The folder structure above represents a subset of the application, but it captures the essence of the desired design.

The first thing to notice is that we have two applications, the `lcw` and the `admin`. There is a third application which is the `api` application.
But since it is a Serverless application it has special characteristics, and it is not represented as an executable application (for now)

The applications will then delegate to the App level Shell libraries the responsibility of orchestrating the routing, features, and domain-specific configurations.

At the same time, the App-level Shell libraries will delegate the same responsibility to the Bounded Context-level Shell libraries.

For example:

The `lcw` application will only depend on the App level `shell` library located in the `libs/client/lcw` grouping folder.
The `shell` library configures all top-level routing and configurations. At the same time, the App level `shell` library will only depend on the child Bounded Context level `shell` libraries.

That is `libs/client/lcw/shell` will depend on `libs/client/lcw/matches/shell` and `libs/client/lcw/messages/shell`.

The Bounded Context level `shell-web` will set up the Bounded Context configuration and routing. This time, they will depend only on the `feature` libraries of their Bounded Context.

![Architectural Guidelines](architectural-guidelines.png)

The above image is an example of how the proposed architectural guidelines would look when applied to the current project.

### Incremental Refactoring

Previous sections have addressed the desired architecture for the current Monorepo to maximize reusability without compromising the flexibility of having slightly different application experiences.

However, a one-time refactoring would require time, and it would be prone to breaking the current implementation since the application still lacks a comprehensive test suite.

Therefore, an incremental approach is not only recommended but necessary.

Initially, most of the application functionally will be extracted in big chucks, mainly respecting the existing structure.

Every time a developer works in a subset of one of the existing chunks, it should attempt to refactor that piece of functionality into libraries using the provided material as the library guideline.

Independent refactors can be coordinated and planned depending on how necessary they are.

## Coding Standards

Consistency is important on an application such as this, where many developers will work on this product over long periods of time. Therefore, we expect all developers to adhere to a common set of coding practices and expectations. This section should be updated as the team decides on new standards.

- **Formatting** - We don't want to waste time debating tabs vs spaces. All code should be formatted using Prettier set to use the settings in the `.prettierc` file. There is a Git hook (using Husky and precise-commits) that will automatically format changed code prior to commit.
- **Style Guides** - We're following the standard [Angular Style Guide](https://angular.io/guide/styleguide). Any deviation from the style guide is an error unless an exception is written in this set of coding standards.
- **State Management** - We should use NgRx in place of of "Subject-Wrapping Services". That said, local state management is not only OK, it's preferred. State should only be raised into the store when it delivers architectural value to do so. We follow the NgRx core team guidelines of event-based actions and [good action hygiene](https://www.youtube.com/watch?v=JmnsEvoy-gY)
- **Testing** - All code is expected to be thoroughly tested. Code reviews should verify that each pull request contains an adequate number and variety of test cases. We try to follow the principles of the [testing trophy](https://kentcdodds.com/blog/write-tests/). The test suites should be filled with mostly integration tests written in ways that they contain minimal mocking and only testing in ways the user would interact with the UI. Unit tests should be used where appropriate, especially to test utilities, services, and the NgRx implementation. Finally, E2E tests should be used as appropriate to ensure that core user flows through the application are functioning.
- **Storybook** - New Storybook stories should be included in the same PR as the code described by the stories. Code reviewers are expected to review to make sure that all necessary Storybook stories were included in the pull request. Additionally, reviewers should make sure that links to the appropriate Figma design are included with each story.
- **Developer Testing** - Developers are responsible for thoroughly testing their code prior to putting it up for review. It is NOT the responsibility of the code reviewer to execute the code and test it (though the reviewer might run the code to aid their review if they want).
- **Naming Convention** - All commits and pull request names should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) specifications as it is a widely acceptable way within Angular ecosystem (e.g. `<type>(<scope>): <description>`).
- **Minimal Pull Requests** - Do not commit changes to files where there was not a new feature added or an existing feature altered. Files altered only to remove unusued imports or change formatting should not be included in pull requests. Code authors are expected to review the files in each pull request and revert files that were only incidentally changed.
- **Code Comments** - We're not following a strict code commenting pattern (like js-doc), but developer are encouraged to use comments liberally where it may aid understandability and readability of the code (esepecially for new team members). Comments that merely explain what a line of code does are not necessary. Instead, comments should indicate the intent of th author. It could mention assumptions, constraints, intent, algorithm design, etc.
- **Commit/Pull Request Comments** - Code authors are strongly recommended to communicate the reason for the code changes, the nature of the changes, and the intent of the changes in their Git commit messages (this information should also make it into PR descriptions as well). Additionally, while not strictly required, we recommend that code authors make comments in their pull requests where useful to help code reviewers understand the background/intent for some of the less obvious changes.

[//]: # 'TODO: Consider moving GIT related guidelines to a separate file'

## i18n

We use [transloco](https://ngneat.github.io/transloco/) for i18n. This is still work in progress to migrate all hardcoded texts into one translation file.

As a boyscout rule whenever you work with a template which contains hardcoded text literals please move them into [en.json](apps/client/src/assets/i18n/en.json) and use Transloco to perform dynamic translation.
