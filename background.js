chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://uplne.github.io/pageperf/core-perf.js';document.body.appendChild(el);var lodash=document.createElement('script');lodash.src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js';document.body.appendChild(lodash);var jquery=document.createElement('script');jquery.src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js';document.body.appendChild(jquery);})();"
    });
});