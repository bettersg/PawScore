Feature: Login

  I want to be able to login to the application

  Scenario: Valid Login
    Given the user open the login page
    When the user enters valid details
    Then the user will be logged in with "Main" in the title

  Scenario: Invalid Email
    Given the user open the login page
    When the user enters an invalid "email"
    Then the user will see "Please input a valid Email"

  Scenario Outline: Invalid Login by skipping fields
    Given the user open the login page
    When the user skips entering "<input>"
    Then the user will see "<message>"
    Examples:
      | input    | message                    |
      | email    | Please input a valid Email |
      | password | Please input your Password |
