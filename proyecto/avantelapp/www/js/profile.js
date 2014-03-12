$(document).on('pageinit', '#profile', function(event){
	console.log('Cosnstruyendo DOM para Profile');
	$('#dataInfo').remove('li');
	$('#dataInfo').append(
		'<li><a href="#">' + localStorage.getItem('firstname') + '</a></li>' +
		'<li><a href="#">' + localStorage.getItem('lastname') + '</a></li>' +
		'<li><a href="#">' + localStorage.getItem('email') + '</a></li>' +
		'<li><a href="#">' + localStorage.getItem('phone') + '</a></li>' 
	);
		$('#dataInfo').listview('refresh');	
});