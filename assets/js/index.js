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
const wifi = select('#wifi');

// System Info and Browser
function myOs() {
  os.innerText = `OS: ${navigator.platform}`;
}

function myLanguage() {
  language.innerText = `Language: ${navigator.language}`;
}


//Browser validation and verification
let userAgentString = navigator.userAgent;


// functions to check if the string contains the keywords for each browser
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


// WINDOW HEIGHT/WIDTH
function readWindow() {
  pageWidth.innerText = `Width: ${window.innerWidth}px`;
  pageHeight.innerText = `Height: ${window.innerHeight}px`;
  
  if (window.innerWidth < window.innerHeight)
    pageOrientation.innerText = 'Orientation: Portrait';
  else
    pageOrientation.innerText = 'Orientation: Landscape';

}


// Battery Status
function battery() {
  
  // Verifying that the browser supports this API
  if ('getBattery' in navigator) {
    //finding the battery information. everything is required to be in this function
    navigator.getBattery().then(function(battery) {

      function updateInfo() {
        batteryLevel.innerText = `Level: ${battery.level * 100}%`;
        batteryStatus.innerText = `Status: ${battery.charging ? 'Charging' : 'Idle'}`;
      }
      
      updateInfo();

      listen('chargingchange', battery, updateInfo);

      listen('levelchange', battery, updateInfo);
    });
  }
}

// WIFI connections
function wifiOnline() {
    wifiStatus.innerText = 'Connected';
    wifi.classList.remove('offline');
    wifi.classList.add('online');
  }

function wifiOffline() {
    wifiStatus.innerText = 'Offline';
    wifi.classList.remove('online');
    wifi.classList.add('offline');
  }

function isOnline() {
  if (navigator.onLine) {
    wifiOnline();
  } else {
    wifiOffline();
  }
}


// Listeners

listen('load', window, () => {
  readWindow();
  battery();
  isOnline();
  myOs();
  myLanguage();
  getBrowser();
});

listen('resize', window, () => {
  readWindow();
});

listen('online', window, () => {
  wifiOnline();
});

listen('offline', window, () => {
  wifiOffline();
});


