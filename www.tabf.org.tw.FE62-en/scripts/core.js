const pageIndexes = [
    ['', 'main.html', 'index.html'],
    ['about.html'],
    ['roam.html'],
    ['explore.html'],
    ['only.html'],
    ['information.html']
];
const pageLinksData = [
    {
        label: '關於FE62',
        url: 'about.html'
    },
    {
        label: '漫遊Bankers’ Salon',
        url: 'roam.html'
    },
    {
        label: '探索FE62',
        url: 'explore.html'
    },
    {
        label: '實體展館限定',
        url: 'only.html'
    },
    {
        label: '預約實體展館導覽',
        hoverMessage: '立即線上預約',
        url: 'information.html'
    }
];
let scrollDetectTimer = null;
let currPageIndex = null;


const getCurrPageURL = () => {
    return document.baseURI && document.baseURI !== 'about : blank' ?
        document.baseURI : document.URL && document.URL !== 'about : blank' ?
        document.URL : window && window.location && window.location.href && window.location.href !== 'about : blank' ?
        window.location.href : '';
}

const getCurrPageINDEX = () => {
    const pageUrlSeq = getCurrPageURL().split("/");
    const pageName = pageUrlSeq.length > 0 ? pageUrlSeq[pageUrlSeq.length - 1] : '';
    let result = null;
    pageIndexes.forEach((arr, index) => {
        if (arr.indexOf(pageName) >= 0) {
            result = index;
        }
    });
    return result;
}

const getScrollPosition = () => {
    const scrollTop = document.getElementsByTagName('body')[0].scrollTop || document.documentElement.scrollTop;
    return scrollTop;
}

const scrollPositionCheck = (event) => {
    const pageBody = event ? event.target.body : document.getElementsByTagName('body')[0];
    const scrollTop = getScrollPosition(event);
    // console.log('scrollPositionCheck => scrollTop : ', scrollTop);
    clearTimeout(scrollDetectTimer);
    scrollDetectTimer = setTimeout(() => {
        if (scrollTop > 0) {
            pageBody.classList.add('scrolled');
        } else {
            pageBody.classList.remove('scrolled');
        }
    }, 20);
};

const setupOnScrollHandler = () => {

    document.addEventListener('scroll', scrollPositionCheck);

}

const drawHeaderUI = () => {
    const pool = document.getElementById('desktop-links');
    if (!pool) return false;
    pool.innerHTML = "";
    pageLinksData.forEach((itm, index) => {
        const link = document.createElement("a");
        if (itm.hoverMessage === undefined || itm.hoverMessage === '') {
            link.innerHTML = itm.label;
        } else {
            const defaultLabel = document.createElement('span');
            const hoverLabel = document.createElement('span');
            defaultLabel.innerHTML = itm.label;
            hoverLabel.innerHTML = itm.hoverMessage;
            link.appendChild(defaultLabel);
            link.appendChild(hoverLabel);
            link.classList.add('link-with-hover-message');
        }
        link.href = itm.url;
        if (index === (pageLinksData.length - 1)) {
            link.classList.add('link-bubble');
        }
        if (index + 1 === currPageIndex) {
            link.classList.add('active');
        }

        pool.appendChild(link);
    });
    const pageBody = document.getElementsByTagName('body')[0];
    const pageBodyClassList = pageBody.classList;
    pageBodyClassList.add('header-loaded');
}

const toggleMenu = () => {
    const mainDom = document.getElementsByTagName('main');
    const scrollPos = getScrollPosition();
    const htmlDom = document.documentElement;
    const htmlDomClassList = htmlDom.classList;
    const classNameToToggle = 'mobile-menu-open';
    if (Array.from(htmlDomClassList).indexOf(classNameToToggle) >= 0) {
        if (mainDom !== undefined && mainDom.length > 0) {
            if (mainDom[0].style.marginTop !== '') {
                const scrollToPos = Math.abs(parseInt(mainDom[0].style.marginTop)) + 0;
                console.log('scrollToPos : ', scrollToPos);

                mainDom[0].style.marginTop = '';
                setTimeout(() => window.scrollTo(0, scrollToPos), 2);
            } else {
                mainDom[0].style.marginTop = '';
            }
        }
        htmlDomClassList.remove(classNameToToggle);
    } else {
        if (getScrollPosition() > 0 && mainDom !== undefined && mainDom.length > 0) {
            mainDom[0].style.marginTop = '-' + scrollPos + 'px';
            // console.log(mainDom[0].style);
        }
        htmlDomClassList.add(classNameToToggle);
    }
}

const drawMobileMenuUI = (target) => {

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('mobile-menu');

    /*<img src="images/btn_close.png" width="50" height="50">*/
    const closeBtn = document.createElement('a');
    const closeBtnImg = document.createElement('img');
    closeBtn.classList.add('mobile-menu-close-btn');
    closeBtnImg.src = "images/btn_close.png";
    closeBtn.appendChild(closeBtnImg);
    closeBtn.addEventListener('click', (evt) => {
        toggleMenu();
    }, false);

    pageLinksData.forEach((itm, index) => {
        const link = document.createElement("a");
        link.innerHTML = itm.label;
        link.href = itm.url;
        if (index === (pageLinksData.length - 1)) {
            link.classList.add('link-bubble');
        }
        if (index + 1 === currPageIndex) {
            link.classList.add('active');
        }

        menuContainer.appendChild(link);
    });
    menuContainer.appendChild(closeBtn);
    target.appendChild(menuContainer);
}

const setupMobileMuenTrigger = () => {
    const tirgger = document.getElementById('site-mobile-menu-trigger');
    if (!tirgger) return false;
    const pageBody = document.getElementsByTagName('body')[0];
    if (!pageBody) return false;
    if (tirgger !== undefined) {
        tirgger.addEventListener('click', (evt) => {
            toggleMenu();
        }, false);
    }
    drawMobileMenuUI(pageBody);
}

const closeWindow = (e) => {

    e.preventDefault();

    const userAgent = window.navigator.userAgent.toLowerCase()
    const safari = /safari/.test(userAgent);
    const ios = /iphone|ipod|ipad/.test(userAgent);
    const android = /android/.test(userAgent);

    if (ios && !safari) {
        if (history.length > 0) {
            history.back();
        } else {
            // window.close();
            location.href = 'index.html';
        }
    } else {
        window.close();
    }
}

const setupCloseBtn = () => {
    const closeBtn = document.getElementById('btn-close-window');
    if (!closeBtn) return false;
    if (closeBtn !== undefined) {
        closeBtn.addEventListener('click', closeWindow, false);
    }
}


currPageIndex = getCurrPageINDEX();
// console.log(document.getElementById('desktop-links').getElementsByTagName('A'));
drawHeaderUI();
scrollPositionCheck();


window.addEventListener("load", (event) => {
    // console.log("page is fully loaded");
    setupOnScrollHandler();
    setupMobileMuenTrigger();
    setupCloseBtn();
});
