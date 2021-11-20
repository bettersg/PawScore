# Cypress E2E Testing

## Getting Started

* `npm ci` to install the packages

## Writing a test

* Create a Gherkin File (`sample.feature`) in `cypress\integration`
* Create a new directory with the same name as the features `cypress\integration\sample`
* Write the Steps using any `.ts` file in the new directory

## Running tests

* `npx cypress open` to start cypress
* `npx cypress run --spec **/*.feature` to run headless

## Results

* Failing Tests will result in output in the `screenshots` and `videos` folders
