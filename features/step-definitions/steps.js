import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'
import { handlePopupAccept, enterKeysinMSWORD } from './robotkey';


When('I login with username {string} and password {string}', async(userNameTxt, passwordTxt)=>{
        await $("#user-name").setValue(userNameTxt)
        await $("#password").setValue(passwordTxt)
        await $("#sign-on").click()
        await $("//div[@class='ui-card-main-text'][contains(text(),'Worklist')]").waitForDisplayed(5000);
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
    let dataValue = dataTable.raw()[1];
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
    
})

Then('I enter the Email {string} and complete the work',async(emailaddressTxt)=>{
    await $("//input[@awdname='EMAL']").setValue(emailaddressTxt);
    await $("//button[@name='NextStep']").click();
    await browser.pause(2000);
})

Then('I enter the Email {string} and proceed AUTOTEST2 work', async(emailaddressTxt)=>{
    await browser.pause(1000);
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