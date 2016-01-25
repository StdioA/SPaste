(function () {
    // Clipboard settings
    var textClipboard = new Clipboard('#copy-text');
    textClipboard.on('success', function(e) {
        $('#copy-status').attr('data-text', '√');
        setTimeout(function() {
            $('#copy-status').attr('data-text', '-');
        }, 1000);
    });
    textClipboard.on('error', function(e) {
        $('#copy-status').attr('data-text', 'x');
        setTimeout(function() {
            $('#copy-status').attr('data-text', '-');
        }, 1000);
    });
    $('#copy-url').attr('data-clipboard-text', window.location.href);
    var urlClipboard = new Clipboard('#copy-url');
    urlClipboard.on('success', function(e) {
        $('#copy-status').attr('data-text', '√');
        setTimeout(function() {
            $('#copy-status').attr('data-text', '-');
        }, 1000);
    });
    urlClipboard.on('error', function(e) {
        $('#copy-status').attr('data-text', 'x');
        setTimeout(function() {
            $('#copy-status').attr('data-text', '-');
        }, 1000);
    });
})();
