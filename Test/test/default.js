const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until,Capabilities} = require('selenium-webdriver');
const geckoDriverPath  = require('chromedriver').path;
const { expect } = require('chai');

let service = new chrome.ServiceBuilder(geckoDriverPath ).build();
chrome.setDefaultService(service);


describe('Test 1', () => {
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
        //after(async () => driver.quit());
     }
    });
});

describe('Test 2', () => {
    let driver =  new Builder().withCapabilities(Capabilities.chrome()).build();
   
        it('Autentificacion correcta' , async() => {
    try {       
        await driver.get('http://130.211.112.112');
        await driver.findElement(By.name('usr')).sendKeys('@chino')
        await driver.findElement(By.name('pass')).sendKeys('qwe',Key.ENTER)
        await driver.sleep(1000);
        var promise  = await driver.findElement(By.xpath('//h1')).getAttribute("innerText")
        .then((value) => { return value; });;

        expect(promise).to.equal('Password incorrecta');
       
       
     } finally {
        //after(async () => driver.quit());
     }
    });
});

describe('Test 3', () => {
    let driver =  new Builder().withCapabilities(Capabilities.chrome()).build();
   
        it('Autentificacion correcta' , async() => {
    try {       
        await driver.get('http://130.211.112.112');
        await driver.findElement(By.name('usr')).sendKeys('@jorge')
        await driver.findElement(By.name('pass')).sendKeys('asd',Key.ENTER)
        await driver.sleep(1000);
        var promise  = await driver.findElement(By.xpath('//h3')).getAttribute("innerText")
        .then((value) => { 
            let val = value.toString().split(' '); 
            return Number(val[0].trim());
        });
        await driver.sleep(1000);
        await driver.findElement(By.name('txt')).sendKeys('holamundo',Key.ENTER)
        await driver.sleep(1000);
        var promise2  = await driver.findElement(By.xpath('//h3')).getAttribute("innerText")
        .then((value) => { 
            let val = value.toString().split(' '); 
            return Number(val[0].trim());
        });

        expect(promise2).to.equal(promise+1);
       
       
     } finally {
        //after(async () => driver.quit());
     }
    });
});

