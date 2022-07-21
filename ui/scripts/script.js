//const headerLine = document.getElementById('headerLine');

function headerLoader(str) {
    const headerLine = document.getElementById('headerLine');
    let arrStr = str.split('');
    let counter = 0;
    let out = "";
    return function inner() {
        let timeout = setTimeout(() => {
            out += arrStr[counter];
            headerLine.innerText = out;
            counter++
            if(counter >= arrStr.length) {
                clearTimeout(timeout);
                return true;
            }
            inner();
        }, 60)
    }
}

headerLoader('Куда накрутим сегодня ?')();
//theme

const theme = {
    button: document.getElementById('changeThemeBtn'),
    currentTheme: () => document.body.className,
    icons() {
        return this.button.children;
    },
    headerSettingsContainers: document.querySelectorAll('.settingsContainer > div > b'),
    currentWindowSettings: document.querySelector('.currentWindow'),
    accountItemTitle: () => { return [...document.getElementsByClassName('accountItemTitle')] },
    accountItemsInput: () => { return [...document.querySelectorAll('.accountItem > div > input')] },
    submitSettingsBtn: document.getElementById('submitSettingsBtn'),
};



theme.button.addEventListener('click', () => {
    theme.button.classList.toggle('rotateElem');
    theme.currentWindowSettings.classList.toggle('currentWindowDark');
    theme.headerSettingsContainers.forEach(item => item.classList.toggle('settingsContainerBdark'));
     theme.accountItemTitle().forEach(item => item.classList.toggle('accountItemDarkMode'));
     theme.accountItemsInput().forEach(item => item.classList.toggle('accountItemDarkMode'));
     theme.submitSettingsBtn.classList.toggle('submitSettingsBtnDarkTheme');
    if(!theme.currentTheme().includes('darkTheme')) {
        document.body.classList.add('darkTheme');
        theme.icons()[0].style.display = "block";
        theme.icons()[1].style.display = "none";
        // theme.accountItemTitle().forEach(item => item.classList.add('accountItemDarkMode'));
        // theme.accountItemsInput().forEach(item => item.classList.add('accountItemDarkMode'));
    } else {
        document.body.classList.remove('darkTheme');
        theme.icons()[0].style.display = "none";
        theme.icons()[1].style.display = "block";
        // theme.accountItemTitle().forEach(item => item.classList.remove('accountItemDarkMode'));
        // theme.accountItemsInput().forEach(item => item.classList.remove('accountItemDarkMode'));
    }
})




const searchBtn = document.getElementById('searchBtn');


searchBtn.onmouseover = searchBtn.onmouseleave = hoverFunc;

function hoverFunc(event) {
    let icon = searchBtn.children[0];
    if(event.type == 'mouseover') {
        if(!theme.currentTheme().includes('darkTheme')) {
            searchBtn.style.backgroundColor = '#fff';
            searchBtn.style.color = 'blue';
            icon.style.fill = "blue";
        } else {
            searchBtn.style.backgroundColor = '#fff';
            searchBtn.style.color = 'darkblue';
            icon.style.fill = 'darkblue';
        }
    }
    if(event.type == 'mouseleave') {
        searchBtn.style.backgroundColor = 'transparent';
        searchBtn.style.color = "#fff";
        icon.style.fill = '#fff';
    }
}

const expandSettingsContainer = document.getElementsByClassName('expandSettingsContainer');
const settingsWindows = [...document.querySelectorAll('.settingsWindow')];
const settingsList = [...document.querySelectorAll('.settingsList')];


for(let i = 0; i < expandSettingsContainer.length; i++) {
    expandSettingsContainer[i].onclick = (event) => {
        let targetElem = expandSettingsContainer[i].parentElement;
        let targetImg = expandSettingsContainer[i].children[0];
        let targetImgSrc = targetImg.src.slice(targetImg.src.lastIndexOf('imgs/') + 5);
        let getAccountItemExpand = () => {
           return [...document.querySelectorAll('.accountItem > div')].slice(1);
        };
        if(targetImgSrc != 'collapseIcon.png') {
            targetImg.src = './imgs/collapseIcon.png';
            if(document.getElementsByClassName('accountItem').length != 0) {
                getAccountItemExpand().forEach(item => item.style.justifyContent = 'center');
            }
        } else {
            targetImg.src = './imgs/expandIcon.png';
        }

        settingsWindows.forEach(item => {
            if(item.className != targetElem.className) {
                item.classList.toggle('invisibleSettingWindow');
            } else {
                item.classList.toggle('expandedWindow');
                item.querySelector('.settingsList').classList.toggle('expandedWindow');
            }
        })
    };
}

const addListBtn = document.querySelectorAll('.addListBtn');

for(let i = 0; i < addListBtn.length; i++) {
    addListBtn[i].addEventListener('click', (event) => {
        addListBtn[i].style.width = '0px';
        let targetSettingList = addListBtn[i].parentElement;
        if(targetSettingList.parentElement.classList.contains('settingsAccountsContainer')) {
            setTimeout(() => {
                addListBtn[i].style.display = 'none'
                targetSettingList.classList.remove('emptySettingsList');
                targetSettingList.classList.add('filledSettingsList');
                targetSettingList.append(createSettingsList());
                targetSettingList.innerHTML = targetSettingList.innerHTML + createPlusAccountItem();
                getPlusAccountItem()[0].addEventListener('click', () => {
                    let liList = targetSettingList.querySelectorAll('li');
                    liList[liList.length - 1].after(createSettingsList());
                    if (theme.currentTheme().includes('darkTheme')) {
                        theme.accountItemTitle().forEach(item => item.classList.add('accountItemDarkMode'));
                        theme.accountItemsInput().forEach(item => item.classList.add('accountItemDarkMode'));
                    }
                })
                if (theme.currentTheme().includes('darkTheme')) {
                    theme.accountItemTitle().forEach(item => item.classList.add('accountItemDarkMode'));
                    theme.accountItemsInput().forEach(item => item.classList.add('accountItemDarkMode'));
                }
                if (document.querySelector('.settingsList').classList.contains('expandedWindow')) {
                    [...document.querySelectorAll('.accountItem > div')]
                        .slice(1)
                        .forEach(item => item.classList.add('accountItemExpanded'));
                }
            }, 500);
        } else {
            setTimeout(() => {
                targetSettingList.classList.remove('emptySettingsList');
                targetSettingList.classList.add('filledSettingsList');
                let proxyI = createProxyItem();
                targetSettingList.append(proxyI());
                targetSettingList.innerHTML = targetSettingList.innerHTML + createPlusAccountItem();
                let getProxyList = () => {
                    return targetSettingList.querySelectorAll('li');
                }
                let plusArr = getPlusAccountItem();
                let targetPlus;
                if(plusArr.length > 1) {
                    targetPlus = plusArr[1];
                } else {
                   targetPlus = plusArr[0];
                }
                targetPlus.addEventListener('click', () => {
                    let arr = getProxyList();
                    arr[arr.length - 1].after(proxyI());
                });

            }, 500);
        }
    });
}

let accountCounter = 1;

function createSettingsList() {
    let elem = document.createElement('li');
    elem.classList.add('accountItem');
    elem.innerHTML = `
            <div class="accountItemTitle">
                Аккаунт ${accountCounter++}
            </div>
            <div class="accountItemLogin">
                <span>Логин:</span>
                <input type="text">
            </div>
            <div class="accountItemPassword">
                <span>Пароль:</span>
                <input type="text">
            </div>`;
     return elem;
}

function createPlusAccountItem() {
    return `
    <button class="plusAccountItem">
        <svg viewBox="0 0 448 512">
        <path d="M384 32H64C28.65 32 0 60.66 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.66 419.3 32 384 32zM319.1 280h-72V352c0 13.2-10.8 24-23.1 24c-13.2 0-24-10.8-24-24V280H127.1C114.8 280 103.1 269.2 103.1 256c0-13.2 10.8-24 24-24h71.1V160c0-13.2 10.8-24 24-24c13.2 0 23.1 10.8 23.1 24v72h72c13.2 0 23.1 10.8 23.1 24C343.1 269.2 333.2 280 319.1 280z"/>
        </svg>
    </button>
    `;
}

function getPlusAccountItem() {
    return document.getElementsByClassName('plusAccountItem');
}

function createProxyItem() {
    let counter = 1;
    return function() {
        let elem = document.createElement('li');
        elem.classList.add('proxyItem');
        elem.innerHTML = `
         <span class="proxyCounter">
           ${counter++}
         </span>
         <input type="text" placeholder="0.0.0.0:0000" class="proxyInput">
        `;
        return elem;
    }
}

const browserCount = document.getElementById('browserCount');
const browserRange = document.getElementById('browserRange');

browserCount.innerText = browserRange.value;

browserRange.addEventListener('input', () => {
    browserCount.innerText = browserRange.value;
})

const submitSettingsBtn = document.getElementById('submitSettingsBtn');

function createUsersObject() {
    let accountArr = [...document.getElementsByClassName('accountItem')];
    let result = new Map();
    accountArr.forEach(item => {
        let accountLogin = item.querySelector('.accountItemLogin > input').value;
        let accountPassword = item.querySelector('.accountItemPassword > input').value;
        result.set(accountLogin, accountPassword);
    });
    return result;
}

submitSettingsBtn.addEventListener('click', () => {
    let accounts = createUsersObject();


})









