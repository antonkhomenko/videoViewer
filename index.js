let {Builder, Key, By, until, Capabilities, logging} = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let firefox = require("selenium-webdriver/firefox");
let proxy = require("selenium-webdriver/proxy");




     async function openBrowser(videoUrl, login, password) {

        let option = new firefox.Options()
            .addExtensions('extension/multi_account_containers-8.0.7.xpi');

        let driver = new Builder()
            .withCapabilities(Capabilities.firefox())
            .build();

        //await signIn(driver, 'testbotantoha5@gmail.com', 'qwerty5225');
        await signIn(driver, login, password)
        await playVideo(driver, videoUrl);
    }



async function signIn(driver, login, password) {
    driver.get('https://accounts.google.com/ServiceLogin/identifier?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
    let loginInput = await driver.findElement(By.xpath('//input[@autocomplete="username"]'));
    await loginInput.sendKeys(login, Key.RETURN);
    await driver.sleep(1000);
    await driver.navigate().refresh();
    let passwordInput = await driver.findElement(By.xpath('//input[@autocomplete="current-password"]'));
    let passwordBtn = await driver.findElement(By.xpath('//button[@class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 qIypjc TrZEUc lw1w4b"]'));
    await passwordInput.sendKeys(password);
    await passwordBtn.click();
}

async function playVideo(driver, videoUrl) {
    await driver.sleep(1000);
    await driver.get(videoUrl);
    await driver.sleep(6000);
    let videoTimer = await driver.findElement(By.xpath('//span[@class="style-scope ytd-thumbnail-overlay-time-status-renderer"]')).getText();
    let browserCloseTimer = videoTimer.split(":")[0] * 60000 + videoTimer.split(":")[1] * 1000;
    await driver.findElement(By.xpath('//*[@id="video-title"]')).click();
    await driver.sleep(browserCloseTimer);
    driver.close();
}


function createServer() {
    const express = require("express");
    const path = require("path");

    const app = express();

    const http = require("http");
    const server = http.createServer(app);
    const {Server} = require("socket.io");
    const io = new Server(server);


    app.use(express.static(__dirname + '/ui'));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/ui/index.html'));
    });


    io.on('connection', (socket) => {
        socket.on('seleniumData', (data) => {
            let [videoUrl, browserCounter, accounts] = JSON.parse(data);
            browserCounter = +browserCounter;
            let accountsArr = Object.entries(accounts);
            for(let i = 0; i < browserCounter; i++) {
                let [login, password] = accountsArr.shift();
                openBrowser(videoUrl, login, password);
            }
        })
    });

    server.listen(3000);

    let driver = new Builder().forBrowser('chrome').build();
    driver.get("http://localhost:3000");

}

// let test = wrapperOpenBrowser('https://www.youtube.com/results?search_query=%5BFREE%5D+Playboi+Carti+Type+Beat++KIKI+phantom&sp=CAISBAgDEAE%253D');
// test('mamyebali1001@gmail.com', 'suka5225');



createServer();

async function launch(data) {
    let [videoUrl, browserCounter, accounts] = JSON.parse(data);
    browserCounter = +browserCounter;
    let accountsArr = Object.entries(accounts);
    for(let i = 0; i < browserCounter; i++) {
          let [login, password] = accountsArr.shift();
        console.log(login, password);
    }

}

