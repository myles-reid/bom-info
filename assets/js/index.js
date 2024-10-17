'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

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
const userAgentString = navigator.userAgent;

// OS verification
function windows(agent) {
  return agent.includes('Win');
}

function mac(agent) {
  return agent.includes('Mac');
}

function linux(agent) {
  return agent.includes('Linux');
}

function android(agent) {
  return /Android/.test(agent);
}

function ios(agent) {
  return /iPhone|iPad|iPod/.test(agent)
}

function myOs() {
  let myOs = 'Unknown OS';

  switch(true) {
    case windows(userAgentString):
      myOs = 'Windows';
      break;
    
    case mac(userAgentString):
      myOs = 'MacOs';
      break;
    
    case linux(userAgentString):
      myOs = 'Linux';
      break;

    case android(userAgentString):
      myOs = 'Android';
      break;
    
    case ios(userAgentString):
      myOs = 'iOS';
      break;
  }

  os.innerText = `OS: ${myOs}`;
}

// function myOs() {
//   os.innerText = `OS: ${navigator.platform}`;
// }

function myLanguage() {
  language.innerText = `Language: ${navigator.language}`;
}


//Browser validation and verification

//storing userAgent in a string - easier access



// functions to check if the string contains the keywords for each browser
function chrome(agent) {
  return (agent.includes('Chrome') && !agent.includes('Chromium') && 
  !agent.includes('OPR') && !agent.includes('Edg'))
};

function safari(agent) {
return (agent.includes('Safari') && !agent.includes('Chrome'))
};

function firefox(agent) {
  return (agent.includes('Firefox'))
};

function internetExplorer(agent) {
  return (agent.includes('MSIE') || agent.includes('Trident'))
};

function opera(agent) {
  return (agent.includes('OPR') || agent.includes('Opera'))
};

function edge(agent) {
  return (agent.includes('Edg'))
}

// Displaying the correct browser
function getBrowser() {

  let browserType = 'Unrecognized Browser';

  switch(true) {
    case chrome(userAgentString):
      browserType = 'Chrome';
      break;

    case safari(userAgentString):
      browserType = 'Safari';
      break;

    case firefox(userAgentString):
      browserType = 'Firefox';
      break;

    case internetExplorer(userAgentString):
      browserType = 'Internet Explorer';
      break;
    
    case opera(userAgentString):
      browserType = 'Opera';
      break;

    case edge(userAgentString):
      browserType = 'Edge';
      break;
  }

  browser.innerText = `Browser: ${browserType}`;

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


