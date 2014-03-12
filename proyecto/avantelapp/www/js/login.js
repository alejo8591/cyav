jQuery.fn.reset = function(){
	$(this).each(function(){this.reset();});
}

$(document).on('pageinit', '#home', function(){
	console.log('cargando evento delegado para home y login');
	if(sessionStorage.length === 0){
		// cargando login por no estar logeado
		console.log('sessionStorage vacio');
		$.mobile.changePage('login.html');
	} else {
		$.mobile.changePage('index.html');
	}

	$('#lookCookie').on('click', function(){
		$('#setCookie').append('<p>' + sessionStorage.getItem('cookie') + '</p>');
	});
});