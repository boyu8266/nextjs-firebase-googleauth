Feature: User Logout
  As a logged-in user
  I want to be able to log out
  So that I can securely end my session

  Scenario: Display a confirmation modal when the logout button is clicked
    Given I am a logged-in user on the homepage
    When I click the "Logout" button
    Then a modal dialog should be displayed to confirm the logout
