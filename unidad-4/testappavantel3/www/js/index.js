var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var states = {}
        // Cargando objeto con las posibles conexiones
        states[Connection.UNKNOWN]  = 'Conexión no reconocida';
        states[Connection.WIFI] = 'Conexión por WIFI';
        states[Connection.CELL_2G] = 'Conexión por 2G';
        states[Connection.CELL_3G] = 'Conexión por 3G';
        states[Connection.CELL_4G] = 'Conexión por 4G';
        states[Connection.CELL] = 'Conexión generia a red Celular';
        states[Connection.NONE] = 'No esta conectado a ninguna Red';
        app.checkConnection(states);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    checkConnection: function(states){
        // utilizando el API de PhoneGap o Cordova
        var networkState = navigator.connection.type;

        if (networkState === Connection.NONE) {
            app.errorConnection();
        } else {
            app.errorConnection();
            alert('Conexión correcta por: ' + states[networkState]);
        }
    },
    errorConnection: function(){
        navigator.notification.confirm(
        'You are the winner!', // message
        app.vibration(2000),   // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']         // buttonLabels
        );
    },
    vibration: function(time){
        navigator.notification.vibrate(time);
        navigator.notification.beep(3);
    }
};