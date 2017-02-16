window.addEventListener('DOMContentLoaded', function(d) {
    var config = {
        background: {},
        text: {},
        border: {}
    };
    
    chrome.tabs.query({ active:true, currentWindow:true},function(tabs){
        var matches = tabs[0].url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
        var domain = (matches && matches[1]);
        chrome.storage.sync.get(domain, function(items){
            config = items[domain].value;
            Object.keys(items[domain].value).forEach(function(elem) {
                var slider1 = new Foundation.Slider( $("#" + elem + "-" + "threshold"), {initialStart: items[domain].value[elem].threshold});
                var slider2 = new Foundation.Slider( $("#" + elem + "-" + "weight"), {initialStart: items[domain].value[elem].weight});
            });
        });
    });

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
        console.dir(config);
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                apply: 'false'
            });
        });
    });
    
    document.getElementById('save_btn').addEventListener('click', function(d) {
        d.preventDefault();
        chrome.tabs.query({ active:true, currentWindow:true},function(tabs){
            var domain = tabs[0].url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1];
            var insert_data = {};
            insert_data[domain] = {
                'domain': domain,
                'url': tabs[0].url,
                'value': config
            };
            
            chrome.storage.sync.set(
                insert_data,
                function() {
                    console.log('success');
                }
            );
        });
    });
    
    $('.slider').on('moved.zf.slider', function(){
        var data_identifier = $(this).attr('id');
        var slider_data = data_identifier.split('-');
        
        config[slider_data[0]][slider_data[1]] = $(this).children('.slider-handle').attr('aria-valuenow');
    });
});
