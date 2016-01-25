(function () {
	var id = window.location.pathname.substring(1);

	function save() {
		var text = $("#textarea").val();
		$('#save').addClass('loading');
		$.post("/api/paste/"+id, {content: text}, function (data, status) {
			if(status != "success" || data.error) {
				console.log(status);
				console.log(data.error);
				$('#save').addClass('red');
				$('#save').removeClass('loading');
				setTimeout(function() {
						$('#save').removeClass('red');
					}, 5000);
			} else {
				$("#modified-time").text(data.note.modified_time);
				$('#save').addClass('green');
				$('#save').removeClass('loading');
				setTimeout(function() {
					$('#save').removeClass('green');
				}, 1000);
			}
		})
	}

	function auto_save() {
		if($("#auto-save").hasClass("checked")) {
			save();
		}
	}

	$("#save").on("click", save);
	$('#auto-save').checkbox({
        onChecked: function() {
        	save();
            $('.ui.modal')
                .modal({
                    closable: false,
                    onApprove: function() {
                        $('#auto-save').addClass('disabled');
                    },
                    onDeny: function() {
                        $('#auto-save input').prop('checked', false);
                    }
                })
                .modal('show');
        }
    });
	setInterval(auto_save, 60000);         // 自动保存
	$('.list .item > div').popup();

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
