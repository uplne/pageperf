chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://uplne.github.io/pageperf/core-perf.js';document.body.appendChild(el);})();"
    });
});