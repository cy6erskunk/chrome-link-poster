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

function setTitle(title) {
  if (typeof title === 'undefined') {
    title = chrome.i18n.getMessage('appName');
  }

  chrome.browserAction.setTitle({ title: title });
}

function resetBadgeAndTitle() {
  chrome.browserAction.setBadgeText({ text: ''});
  setTitle();
}

/**
 * @param {Object} data
 */
function doPost(data) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        setSuccessBadge();
      } else {
        setErrorBadge();
        setTitle(req.status +
          (req.statusText ? (' (' + req.statusText + ')') : '') +
          (req.responseText ? (': ' + req.responseText) : ''));
      }
    }
  };

  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(data));
  setTitle();
}

// The onClicked callback function.
function onClickHandler(info) {
  setLoadingBadge();
  if (!url) {
    setErrorBadge();
    setTitle(chrome.i18n.getMessage('emptyDestinationLink'));
  } else {
    setTitle();
    doPost({ url: info.linkUrl });
  }
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
  setTitle();
});

chrome.storage.onChanged.addListener(updateUrl);
chrome.browserAction.onClicked.addListener(resetBadgeAndTitle);
