(function () {
    var id = window.location.pathname.substring(1);

    function save() {
        text = $("#textarea").text();
        $.post("/api/paste/"+id, {content: text}, function (data, status) {
            if(status == "success") {
                console.log(data);
                $("#modified-time").text(data.note.modified_time);
                $('#update').addClass('green');
                    setTimeout(function() {
                        $('#update').removeClass('green');
                    }, 1000);
            } else {
                $('#update').parent().addClass('red');
                    setTimeout(function() {
                        $('#update').parent().removeClass('red');
                    }, 1000);
            }
        })
    }

    $("#update").on("click", save)
    setInterval(save, 60000);         // 自动保存

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
