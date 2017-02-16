window.addEventListener('DOMContentLoaded', function(d) {
    $(document).foundation();
    
    document.getElementById('apply_btn').addEventListener('click', function(d) {
        d.preventDefault();
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                apply: 'true'
            });
        });
    });

    document.getElementById('undo_btn').addEventListener('click', function(d) {
        d.preventDefault();
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                apply: 'false'
            });
        });
    });
});

