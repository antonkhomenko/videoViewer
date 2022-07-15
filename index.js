require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
async function run() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.youtube.com/');
    await driver.findElement(By.id('search')).sendKeys("naruto", Key.RETURN);
}
run();