$(document).on('pageinit', '#login', function(event){
	console.log('cargando evento delegado para login');

	$('#loginUser').on('click', function(){
		console.log('click on login');
		var email = $('#email').val();
		var password = $('#password').val();

		$.ajax({
			type : "POST",
			url : "http://127.0.0.1:3000/api/v1/user/login",
			dataType: "json",
			data: {
					"email" : email,
					"password" : password
				  }
 		}).done(function(data){
 			if(data.error === undefined){
 				sessionStorage.setItem('cookie', data.cookie);
 				$.mobile.changePage('index.html');
 			} else {
 				$('#loginForm').reset();
 				$.mobile.changePage('login.html');
 			}
 		}).fail(function(data){
 			$.mobile.changePage('login.html');
 		});
	});
});