[Angular](https://angular.io/), [GraphQL](https://graphql.org/), [NativeScript](https://www.nativescript.org/), [NgRx](https://ngrx.io/), [Material Design](https://material.angular.io/), [Husky](https://github.com/typicode/husky), [Prettier](https://prettier.io/), [Jest](https://jestjs.io/) & [TestCafe](https://testcafe.devexpress.com/)

Note: This pyoject is a work in progress and will regularly be updated.

# About this project.

This project is designed to provide a starting point for the development of your own web application and/or native mobile application.

This is the combination of my years developing and learning some of the tricker parts of Angular development. I have created this project to show examples of how to implement some of the less common concepts (or not as well documented... material themeing i'm looking at you).

The project is a simple application that once authenticated has a side navigation component to navigate between the two navigation routes.
Under the hood it use Redux for state management and side effects as well as GraphQL for querying a GraphQL server.
It also demonstrates how to make a custom Angular Material theme as a well as the ability to toggle between themes (e.g. a dark theme) and theme your own components.

TODO -> Insert Screens here

## Mock API Server

A mock server is provided in the dev-server/ directory. This uses the awesome [json-server](json-server) & [json-graphql-server](https://github.com/marmelab/json-graphql-server) to auto create REST endpoints and GraphQL queries form the db.json file.
Running 'npm run server' will start this server on port :3000.

## Husky Git Hooks

TODO -> Document the Husky hooks

## Code scaffolding

TODO -> Document the nativescript/schematics

## Builds

TODO -> Implement Bazel for building

## Running unit tests

The application uses [Jest](https://jestjs.io/) for unit testing.

run 'npm test' to run the test suite.

TODO -> Document this better

## Running end-to-end tests

The application uses [TestCafe](https://testcafe.devexpress.com/) for e2e testing.

TODO -> Document this better

# Native Application Development

## ios develop

TODO -> Document this process and the below

remove the NSAppTransportSecurity from the info.plist in the ios directory

## android local development

TODO -> Document this process and the below

android:networkSecurityConfig="@xml/network_security_config"

## Starting your own application

TODO -> Document

- change the prefix to from client -> whatever

## Cutome theme mixins for angular material

TODO -> Document

-> dark theme view encapulation does not apply for material components

# Configuring your own fork

TODO -> Document
-- App_Resources -> Android -> app.gradle -> application ID must allign with package.json
