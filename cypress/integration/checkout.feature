Feature: As customer I would like to make a purchase using Stripe checkout

  Scenario: Complete a purchase using the one-time payment
    Given Im on the "one-time" checkout page
    When I fill out 'valid' payment details
    And I try to complete the purchase
    Then I should have completed the purchase with success

  Scenario: Complete a purchase for recurring payment
    Given Im on the "recurring" checkout page
    When I fill out 'valid' payment details
    And I try to complete the purchase
    Then I should have completed the purchase with success

  Scenario: One-time payment using declined credit card details
    Given Im on the "one-time" checkout page
    When I fill out 'decline' payment details
    And I try to complete the purchase
    Then I should not be able to complete the purchase

  Scenario: Recurring payment using authentication credit card details
    Given Im on the "recurring" checkout page
    When I fill out 'authentication' payment details
    And I try to complete the purchase
    And I "fail" my 3D security details
    And I try to complete the purchase
    And I "complete" my 3D security details
    Then I should have completed the purchase with success

  Scenario: Update the cart items and complete the purchase
    Given Im on the "one-time" checkout page
    When I update the cart items
    And I fill out 'valid' payment details
    And I try to complete the purchase
    Then I should have completed the purchase with success

  Scenario: Wallet payment method
    Given Im on the "recurring" checkout page
    Then I should see the wallet payment option
