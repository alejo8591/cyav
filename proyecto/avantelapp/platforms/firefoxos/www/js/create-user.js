$(document).on('pageinit', '#createUser', function(events){
	console.log('Cargando evento delegado para create-user');

	$('#saveUser').on('click', function(){
		console.log('Click en SaveUser');

		var email = $('#email').val();
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var phone = $('#phone').val();
		var password = $('#password').val();

		$.ajax({
			type : "POST",
			url : "http://127.0.0.1:3000/api/v1/user/create",
			dataType : "json",
			data : {
				"email" : email,
				"firstname" : firstname,
				"lastname" : lastname,
				"phone" : phone,
				"password" : password
			}
		}).done(function(data){
			if(data.error === undefined){
				sessionStorage.setItem('cookie', data.cookie);
				localStorage.setItem('email', data.email);
				localStorage.setItem('firstname', data.firstname);
				localStorage.setItem('lastname', data.lastname);
				localStorage.setItem('password', data.password);
				localStorage.setItem('phone', data.phone);

				$(document).on('pageinit', '#profile', function(event){
					console.log('Cosnstruyendo DOM para Profile');
					$('#dataInfo').remove('li');
					$('#dataInfo').append(
						'<li><a href="#">' + data.firstname + '</a></li>' +
						'<li><a href="#">' + data.lastname + '</a></li>' +
						'<li><a href="#">' + data.email + '</a></li>' +
						'<li><a href="#">' + data.phone + '</a></li>' 
					);
					$('#dataInfo').listview('refresh');
				});
				$.mobile.changePage('profile.html');
			} else {
				$('#createUserForm').reset();
				$.mobile.changePage('login.html');
			}
		}).fail(function(data){
			$.mobile.changePage('login.html');
		});
	});
});