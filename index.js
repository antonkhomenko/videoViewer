let {Builder, Key, By, until} = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");


let chromeOptions = new chrome.Options();
chromeOptions.addArguments("--incognito");


async function openBrowser() {
    let driver = new Builder().forBrowser('chrome').build();
     await signIn(driver, 'mamyebali1001@gmail.com', 'suka5225');
     await playVideo(driver, 'https://www.youtube.com/results?search_query=%5BFREE%5D+Playboi+Carti+Type+Beat++KIKI+phantom&sp=CAISBAgDEAE%253D');
}



async function signIn(driver, login, password) {
    driver.get('https://accounts.google.com/o/oauth2/auth/identifier?operation=login&state=google-%7Chttps%3A%2F%2Fmedium.com%2F%3Fsource%3Dlogin--------------------------lo_home_nav-----------%7Clogin&access_type=online&client_id=216296035834-k1k6qe060s2tp2a2jam4ljdcms00sttg.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fmedium.com%2Fm%2Fcallback%2Fgoogle&response_type=id_token%20token&scope=email%20openid%20profile&nonce=55616b24a2b6c371026bc53f77efbc845f2da851d371a1586a23971512943d3e&flowName=GeneralOAuthFlow');
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
    await driver.sleep(5500);
    let videoTimer = await driver.findElement(By.xpath('//span[@class="style-scope ytd-thumbnail-overlay-time-status-renderer"]')).getText();
    let browserCloseTimer = videoTimer.split(":")[0] * 60000 + videoTimer.split(":")[1] * 1000;
    await driver.findElement(By.xpath('//a[@id="video-title"]')).click();
    await driver.sleep(browserCloseTimer);
    driver.close();
}

function start(counter, callback) {
    for(let i = 0; i < counter; i++) {
        callback();
    }
}

start(3, openBrowser);





