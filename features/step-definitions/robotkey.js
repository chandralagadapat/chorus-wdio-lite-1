import robot from "robotjs";
import { expect, $, browser } from '@wdio/globals'


// Function to handle popup Accept
export async function handlePopupAccept() {
    // Give time for the popup to appear
    await browser.pause(1000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(1000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(1000);
    await robot.keyTap('enter'); // Press Cancel
    
}

// Function to handle popup Accept
export async function handleCasePopupAccept() {
    // Give time for the popup to appear
    await browser.pause(1000);
    await browser.pause(1000);
    await robot.keyTap('enter'); // Press Cancel
    
}

export async function handleCasePopupClear() {
  if (await browser.isAlertOpen()) {
    await browser.acceptAlert();
    console.log('✅ Alert accepted');
  } else {
    console.log('ℹ️ No alert to accept');
  }
}

// Function to handle task anchor tag
export async function handleAnchorTag() {
    // Give time for the Anchor to appear
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('tab');  // Focus Cancel
    await browser.pause(10000);
    await robot.keyTap('enter'); // Press Cancel
    //await robot.dragMouse
    
}
export async function enterKeysinMSWORD(){
    await browser.pause(5000);
    await robot.keyToggle('alt', 'down');
    await robot.keyTap('y');
    await robot.keyToggle('alt', 'up');
    await browser.pause(1000);
    await robot.keyTap('2'); 
    await browser.pause(1000);
    await robot.keyTap('Y'); 
    await browser.pause(1000);
    await robot.keyTap('2'); 
}

export async function enterKeysinMSWORDwithAbort(){
    await browser.pause(5000);
    await robot.keyToggle('alt', 'down');
    await robot.keyTap('y');
    await robot.keyToggle('alt', 'up');
    await browser.pause(1000);
    await robot.keyTap('2'); 
    await browser.pause(1000);
    await robot.keyTap('Y'); 
    await browser.pause(1000);
    await robot.keyTap('3'); 
}