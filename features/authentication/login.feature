Feature: User Login
  As a user
  I want to log in using my LINE account
  So that I can access the application

  Scenario: Disable LINE login button after click
    Given I am on the login page
    When I click the "Login with LINE" button
    Then the "Login with LINE" button should be disabled
