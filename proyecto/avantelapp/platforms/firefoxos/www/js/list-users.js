$(document).on('pageinit', '#listUsers', function(){
	console.log('Cosnstruyendo DOM para list-users');

	$.ajax({
			type : "GET",
			url : "http://127.0.0.1:3000/api/v1/user/list",
			dataType : "json"
		}).done(function(data){
			console.log('{ Ajax : ok, web_services: findAllUsers}');
			
			if(data.error === undefined){
				var myClasses = [];
				$.each(data, function(index, value){
					$('#listOfUsers').append(
						'<li data-role="collapsible" data-iconpos="right" data-inset="false" class="'+ value.phone +'">'+
							'<h2>' + value.firstname + ' ' + value.lastname + '</h2>' +
							'<ul data-role="listview" data-theme="b">' + 
								'<li>'+ value.email + '</li>' + 
								'<li>'+ value.phone + '</li>' +
							'</ul>' +
						'</li>'
					);
					myClasses[index] = '.'+ value.phone;
				});
				console.log(myClasses);

				$.each(myClasses, function(index, value){
					console.log(index);
					console.log(value);
					$(value).collapsible('refresh');
				});
			
			   $('#listOfUsers').listview('refresh');
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