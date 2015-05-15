'use strict';
var messageElem = null;
var messageElemText = null;
var displayMessage = function (message) {
  if (!messageElem) {
    messageElem = document.createElement('div');
    messageElem.id = 'link-poster-message-elem';
    messageElem.title = 'Click to hide the message';

    var innerWrapper = document.createElement('div');
    innerWrapper.id = 'link-poster-message-elem-inner-wrapper';
    messageElem.appendChild(innerWrapper);

    var imgURL = chrome.extension.getURL('images/icon-16.png');
    var img = document.createElement('img');
    img.src = imgURL;
    innerWrapper.appendChild(img);

    messageElemText = document.createElement('span');
    innerWrapper.appendChild(messageElemText);

    innerWrapper.addEventListener('click', function () {
      document.body.removeChild(messageElem);
      messageElem = null;
      messageElemText = null;
    });
    document.body.appendChild(messageElem);
  }

  messageElemText.textContent = message;
};

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'start') {
    displayMessage('Posting...');
  } else if (request.action === 'success') {
    displayMessage('Success');
  } else if (request.action === 'error') {
    displayMessage('Error!');
  }
});
