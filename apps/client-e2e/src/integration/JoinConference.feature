Feature: Joining a conference flow.

  Scenario: I can join a conference by entering its url and filling in my data
    Given the user is logged in and opens the "/conferences" page
    Then the conferences page is opened
    And the "join conference" button is visible
    When it is clicked
    Then the "Scan QR code" button is visible
    And the "Enter conference URL" button is visible
    When it is clicked
    Then the app redirects to "/conferences/domain"
    And the "conference-url" input is visible
    And the "Continue" button is visible
    And it is disabled
    When typing "nakatomi-conf" into "conference-url" input field
    And the "Continue" button is clicked


