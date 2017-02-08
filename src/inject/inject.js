chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
});

var a =new darkenize();
a.autoColorize();
