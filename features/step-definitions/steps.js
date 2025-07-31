import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'
import { handlePopupAccept, enterKeysinMSWORD, handleCasePopupAccept } from './robotkey';


When('I login with username {string} and password {string}', async(userNameTxt, passwordTxt)=>{
        await $("#user-name").setValue(userNameTxt)
        await $("#password").setValue(passwordTxt)
        await $("#sign-on").click()
        if(userNameTxt != 'AUTOTST'){
            await $("//div[@class='ui-card-main-text'][contains(text(),'Worklist')]").waitForDisplayed(10000);
        }
});


When('I launch the Chorus {string} portal', async(envVariable)=>{
    await browser.maximizeWindow();
    if(envVariable.toUpperCase()=="UAT"){
        await browser.url("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
    } else if(envVariable.toUpperCase()=="QA") {
        await browser.url("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
    }
    await expect(browser).toHaveUrl("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
    await expect(browser).toHaveTitle("Sign on to Chorus");
})

Then('I create a {string} from the worklist', async(casetype)=>{
await $("#create-btn").click();
await $("//div[@class='ui-card-main-text'][normalize-space()='Create']").waitForDisplayed(3000);
await $("//app-create-work//select[contains(@id,'work-businessArea')]").selectByVisibleText(casetype)
await browser.pause(5000)
    
});

Then('I create a new worklist', async()=>{
await $("#create-btn").click();
await $("//div[@class='ui-card-main-text'][normalize-space()='Create']").waitForDisplayed(3000);
await browser.pause(1000)
    
});

Then('I select following options in the new worklist', async(dataTable)=>{
    // console.log(dataTable.raw());
    let dataValue = await dataTable.raw()[1];
    console.log(dataValue)
    await $("//select[@id='create-1-work-businessArea']").selectByVisibleText(dataValue[0]);
    await $("(//select[@id='create-1-work-workType'])[1]").selectByVisibleText(dataValue[1]);
    // await $("(//select[@id='create-1-work-status'])[1]").selectByVisibleText(dataValue[2]);
    await browser.pause(1000);
    await $("//app-create-work[@createworkresource='CRTWORK']//button[@type='submit'][normalize-space()='Create']").waitForEnabled(2000);
    await $("//app-create-work[@createworkresource='CRTWORK']//button[@type='submit'][normalize-space()='Create']").click();

    await $("//span[@class='p-accordion-header-text'][contains(text(),'Created Items')]").waitForDisplayed(5000);
})

Then('I double click to open the created work item {string}', async(workitemtype)=>{
    await $("(//div[@class='ui-card focused-card']//span[@class='awd-ba-type-data'][normalize-space()='SAMPLEBA - "+workitemtype+"'])[1]").doubleClick();
    await $("//div[@class='ui-card-titlebar']//div[contains(text(),'SAMPLEBA - "+workitemtype+"')]").waitForDisplayed(3000);
    await browser.pause(2000);
    
})

Then('I enter the Email {string} and complete the work',async(emailaddressTxt)=>{
    await $("//input[@awdname='EMAL']").setValue(emailaddressTxt);
    await $("//button[@name='NextStep']").click();
    await browser.pause(2000);
})

Then('I enter the Email {string} and proceed AUTOTEST2 work', async(emailaddressTxt)=>{
    await browser.pause(5000);
    await $("//html/body/app-root/div/div[2]/div[2]/app-active-cards-container/div/app-awd-item-card/app-card/div/popout-window/div/div/div/div[2]/div/div[1]/div/div[1]/div/form/div[3]/label/select").waitForDisplayed(7000);
    await $("//html/body/app-root/div/div[2]/div[2]/app-active-cards-container/div/app-awd-item-card/app-card/div/popout-window/div/div/div/div[2]/div/div[1]/div/div[1]/div/form/div[3]/label/select").selectByAttribute('value', '30152');//value('30152');
    await $("//button[normalize-space()='Next']").click()
    await browser.pause(3000);
    await $("//input[@name='emailAddress']").waitForDisplayed(3000);
    await $("//input[@name='emailAddress']").setValue(emailaddressTxt);
    await $("//button[normalize-space()='Next']").click();
    await browser.pause(5000);
    
})

Then('I double click to open the first work item',async()=>{
    await $("(//span[@class='awd-ba-type-data'][normalize-space()='SAMPLEBA - AUTOTEST2'])[1]").waitForDisplayed(5000);
    await browser.pause(1000);
    await $("(//span[@class='awd-ba-type-data'][normalize-space()='SAMPLEBA - AUTOTEST2'])[1]").doubleClick();


    // var l = await browser.getWindowHandles()
    // await console.log("l------------------>" + l );
    // await browser.switchToWindow(l[0])
    // await console.log(browser.getTitle());

    // await browser.keys("\ue004")
    // await browser.pause(1000)
    // await browser.keys("\ue004")
    // await browser.pause(1000)
    // await browser.keys("\uE006")
    // await browser.pause(1000)
    // await browser.debug();
    
    //await $("//button[normalize-space()='Next']").click();
    await browser.pause(3000);
    
    await handlePopupAccept();
    await enterKeysinMSWORD();
})

Then('I accept the pop up in chrome dialog to open MS Word', async()=>{
    await handlePopupAccept();
})

Then('I click Next button in the MS Word opened', async()=>{
    await enterKeysinMSWORD();
})

Then('I wait for few seconds', async()=>{
    await browser.pause(5000);
})

Then('I wait for table data to be displayed', async()=>{
    await $("//table//tr[2]").waitForDisplayed(5000);  
})

Then('I add a new record to EmpTable1', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];
    await $("(//span[@class='add-row'][normalize-space()='Add Row'])[1]").waitForDisplayed();
    await $("(//span[@class='add-row'][normalize-space()='Add Row'])[1]").click();
    await $("//div[@class='heading title']").waitForDisplayed(2000);
    await $("//div[@class='rowValue'][contains(text(),'Ename')]/following-sibling::div//input").setValue(dataValue[0]);
    await $("//div[@class='rowValue'][contains(text(),'Eid')]/following-sibling::div//input").setValue(dataValue[1]);
    await $("//div[@class='rowValue'][contains(text(),'EDOB')]/following-sibling::div//input").setValue(dataValue[2]);
    await browser.keys("\uE004")
    await $("//div[@class='rowValue'][contains(text(),'EfullTime')]/following-sibling::div//input").setValue(dataValue[3]);
    await $("//span[normalize-space()='Save']").click();
    await $("//div[@class='heading title']").waitForDisplayed({reverse: true});
})

Then('I add a new record to EmpTable2', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];
    await $("(//span[@class='add-row'][normalize-space()='Add Row'])[2]").waitForDisplayed();
    await $("(//span[@class='add-row'][normalize-space()='Add Row'])[2]").click();
    await $("//div[@class='heading title']").waitForDisplayed(2000);
    await $("//div[@class='rowValue'][contains(text(),'A1')]/following-sibling::div//input").setValue(dataValue[0]);
    await $("//div[@class='rowValue'][contains(text(),'A2')]/following-sibling::div//input").setValue(dataValue[1]);
    await $("//div[@class='rowValue'][contains(text(),'A3')]/following-sibling::div//input").setValue(dataValue[2]);
    await browser.keys("\uE004")
    await $("//div[@class='rowValue'][contains(text(),'A4')]/following-sibling::div//input").setValue(dataValue[3]);
    await $("//span[normalize-space()='Save']").click();
    await $("//div[@class='heading title']").waitForDisplayed({reverse: true});

    
})

Then('I select newly created record', async()=>{

    const records = await $$("(//table[@role='grid'])[1]//tbody/tr").getElements();
    const recCounter = await records.length;
    await $("(//table[@role='grid'])[1]//tbody/tr["+recCounter+"]/td[2]").click()

    const records2 = await $$("(//table[@role='grid'])[1]//tbody/tr").getElements();
    const recCounter2 = await records2.length;
    await $("(//table[@role='grid'])[2]//tbody/tr["+recCounter2+"]/td[1]//div[@role='checkbox']").click()
    //const recCounter3 = recCounter2-1;
    //await $("(//table[@role='grid'])[2]//tbody/tr["+recCounter3+"]/td[1]//div[@role='checkbox']").click()

})

Then('I click submit button to complete the entry', async()=>{

    await $("//button[normalize-space()='Submit']").waitForDisplayed();
    await $("//button[normalize-space()='Submit']").click();


})

Then('I verify the below content in the EmpDetails table', async(dataTable)=>{
    
    await $("//div[contains(text(),'EmpDetails_ReceivingTable_AllRows')]").waitForDisplayed(2000);
    let dataValue = await dataTable.raw()[0];
    await $("//div[contains(text(),'EmpDetails_ReceivingTable_AllRows')]").waitForDisplayed(2000);
    const records = await $$("(//table[@role='grid'])[1]//tbody/tr").getElements();
    const recCounter = await records.length;
    console.log("recCounter", recCounter);

    await expect(await $("((//table[@role='grid'])[1]//tbody/tr)["+recCounter+"]/td[1]")).toHaveText(dataValue[0]);
    await expect(await $("((//table[@role='grid'])[1]//tbody/tr)["+recCounter+"]/td[2]")).toHaveText(dataValue[1]);
    await expect(await $("((//table[@role='grid'])[1]//tbody/tr)["+recCounter+"]/td[3]")).toHaveText(dataValue[2]);
    await expect(await $("((//table[@role='grid'])[1]//tbody/tr)["+recCounter+"]/td[4]")).toHaveText(dataValue[3]);

})

Then('I verify the below content in the EmpDetails2 table', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];
    await $("//div[contains(text(),'EmpDetails_ReceivingTable_AllRows')]").waitForDisplayed(2000);
    const records = await $$("(//table[@role='grid'])[3]//tbody/tr").getElements();
    const recCounter = await records.length;
    console.log("recCounter", recCounter);

    await expect(await $("((//table[@role='grid'])[3]//tbody/tr)["+recCounter+"]/td[1]")).toHaveText(dataValue[0]);
    await expect(await $("((//table[@role='grid'])[3]//tbody/tr)["+recCounter+"]/td[2]")).toHaveText(dataValue[1]);
    await expect(await $("((//table[@role='grid'])[3]//tbody/tr)["+recCounter+"]/td[3]")).toHaveText(dataValue[2]);
    await expect(await $("((//table[@role='grid'])[3]//tbody/tr)["+recCounter+"]/td[4]")).toHaveText(dataValue[3]);

})

Then('I verify the below content in the EmpDetails selected rows table', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];

    await expect(await $("((//table[@role='grid'])[2]//tbody/tr)[1]/td[2]")).toHaveText(dataValue[0]);
    await expect(await $("((//table[@role='grid'])[2]//tbody/tr)[1]/td[3]")).toHaveText(dataValue[1]);
    await expect(await $("((//table[@role='grid'])[2]//tbody/tr)[1]/td[4]")).toHaveText(dataValue[2]);
    await expect(await $("((//table[@role='grid'])[2]//tbody/tr)[1]/td[5]")).toHaveText(dataValue[3]);

})

Then('I verify the below content in the EmpDetails2 selected rows table', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];

    await expect(await $("((//table[@role='grid'])[4]//tbody/tr)[1]/td[1]")).toHaveText(dataValue[0]);
    await expect(await $("((//table[@role='grid'])[4]//tbody/tr)[1]/td[2]")).toHaveText(dataValue[1]);
    await expect(await $("((//table[@role='grid'])[4]//tbody/tr)[1]/td[3]")).toHaveText(dataValue[2]);
    await expect(await $("((//table[@role='grid'])[4]//tbody/tr)[1]/td[4]")).toHaveText(dataValue[3]);

    await $("//button[normalize-space()='Submit']").click();
    //await $("//div[contains(text(),'EmpDetails_ReceivingTable_AllRows')]").waitForDisplayed({reverse: true});
})

Then('I select records from the two tables', async()=>{
    await $("//div[contains(text(),'Emptable1')]").waitForDisplayed(5000);
    await $("(//table)[1]/tbody/tr[1]//div[@role='checkbox']").click();
    await $("(//table)[2]/tbody/tr[2]//div[@role='checkbox']").click();
})

Then('I verify the below content in the Emptable1', async(dataTable)=>{
    let dataValue = await dataTable.raw()[0];

        await expect(await $("//table/tbody/tr[1]//td[1]")).toHaveText(dataValue[0]);
        await expect(await $("//table/tbody/tr[1]//td[2]")).toHaveText(dataValue[1]);
        await expect(await $("//table/tbody/tr[1]//td[3]")).toHaveText(dataValue[2]);
        await expect(await $("//table/tbody/tr[1]//td[4]")).toHaveText(dataValue[3]);

})

Then('I select case management', async()=>{
    await $("#ui-id-2").waitForDisplayed(10000);
    await $("#ui-id-2").click();
    await $("#cm-add-new-case").click();
    //await expect(browser).toHaveUrl("https://awddev.trialclient1.awdcloud.co.uk/awd/cm/case.html")
    console.log(browser.url);

})

Then('I create new case {string}', async(caseNameTxt)=>{
    //await expect(browser).toHaveTitleContaining('CM: Add new case');
    //await $('#some-element').click();
    const handles = await browser.getWindowHandles();
    console.log('Open tabs:', handles);
    await browser.switchToWindow(handles[1]); // Switch to new case window
    await $("//input[@id='caseNameInput']").waitForDisplayed(3000);
    let caseName = caseNameTxt + '_' + Math.floor(Math.random() * 10000);
    await $("//input[@id='caseNameInput']").setValue(caseName); // Set Case name
    await $('#saveAnchor').click(); // Click Create button
    await $("//*[@id='cm_case_select_template']/div/fieldset[2]/ol/li[1]/span").waitForDisplayed(3000);
    await $("//*[@id='cm_case_select_template']/div/fieldset[2]/ol/li[1]/span").click(); //click to select Case template
    await $("//*[@id='cm_case_select_template']/div/div/span[1]").waitForDisplayed(3000);
    await $("//*[@id='cm_case_select_template']/div/div/span[1]").click(); //click 'choose template' button
    await $("//*[@id='ownerMenuListItem']/div/input").waitForDisplayed(3000);
    await $("//*[@id='ownerMenuListItem']/div/input").setValue('test tester1'); //set 'owner' field
    
})

Then('I enter case facts like email {string}, firstname {string}', async(email,firstName)=>{
    await $("//*[@id='cm_case_facts_wrapper']/label[1]/input").waitForDisplayed(3000);
    await $("//*[@id='cm_case_facts_wrapper']/label[1]/input").setValue(email);
    await $("//*[@id='cm_case_facts_wrapper']/label[3]/input").waitForDisplayed(3000);
    await $("//*[@id='cm_case_facts_wrapper']/label[3]/input").setValue(firstName);
    await $("//*[@id='saveAnchor']").waitForDisplayed(3000);
    await $("//*[@id='saveAnchor']").click();
    handleCasePopupAccept();

})

Then('I work on the task entering the firstname {string}', async(firstName)=>{
    await $("//*[@id='cm_case_task_div']").waitForDisplayed(7000);
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li").waitForDisplayed(7000); //Click on the first task arrow
   /* const toggleLink = await $('//*[@id="cm_case_tasklist"]/li/a');
    // Check if the section is hidden
    const section = await $('/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[3]');
    const isVisible = await section.isDisplayed();
    if (!isVisible) {
        await toggleLink.click(); // click to expand
        await section.waitForDisplayed({ timeout: 5000 });
    }
    const expanders = await $("/html/body/div[1]/div[2]/section[2]//a[img[@src='css/images/black-twisty-closed.png']].expander");

    for (const expander of expanders) {
    const classAttr = await expander.getAttribute('class');

    if (classAttr.includes('closed')) {
        await expander.scrollIntoView();
        await expander.click();
        await browser.pause(500); // or wait for content to appear
        }
    }*/
//    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/a").waitForExist(3000);
 //   await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/a").click();
    //const el = await $('//*[contains(@class, "expander prompt-for-form-changed closed")]');
    //await el.waitForDisplayed();
    //await el.click();
    const anchor = await $('//a[contains(@class, "expander")]');
    await anchor.waitForDisplayed();
    await anchor.click();

    //await $("//*[@id='ui-id-3']").waitForDisplayed(7000);
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[3]/div[1]/article/div/div[1]/form/div/label[1]/input").waitForDisplayed(3000);
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[3]/div[1]/article/div/div[1]/form/div/label[1]/input").setValue(firstName);//First Name field
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[3]/div[1]/article/div/div[1]/form/div/button[2]").waitForDisplayed(3000);
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[3]/div[1]/article/div/div[1]/form/div/button[2]").click(); //Confirm Button
    await $("/html/body/div[1]/div[2]/section[2]/div/div[2]/ol/li/div/div[1]/a/div/input").setValue("completeTask"); //Task Actions
    await $("/html/body/div[8]/div[3]/div").waitForDisplayed(3000);
    await $("/html/body/div[8]/div[3]/div/button[2]").click();//popup 'Yes' Button
})

Then('I mark the case as complete', async()=>{
    await browser.pause(5000);
    await $("/html/body/div[1]/div[1]/div/nav/div[3]/div[2]/a").waitForDisplayed(7000);
    await $("/html/body/div[1]/div[1]/div/nav/div[3]/div[2]/a").click(); // Click on 'Complete' Button next to case name
    await $("/html/body/div[8]/div[1]/span").waitForDisplayed(7000);
    await $("/html/body/div[8]/div[3]/div/button[2]").waitForDisplayed(3000);
    await $("/html/body/div[8]/div[3]/div/button[2]").click(); // Click on 'Yes' on popup
    await $("/html/body/div[1]/div[1]/div/nav/div[3]/div[3]/span[2]").waitForDisplayed(3000);
    await expect($("/html/body/div[1]/div[1]/div/nav/div[3]/div[3]/span[2]")).toHaveText('Done'); // Check if the status is marked as 'Done'
})