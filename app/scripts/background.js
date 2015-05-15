'use strict';

var url;

// The onClicked callback function.
function onClickHandler(info, tab) {

  console.log("item " + info.menuItemId + " was clicked");
  console.log("URL: " + info.linkUrl);
  console.log("Posting to URL:" + url);
  console.log('Done!');
};

function update_url() {
  chrome.storage.sync.get({
    url: ''
  }, function(items) {
    url = items.url;
    console.log('Url updated');
  });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

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

  update_url();
});

chrome.storage.onChanged.addListener(update_url);
