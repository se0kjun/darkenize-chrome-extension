
// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if (msg.apply === 'true') {
        var a =new darkenize();
        a.autoColorize();
    }
});
