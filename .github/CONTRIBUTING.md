# Contributing

First of all, thanks for your interest in contributing to the cyclecheck-api! 🎉

PRs are the preferred way to spike ideas and address issues, if you have time. If you plan on contributing frequently, please feel free to ask to become a maintainer; the more the merrier. 🤙

## Technical overview

This library uses following libraries for development:

- [typescript](http://www.typescriptlang.org/) for typed JavaScript and transpilation
- [prettier](https://prettier.io/) for formating the code
- [nest](https://nestjs.com) framework
- [jest](https://jestjs.io/) for unit testing
  - run `yarn test:dev` during development
- [yarn](https://yarnpkg.com/lang/en/) for package management
- [husky](https://github.com/typicode/husky) for git hooks (pre-commit, pre-push)

### Start developing

First you will need to make sure you create a `cyclecheck.env` file.  You will not be able to run the api **AT ALL** without this env file.

1. Copy `cyclecheck.sample.env` to `cyclecheck.env`
1. Add `ENV=development` to the top of the file
1. Fill in the other required values
1. Adjust any of the optional values as needed.

Yarn commands:

- `yarn start`
    - Runs the app from source as-is, using `ts-node` to transpile on the fly.
    - **NOTE**: If you **do not** add `ENV=development` to the `cyclecheck.env` file, the app will attempt to pull the version from the package.json.  If it can't find it, it will crash.
- `yarn start:dev`
    - Watches for changes to the source and will reload the API when it detects changes
- `yarn start:debug`
    - Starts the app for debugging, allows you to set breakpoints.

### 🧪 Tests

Test are written and run via Jest 💪

```sh
# Run whole test suite once
yarn test
# Run test in watch mode
yarn test:watch
# Run tests with coverage
yarn test:cov
```

### 💅 Style guides

Style guides are enforced by robots _(I meant prettier and tslint of course 🤖 )_, so they'll let you know if you screwed something, but most of the time, they'll autofix things for you. Magic right?

Lint and format codebase via npm-script:

```sh
# Lint and autofix using tslint
yarn lint

# Format code with prettier
yarn format
```

#### Commit conventions (via commitizen)

- this is preferred way how to create conventional-changelog valid commits
- if you prefer your custom tool we provide a commit hook linter which will error out, it you provide invalid commit message
- if you are in rush and just wanna skip commit message validation just prefix your message with `WIP: something done` ( if you do this please squash your work when you're done with proper commit message so semantic-release can create Changelog and bump version of your library appropriately )

```sh
# invoke commitizen CLI
yarn commit
```

## Getting started

### Creating a Pull Request

If you've never submitted a Pull request before please visit http://makeapullrequest.com/ to learn everything you need to know.

#### Setup

1.  Fork the repo.
1.  `git clone` your fork.
1.  Make a `git checkout -b branch-name` branch for your change.
1.  Run `yarn install --ignore-scripts` (make sure you have node and yarn installed first)

Updates

1.  Make sure to add unit tests
1.  If there is a `*.test.ts` file, update it to include a test for your change, if needed. If this file doesn't exist, please create it.
1.  Run `yarn test` or `yarn test:watch` to make sure all tests are working, regardless if a test was added.
1.  When your work is done run `yarn test:cov` to ensure your changes are covered.

---

## 🚀 Publishing

> releases are handled by awesome [semantic-release](https://github.com/semantic-release/semantic-release)

Whenever a commit is pushed to the `master` branch, the CI server will validate the commit, then run `semantic-release`.

If `semantic-release` decides that the commit is worthy of a new release it will:

- bump package version and git tag
- push to github master branch + push tags
- bundle the application and add to release

## License

By contributing your code to the cyclecheck-api GitHub Repository, you agree to license your contribution under the MIT license.
