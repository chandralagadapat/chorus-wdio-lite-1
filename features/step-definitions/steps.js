import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'


When('I login with username {string} and password {string}', async(userNameTxt, passwordTxt)=>{
        await $("#user-name").setValue(userNameTxt)
        await $("#password").setValue(passwordTxt)
        await $("#sign-on").click()
        await $("//div[@class='ui-card-main-text'][contains(text(),'Worklist')]").waitForDisplayed(5000);
});


When('I launch the Chorus UAT portal', async()=>{
    await browser.maximizeWindow();
    await browser.url("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
    await expect(browser).toHaveUrl("https://awddev.trialclient1.awdcloud.co.uk/awd/portal/login.html")
    await expect(browser).toHaveTitle("Sign on to Chorus");
})