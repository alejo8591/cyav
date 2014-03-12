$(document).on('pageinit', '#editProfile', function(event){
	console.log('Cosnstruyendo DOM para editar Profile');
	
	$('input#email').val(localStorage.getItem('email')).attr('disabled','disabled');
	$('input#firstname').val(localStorage.getItem('firstname'));
	$('input#lastname').val(localStorage.getItem('lastname'));
	$('input#phone').val(localStorage.getItem('phone'));

	$('#updateProfile').on('click', function(){
		var update_data = {};

		update_data.email = localStorage.getItem('email');

		if(localStorage.getItem('firstname') !== $('input#firstname').val()){
			update_data.firstname = $('input#firstname').val();
		} else {
			update_data.firstname = localStorage.getItem('firstname');
		}

		if (localStorage.getItem('lastname') !== $('input#lastname').val()){
			update_data.lastname = $('input#lastname').val();
		} else {
			update_data.lastname = localStorage.getItem('lastname');
		}

		if (localStorage.getItem('phone') !== $('input#phone').val()){
			update_data.phone = $('input#phone').val();
		} else {
			update_data.phone = localStorage.getItem('phone');
		}
		console.log(update_data);
		/*
			type (default: 'GET')
			Type: String
			The type of request to make ("POST" or "GET"), default is "GET". Note: Other HTTP request methods, 
			such as PUT and DELETE, can also be used here, but they are not supported by all browsers.
		*/
		$.ajax({
			type : "POST",
			url : "http://127.0.0.1:3000/api/v1/user/update",
			dataType : "json",
			data : update_data
		}).done(function(data){
			console.log('Ajax correcto');

			if(data.error === undefined){
				sessionStorage.setItem('cookie', data.cookie);
				localStorage.setItem('email', data.email);
				localStorage.setItem('firstname', data.firstname);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('phone', data.phone);
				$.mobile.changePage('profile.html');
			} else {
				$('#loginForm').reset();
				console.log('hay error en el Ajax');
				$.mobile.changePage('login.html');
			}
		}).fail(function(data){
			console.log('Fallo el Ajax');
			$.mobile.changePage('login.html');
		});
	});
});