'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}
//              what,  where,   action
function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const os = select('.os');
const language = select('.lang');
const browser = select('.browser');
const pageHeight = select('.height');
const pageWidth = select('.width');
const pageOrientation = select('.orientation');
const batteryLevel = select('.level');
const batteryStatus = select('.status');
const wifiStatus = select('.wifi-status');

// System Info and Browser
function myOs() {
  os.innerText = `OS: ${navigator.platform}`;
}

function myLanguage() {
  language.innerText = `Language: ${navigator.language}`;
}


//Browser validation and verification
let userAgentString = navigator.userAgent;

function chrome(agent) {
  if (agent.includes('Chrome') && !agent.includes('Chromium') && 
  !agent.includes('OPR') && !agent.includes('Edg')) {
    return true;
  } return false;
};

function safari(agent) {
  if (agent.includes('Safari') && !agent.includes('Chrome')) {
    return true;
  } return false;
};

function firefox(agent) {
  if (agent.includes('Firefox')) {
    return true;
  } return false;
};

function internetExplorer(agent) {
  if (agent.includes('MSIE') || agent.includes('Trident')) {
    return true;
  } return false;
};

function opera(agent) {
  if (agent.includes('OPR') || agent.includes('Opera')) {
    return true;
  } return false;
};

function edge(agent) {
  if (agent.includes('Edg')) {
    return true;
  } return false;
}



function getBrowser() {
  if (chrome(userAgentString)) {
    browser.innerText = 'Browser: Chrome';
  } else if (safari(userAgentString)) {
    browser.innerText = 'Browser: Safari';
  } else if (firefox(userAgentString)) {
    browser.innerText = 'Browser: Firefox';
  } else if (internetExplorer(userAgentString)) {
    browser.innerText = 'Browser: Internet Explorer';
  } else if (opera(userAgentString)) {
    browser.innerText = 'Browser: Opera';
  } else if (edge(userAgentString)) {
    browser.innerText = 'Browser: Microsoft Edge';
  } else {
    browser.innerText = 'Unrecognized Browser'
  }
}


listen('load', window, () => {
  myOs();
  myLanguage();
  getBrowser();
});





// WINDOW HEIGHT/WIDTH
function readWindow() {
  pageWidth.innerText = `Width: ${window.innerWidth}px`;
  pageHeight.innerText = `Height: ${window.innerHeight}px`;
  
  if (window.innerWidth < window.innerHeight)
    pageOrientation.innerText = 'Orientation: Portrait';
  else
    pageOrientation.innerText = 'Orientation: Landscape';

}


listen('load', window, () => {
  readWindow();
});

listen('resize', window, () => {
  readWindow();
});

