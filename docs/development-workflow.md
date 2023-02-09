# Development Workflow (Board, PRs, and Issues)

[//]: # 'TODO: Explain the lifecycle of Issues and PRs in the Project Boards and how to navigate them'

### Commit message convention

This project uses [commitlint](https://github.com/conventional-changelog/commitlint) and [husky v4](https://github.com/typicode/husky/tree/master#install) to lint your commit messages.
The project uses the [Angular commit convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines).
See [@commitlint/config-angular](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular#commitlintconfig-angular) for further information on how to format your commits.

## Feature Development Workflow

## Git Strategy

## Pull Requests

Labels are being used in order to keep an overview of what Pull Request can use your attention, and which are awaiting attention from someone else on the team.

We use the following labels:

- **ready**: Whenever a PR is ready for review, mark it as `ready`.
- **needs-update**: If you add any questions/comments on a PR that needs the owner's attention, mark it as `needs-update`.
- **fix-conflicts**: When you encounter a PR that has merge conflicts, mark it as `fix-conflicts`
- **merge**: If the PR is approved, either merge it or add the `merge` label so the original owner can merge it.
- **blocked**: If the PR should not be merged because it is being blocked by any external factor, mark the PR as `blocked` and leave a comment explaining the reason.
