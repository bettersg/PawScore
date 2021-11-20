/// <reference types="Cypress" />

import { configure } from "@testing-library/cypress";

beforeEach(() => {
  configure({
    throwSuggestions: true,
  });
});

context("Pets", () => {
  it("should be able to sign up", () => {
    cy.visit("/shelter/login");
    cy.findByRole("tab", { name: /Signup/i }).click();
    cy.findByRole("textbox").type("me@email.com");
    cy.get("#signup_password").type("password");
    cy.findByRole("button", { name: /Sign Up/i }).click();
  });

  it("should be able to login", () => {
    cy.visit("/shelter/login");
    cy.findByRole("textbox").type("me@email.com");
    cy.findByPlaceholderText("Password").type("password");
    cy.get(":submit").click();
  });
});
