NOTE: This project is a work in progress and will regularly be updated.

## About this project.

This project is designed to provide a starting point for the development of your own web application and/or native mobile application. It is a shared project to use the same code base to build a Web Application and a native Mobile Application using NativeScript.

The application is a simple Todo app, yet demonstrates some of more advanced techniques of Angular and provides the necessary foundation to continue build your own application.

### What the project demonstrates

1. [Redux / NgRx](https://ngrx.io/) for application state management.
2. Using [GraphQL](https://graphql.org/) as query language for API Communication .
3. Shared code base for building native mobile and web applications using [NativeScript](https://www.nativescript.org/)
4. Building a custom theme with user configurable, persistent, colors using [Angular Material](https://material.angular.io/)
5. Using alternative testing frameworks, [Jest](https://jestjs.io/) for unit testing and [TestCafe](https://testcafe.devexpress.com/) for e2e testing.
6. Using Git Hooks [Husky](https://github.com/typicode/husky#readme) to automate linting and code formating with [Prettier](https://github.com/prettier/prettier)
7. Continuous integration with [CircleCI](https://circleci.com/)

### Installation & Running

1. Clone the repo: `git clone https://github.com/jadams88/angular-client.git`
2. Install all dependencies: `npm install`. NOTE: The dependencies include modules for building NativeScript. Some warnings will be logged during installation if your development machine is not configured for local NativeScript development. Please see [Setup](https://docs.nativescript.org/angular/start/quick-setup) to setup NativeScript locally.

To run the application run the following for the desired platform

- Web : `ng serve -o`
- ios : `npm run ios`
- Android : `npm run android`

## API Server

Developing an API server for the application to communicate to is beyond the scope of this project, however a starter API that supports all the required features of this application is provided [here](https://github.com/jadams88/koa-graphql-rest-api).

## Testing

### Unit Testing

Unit test are configured to run with the [Jest](https://jestjs.io/) testing framework. This includes `marble testing` and `snapshot testing`.

Note / TODO : There is a fair number of unit tests however additional tests need to be written.

To run the tests, run `npm test`

### End to End test.

E2E Test are rung using [TestCafe](https://testcafe.devexpress.com/). These are located in the `/e2e` directory.

There is a configuration file located at `/e2e/config.e2e.ts`. This contains configuration variables to run e2e tests correctly.

To run the tests, serve the application and then run the test suit against that url.

1. `ng serve`
2. Open a new terminal, and then run `npm run e2e:chrome`. (note there are equivalent scripts for the other major browsers, please look in the `package.json` file)

Note: There is not a full suite of e2e tests that cover the application (yet), however there are a couple of example tests to test the login page and authentication.

## NativeScript Mobile Development

TODO -> Document Mobile development and requirements.
TODO -> Document the removal of additional configuration that has been enabled to work with an unecrypted API server on localhost.
Including

_ios develop_

remove the NSAppTransportSecurity from the info.plist in the ios directory

_android local development_

android:networkSecurityConfig="@xml/network_security_config"

## Configuring your own Application

TODO -> Document all app prefixes that need to be changed from `demo` including:

- angular.json
- src/tslint.json
- All component.ts, .html and .scss

TODO -> Document Nativescript development setup eg.
App_Resources -> Android -> app.gradle -> application ID must align with package.json

## Contributing

TODO -> Document contributing guidelines, Code of conduct etc
TODO -> Document the Husky Git Hooks
TODO -> Document the code scaffolding with nativescript/schematics

## Road MAP

- Complete Mobile Components
- Bazel for building

## Custom theme mixins for angular material

TODO -> Document

-> dark theme view encapsulation does not apply for material components
