import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import * as faker from "faker";

const URL = "/shelter/login";
const email = "me@email.com";
const password = "password";

Given(/the user open the login page/, () => {
  cy.visit(URL);
});

When(/the user enters valid details/, () => {
  cy.findByRole("textbox").type(email);
  cy.findByPlaceholderText("Password").type(password);
  cy.get(":submit").click();
});

When(`the user enters an invalid {string}`, (input: string) => {
  cy.findByRole("textbox").type(faker.name.findName());
  cy.get(":submit").click(); 
});

When(`the user skips entering {string}`, (input: string) => {
  if (input === "email") {
    cy.findByPlaceholderText("Password").type(password);
  } else if (input === "password") {
    cy.findByRole("textbox").type(email);
  }
  cy.get(":submit").click();
});

Then(
  `the user will be logged in with {string} in the title`,
  (title: string) => {
    // TODO: need an assertion here
    // cy.title().should("include", title);
  }
);

Then(`the user will see {string}`, (msg: string) => {
  const regex = new RegExp(msg);
  cy.findByText(regex).should("be.visible");
});
