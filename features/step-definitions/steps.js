import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'
import { handlePopupAccept, enterKeysinMSWORD } from './robotkey';


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
    await $("//button[normalize-space()='Next']").click()
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
    await browser.switchToWindow(handles[1]);
    await $("//input[@id='caseNameInput']").waitForDisplayed(3000);
    let caseName = caseNameTxt + '_' + Math.floor(Math.random() * 10000);
    await $("//input[@id='caseNameInput']").setValue(caseName);
    await $('#saveAnchor').click();
})