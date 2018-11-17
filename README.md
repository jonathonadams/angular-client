# client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ios develop

remove the NSAppTransportSecurity from the info.plist in the ios directory

## android local development

android:networkSecurityConfig="@xml/network_security_config"

- change the prefix to from client -> whatever

## Known Errors

Nativescript build process -> Pattern must be a string. Copy webpack plugin has a fix in 4.6, waiting for release.

## Cutome theme mixins for angular material

-> Login component
-> dark theme view encapulation does not apply for material components
