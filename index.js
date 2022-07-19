const {Builder, By, Key} = require('selenium-webdriver');
require('chromedriver');
async function startDriver() {
    try {
        let driver = new Builder().forBrowser('chrome').build();
        let opt = new chromeOption()
        await driver.get('https://www.youtube.com/results?search_query=lil+uzi+vert+type+beat++pluto+phantom&sp=CAISBAgDEAE%253D');
        await driver.findElement(By.xpath('//a[@id="video-title"]')).click();
    } catch (error) {
        console.log(error)
    }

}

function start(count, callback) {
    for(let i = 0; i < count; i++) {
        callback();
    }
}

function loginToAccoutn() {
    console.log(login);
}

start(1, startDriver);