chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='/Users/svadocz/Work/ChromePerfExt/gu-perf.js';document.body.appendChild(el);})();"
    });
});