# React Template

This is the revamped React template, based on [Create React App](https://github.com/facebook/create-react-app), tailored for MWI projects.

## Getting started

1. clone this repo
2. run `yarn` from the root directory
3. run `yarn start`
4. Open `localhost:3000` in your browser
5. Start writing components from entry point `src/app.js` 😎

## Table of Contents

- [Folder Structure](#structure)
- [Available Scripts](#available-scripts)
- [MWI customs]()
- [Styling - styled components]()
- [Testing]()
- [Git Hooks]()
- [Examples]()

## Structure

### config

### examples

### public

### scripts

### src

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn dist`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## MWI Customs

### useAPI Hook
With this template comes a handy out-of-the-box useAPI hook to enable easy data fetching.
It takes care of
- Authentication (see [authentication-manager](#utils/authentication-manager.js))
- Logging (see [default @dlw/dlw-logger integration](#default-@dlw/dlw-logger-integration))
- Loading state
- Error state
- Immediate execution or execute whenever you want

For a more detailed information or an example, go check out [data fetching examples](https://github.com/netweaverdlw/MW_React_template/tree/master/examples/dataFetching))

### utils/authentication-manager.js

### utils/check-api-status.js

### default @dlw/dlw-logger integration

### ErrorBoundary component
