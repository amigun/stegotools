const burgerIcon = document.querySelector('#burger')
const navbarMenu = document.querySelector('#nav-links')

burgerIcon.addEventListener('click', () => {
	navbarMenu.classList.toggle('is-active')
})

$('#support').click(function () {
    location.href = "https://www.patreon.com/amigun";
});

function hide_to_image() {
	var form_data = new FormData();
	form_data.append('file', $('#file_image').prop('files')[0]);
	form_data.append('text', $('#text_to_hide').val());
	form_data.append('type', 'hide');

	$.ajax({
		type: 'POST',
        	url:  '/image',
        	data: form_data,
        	cache: false,
        	processData: false,
        	contentType: false,
        	success: function(answer) {
			$('#result_image').css('display', 'block');
			$('#result_image').attr('src', answer['result']);
			$('#result_text').text('');
		},
	})
}

function show_from_image() {
	var form_data = new FormData();
	form_data.append('file', $('#file_image').prop('files')[0]);
	form_data.append('type', 'show');

	$.ajax({
		type: 'POST',
        	url:  '/image',
        	data: form_data,
        	cache: false,
        	processData: false,
        	contentType: false,
        	success: function(answer) {
			$('#result_image').css('display', 'none');
			$('#result_text').text(answer['result']);
		},
	})
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#upload').attr('src', e.target.result);
      $('#upload_cloud').css('display', 'none');
      $('#upload').css('display', 'block');
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#file_image").change(function() {
  readURL(this);
});

function switch_hide_or_show() {
	if ($("input[type='checkbox']").is(':checked')) {
		$('#text_to_hide').css('display', 'none');
		$('#hide_it').prop('href', 'javascript:show_from_image();');
	} else {
		$('#text_to_hide').css('display', 'block');
		$('#hide_it').prop('href', 'javascript:hide_to_image();');
	}
}

let shos = setInterval(switch_hide_or_show, 100);
