'use strict';

var url;

function setSuccessBadge() {
  chrome.browserAction.setBadgeText({ text: 'OK'});
  chrome.browserAction.setBadgeBackgroundColor({ color: '#3f3'});
}

function setErrorBadge() {
  chrome.browserAction.setBadgeText({ text: 'ERR'});
  chrome.browserAction.setBadgeBackgroundColor({ color: '#f33'});
}

function setLoadingBadge() {
  chrome.browserAction.setBadgeText({ text: '...'});
  chrome.browserAction.setBadgeBackgroundColor({ color: '#f80'});
}

function resetBadge() {
  chrome.browserAction.setBadgeText({ text: ''});
}

function doPost(data) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        setSuccessBadge();
      } else {
        setErrorBadge();
      }
    }
  };

  req.open('POST', url);
  req.send(data);
}

// The onClicked callback function.
function onClickHandler(info) {
  setLoadingBadge();
  doPost(info.linkUrl);
}

function updateUrl() {
  chrome.storage.sync.get({
    url: ''
  }, function(items) {
    url = items.url;
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
chrome.browserAction.onClicked.addListener(resetBadge);
