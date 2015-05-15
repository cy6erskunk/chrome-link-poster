'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("URL: " + info.linkUrl);
    // console.log("tab: " + JSON.stringify(tab));
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Test 'link' menu item",
    "contexts": ["link"],
    "id": "contextLink"
  }, function() {
    if (chrome.extension.lastError) {
      console.log("Got error: " + chrome.extension.lastError.message);
    }
  });
});
