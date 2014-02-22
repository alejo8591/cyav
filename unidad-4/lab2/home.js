var logic = require('./logic');

exports.get = function(req, res){
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end(
		logic.page('Operacion Matematica', logic.nabvar(), '<p>Operación Metematica</p>')
	);
}