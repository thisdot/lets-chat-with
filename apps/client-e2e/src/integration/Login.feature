Feature: Login

  Background: As a user, I'd like to be able to log in to the application. If I make a typo in my password I'd like to be notified about that.

  Scenario: When I open a deep link of the application, I get redirected to the login page
    Given the "/conferences" url is visited
    Then the app redirects to "/signin"
    And the login form is displayed
    And the "login button" element is visible
    And it is disabled

  Scenario: When I successfully log in to the application, I get redirected to conferences page
    Given the "/signin" url is visited
    And the user has valid credentials
    And the user has joined some conferences
    When the login form is filled
    And the login button is clicked
    Then the conferences are fetched
    And the app redirects to "/conferences"

