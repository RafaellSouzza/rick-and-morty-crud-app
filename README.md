# RickAndMortyCrudApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## JSON Server

This project can use [JSON Server](https://github.com/typicode/json-server) to simulate a REST API for CRUD operations.

1. Install JSON Server globally:

```bash
npm install -g json-server
```

2. Start the server from the project root:

```bash
json-server --watch db.json --port 3000
```

3. Run the Angular app with the provided proxy configuration:

```bash
npm start
```

To run the API and Angular application together, use:

```bash
npm run start:dev
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Installation

Install dependencies with npm:

```bash
npm install
```

Ensure `zone.js` is installed, as Jest relies on it for Angular testing. If it
is missing, install it with:

```bash
npm install zone.js
```

Jest also requires `@angular/platform-browser-dynamic`. If it is missing after
installing dependencies, add it with:

```bash
npm install @angular/platform-browser-dynamic
```

## Running Tests

Execute unit tests with Jest:

```bash
npm test
```

This project requires at least 80% coverage as configured in `jest.config.js`.

## Features

- Angular standalone component displaying a list of characters from the [Rick and Morty API](https://rickandmortyapi.com/).
- State management using Angular Signals.
