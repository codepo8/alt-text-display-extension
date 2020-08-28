chrome.browserAction.onClicked.addListener(function(tab) {

});

function showAlt(info, tab) {  
  chrome.tabs.executeScript({code:"altrollover.f()"});
};

chrome.contextMenus.onClicked.addListener(showAlt);

chrome.runtime.onInstalled.addListener(function() {
  var title = "Show Alt Text";
  var id = chrome.contextMenus.create({
    "title": title, 
    "contexts":["image"],
    "id": "showalt"
  });
});
