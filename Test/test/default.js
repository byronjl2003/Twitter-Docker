const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until,Capabilities} = require('selenium-webdriver');
const geckoDriverPath  = require('chromedriver').path;
const { expect } = require('chai');

let service = new chrome.ServiceBuilder(geckoDriverPath ).build();
chrome.setDefaultService(service);


describe('DefaultTest', () => {
    let driver =  new Builder().withCapabilities(Capabilities.chrome()).build();
   
        it('should go to nehalist.io and check the title' , async() => {
    try {       
        await driver.get('https://www.google.com');
        const title = await driver.getTitle();

        expect(title).to.equal('Google');
     } finally {
        await driver.quit();
     }
    });
});