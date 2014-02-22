$(document).ready(function(){
	function checkConnection(){
		// utilizando el API de PhoneGap o Cordova
		var networkState = navigator.connection.type;
		var states = {}
		// Cargando objeto con las posibles conexiones
		states[Connection.UNKNOWN]  = 'Conexión no reconocida';
		states[Connection.WIFI] = 'Conexión por WIFI';
		states[Connection.CELL_2G] = 'Conexión por 2G';
		states[Connection.CELL_3G] = 'Conexión por 3G';
		states[Connection.CELL_4G] = 'Conexión por 4G';
		states[Connection.CELL] = 'Conexión generia a red Celular';
		states[Connection.NONE] = 'No esta conectado a ninguna Red';
		// Conociendo el tipo de conexión de mi dispositivo
		$('#refConnection').append('<p>Tipo de Conexión: ' + states[networkState] + '</p>');
	}

	// A la escucha del evento del boton para generar la información
	$('#typeConnection').bind('click', function(){
		checkConnection();
	});
});