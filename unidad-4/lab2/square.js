var logic = require('./logic');

exports.get = function(req, res){
	res.writeHead(200, {'Content-Type' : 'text/html'});

	res.end(
		logic.page('Raíz', logic.navbar(), 
			[
				(!isNaN(req.a) ?
					('<p> {a} raiz = {sq}</p>'
					 .replace('{a}', req.a)
					 .replace('{sq}', req.a * req.a))
					: ''),
			 	'<p> Inserte un número para calcular</p>',
			 	'<form name="square" action="/square" method="get">',
			 	'de: <input type="text" name="a" />',
			 	'</form>'
			 ].join('\n')
		)
	);
}