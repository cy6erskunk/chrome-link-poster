'use strict';

var url;

function sendMessageToPage(action) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: action});
  });
}

function doPost(data) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      sendMessageToPage(req.status === 200 ? 'success' : 'error');
    }
  };

  req.open('POST', url);
  req.send(data);
}

// The onClicked callback function.
function onClickHandler(info) {
  sendMessageToPage('start');
  doPost(info.linkUrl);
}

function updateUrl() {
  chrome.storage.sync.get({
    url: ''
  }, function(items) {
    url = items.url;
    console.log('Url updated');
  });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    'title': 'Post link',
    'contexts': ['link'],
    'id': 'contextLink'
  }, function() {
    if (chrome.extension.lastError) {
      console.log('Got error: ' + chrome.extension.lastError.message);
    }
  });

  updateUrl();
});

chrome.storage.onChanged.addListener(updateUrl);
