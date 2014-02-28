$(document).on('pageinit', '#geolocation', function(event){
	var watchID = null;
	console.log('hola mundo');
	var onSuccess = function(position) {
	    $('#geolocationProperties').append('Latitude: ' + position.coords.latitude + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'latitude: '          + position.coords.latitude          + '\n');
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	}

    $('#geolocationInfo').on('click', function(){
    	var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    });
});