@newba
Feature: Chorus New BA Test

  @newba-step1
  Scenario: User launch SSC Portal and check the home page
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Automation@11"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST1 | CREATED |
    When I double click to open the created work item "AUTOTEST1"
    Then I enter the Email "ishwarya.alagesan@ai4process.com" and complete the work

  @newba-step2
  Scenario: User launch SSC Portal and check the home page
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Automation@11"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST2 | CREATED |
    When I double click to open the created work item "AUTOTEST2"
    Then I enter the Email "ishwarya.alagesan@ai4process.com" and proceed AUTOTEST2 work