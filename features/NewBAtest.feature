@newba
Feature: Chorus New BA Test

  @newba-step1
  Scenario: User launch SSC Portal and check the home page 1
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Passwd@2"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST1 | CREATED |
    When I double click to open the created work item "AUTOTEST1"
    Then I enter the Email "chandra.lagadapat@ai4process.com" and complete the work

  @newba-step2
  Scenario: User launch SSC Portal and check the home page 2
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Passwd@2"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST2 | CREATED |
    When I double click to open the created work item "AUTOTEST2"
    Then I enter the Email "chandra.lagadapat@ai4process.com" and proceed AUTOTEST2 work
    And I accept the pop up in chrome dialog to open MS Word
    Then I click Next button in the MS Word opened

  @newba-step3
  Scenario: User launch SSC Portal and check the home page 3
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Passwd@2"
    And I double click to open the first work item

  @newba-AUTOTEST3
  Scenario: User creates business flow for AUTOTEST 3 process
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Passwd@2"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST3 | CREATED |
    When I double click to open the created work item "AUTOTEST3"
    And I wait for table data to be displayed
    When I add a new record to EmpTable1
      | TName11 | 11 | 03/03/2004 | false |
    When I add a new record to EmpTable2
      | TName111 | 111 | 04/04/2004 | true |
    And I select newly created record
    And I click submit button to complete the entry
    Then I verify the below content in the EmpDetails table
      | TName11 | 11 | 2004-03-03 | false |
    Then I verify the below content in the EmpDetails2 table
      | TName111 | 111 | Apr 4, 2004 | true |
    Then I verify the below content in the EmpDetails selected rows table
      | TName11 | 11 | 2004-03-03 | false |
    Then I verify the below content in the EmpDetails2 selected rows table
      | TName111 | 111 | Apr 4, 2004 | true |

      


  @newba-AUTOTEST4
  Scenario: User creates business flow for AUTOTEST 4 process
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTEST" and password "Passwd@2"
    And I create a new worklist
    Then I select following options in the new worklist
      | BusinessArea | WorkType  | Status  |
      | SAMPLEBA     | AUTOTEST4 | CREATED |
    When I double click to open the created work item "AUTOTEST4"
    And I wait for table data to be displayed
    When I select records from the two tables
    And I click submit button to complete the entry
    Then I verify the below content in the Emptable1
      | Test333 | 3 | Jan 3, 2024 | true |

  @newba-AUTOTEST10
  Scenario: User creates business flow for AUTOTEST 10 process
    Given I launch the Chorus "QA" portal
    When I login with username "AUTOTST" and password "Passwd@2"
    Then I select case management 
    Then I create new case "TESTCASE"
    Then I enter case facts like email "chandra.lagadapat@ai4process.com", firstname "Chandra"
    Then I work on the task entering the firstname "Chandra"
    Then I mark the case as complete