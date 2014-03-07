$(document).on('pageinit', '#createUser', function(event){
	console.log('cargando evento delegado para "create-user"');
	$('#saveUser').on('click', function(){
		console.log('click on save User');

		var email = $('#email').val();
		var firstname = $('#firstName').val();
		var lastname = $('#lastName').val();
		var phone = $('#phone').val();
		var password = $('#password').val();

		$.ajax({
			type : "POST",
			url : "http://127.0.0.1:3000/api/v1/user/create",
			dataType: "json",
			data: {
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
				localStorage.setItem('phone', data.phone);
 				$(document).on('pageinit', '#profile', function(event){
					console.log('Construyendo DOM para "Profile"');
					$('#dataInfo').append(
 						'<li><a>' + data.firstname + '</a></li>' +
 						'<li><a>' + data.lastname + '</a></li>' +
 						'<li><a>' + data.email + '</a></li>' +
 						'<li><a>' + data.phone + '</a></li>')
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