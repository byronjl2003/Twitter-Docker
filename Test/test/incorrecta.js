const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until,Capabilities} = require('selenium-webdriver');
const geckoDriverPath  = require('chromedriver').path;
const { expect } = require('chai');

let service = new chrome.ServiceBuilder(geckoDriverPath ).build();
chrome.setDefaultService(service);


describe('DefaultTest', () => {
    let driver =  new Builder().withCapabilities(Capabilities.chrome()).build();
   
        it('Autentificacion correcta' , async() => {
    try {       
        await driver.get('http://130.211.112.112');
        await driver.findElement(By.name('usr')).sendKeys('@jorge')
        await driver.findElement(By.name('pass')).sendKeys('asd',Key.ENTER)
        await driver.sleep(1000);
        var promise  = await driver.findElement(By.name('usr')).getAttribute("value")
        .then((value) => { return value; });;

        expect(promise).to.equal('@jorge');
       
       
     } finally {
        after(async () => driver.quit());
     }
    });
});
