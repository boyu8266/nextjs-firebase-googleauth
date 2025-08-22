Feature: Login History Pagination
  As a user
  I want to view my login history with pagination
  So that I can review my account activity efficiently.

  Background:
    Given I am a logged-in user

  Scenario: Viewing the first page of login history with multiple pages
    Given I have more than five login history records
    When I navigate to the login history page
    Then I should see the first 5 login history records
    And I should see the "Next" button enabled
    And I should see the "Previous" button disabled

  Scenario: Navigating to the next page
    Given I am on the first page of the login history with more records available
    When I click the "Next" button
    Then I should see records 6 through 10 of my login history
    And I should see the "Previous" button enabled

  Scenario: Navigating back to the previous page
    Given I am on the second page of the login history
    When I click the "Previous" button
    Then I should see the first 5 login history records
    And I should see the "Previous" button disabled

  Scenario: Viewing the last page of login history
    Given I am on the last page of my login history
    Then the "Next" button should be disabled

  Scenario: Viewing login history with five or fewer records
    Given I have 5 or fewer login history records
    When I navigate to the login history page
    Then I should see all of my login history records
    And the "Next" button should be disabled
    And the "Previous" button should be disabled
