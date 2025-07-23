Feature: Chorus Application Demo

  Scenario Outline: User launch SSC Portal and check the home page
    Given I launch the Chorus "QA" portal
    When I login with username "<userName>" and password "<Password>"
    Then I create a "<Ctype>" from the worklist
 

    Examples:
      | userName | Password         | Ctype |
     | AUTOTEST | Passwd@2 | PACLIFE |
     #| AI4HRM | Password1! | PACLIFE|