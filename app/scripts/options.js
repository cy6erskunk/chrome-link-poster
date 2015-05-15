'use strict';

function saveOptions() {
  var url = document.getElementById('url-input').value;

  chrome.storage.sync.set({
    url: url
  }, function() {
    var status = document.getElementById('status');

    if (chrome.runtime.lastError) {
      status.className = 'failure';
      status.textContent = 'Oops...';
    }
    // Update status to let user know options were saved.

    status.className = 'success';
    status.textContent = 'Options saved';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    url: ''
  }, function(items) {
    document.getElementById('url-input').value = items.url;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
