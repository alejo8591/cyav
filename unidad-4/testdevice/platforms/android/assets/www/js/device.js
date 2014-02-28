$(document).on('pageinit', function(event){
	console.log('hola mundo');
    $('#deviceInfo').on('click', function(){
    	$('#deviceProperties').append('<p>' + device.model + '</p>' +
    		'<p>' + device.cordova + '</p>' +
    		'<p>' + device.platform + '</p>' +
    		'<p>' + device.uuid + '</p>' +
    		'<p>' + device.version + '</p>' 
    	);
    });
});