Feature: As customer I should not be able make a purchase without providing correct payment details

  Scenario: One-time payment empty details
    Given Im on the "one-time" checkout page
    When I try to complete the purchase
    Then I should not see my order being processed

  Scenario: Recurring payment invalid details
    Given Im on the "recurring" checkout page
    When I fill out 'invalid' payment details
    And I try to complete the purchase
    Then I should not see my order being processed

  Scenario: Recurring payment malformed details
    Given Im on the "recurring" checkout page
    When I fill out 'malformed' payment details
    And I try to complete the purchase
    Then I should not see my order being processed
