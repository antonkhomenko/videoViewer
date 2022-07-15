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
    settingContainer: document.querySelector('.settingsContainer'),
};



theme.button.addEventListener('click', () => {
    theme.button.classList.toggle('rotateElem');
    theme.settingContainer.classList.toggle('settingsContainerDarkMode');
    if(!theme.currentTheme().includes('darkTheme')) {
        document.body.classList.add('darkTheme');
        theme.icons()[0].style.display = "block";
        theme.icons()[1].style.display = "none";
    } else {
        document.body.classList.remove('darkTheme');
        theme.icons()[0].style.display = "none";
        theme.icons()[1].style.display = "block";
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




