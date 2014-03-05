module.exports = function(app, db){

	findAllUsers = function(req, res){
		console.log("readAllRows user");
		db.all("SELECT * FROM user", function(err, rows) {
			console.log('GET All Users');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        rows.forEach(function (row) {
	            console.log(row.id + ": " + row.firstname);
	            // res.send(row.id+ ': ' + row.firstname);

	        });
	        res.send(rows);
	        //closeDb();
    	});
	};

   findUser = function(req, res){
   	db.get("SELECT * FROM user WHERE email = ?", [req.params.email], function(err, rows) {
			console.log('GET user with email: ' + req.params.email);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        res.send(rows);
	        //closeDb();
	  });
   };

   createUser = function(req, res){
   	
   }

   closeDb = function() {
      console.log("closeDb");
      db.close();
   };
	//Link routes and functions
  app.get('/api/v1/allusers', findAllUsers);
  app.get('/api/v1/user/:email', findUser);
  app.post('/api/v1/createuser', createUser);
  //app.put('/api/v1/bigpassproduct/:id', updatebigPassProduct);
  //app.delete('/api/v1/bigpassproductdelete', deletebigPassProduct);
}