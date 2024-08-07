Feature: Add expense

Scenario: Add my first expense
    Given I have not prevously added any expenses
    When I add a 8$ coffee expense 
    Then I should see my expense listed