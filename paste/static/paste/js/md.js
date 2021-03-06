(function() {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
    var id = window.location.pathname.substring(1);
    $('#markdown-view').checkbox({
        onChecked: function() {
            $('.ui.form .segment').html(marked($('textarea').val()));
            $('.ui.form .segment').show();
            $('textarea').hide();
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
        onUnchecked: function() {
            $('.ui.form .segment').hide();
            $('textarea').show();
        }
    });
})();
