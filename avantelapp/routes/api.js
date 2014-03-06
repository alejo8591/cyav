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
   			console.log('POST save user');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("INSERT INTO user (email, password, firstname, lastname, phone) VALUES (?, ?, ?, ?, ?)");
    		stmt.run(req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.phone);
   			res.send('save done');
   }

   updateUser = function(req, res){
   			console.log('PUT update user');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'PUT');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("UPDATE user SET password = ?, firstname = ?, lastname = ?, phone = ? WHERE email = ?");
    		stmt.run(req.body.password, req.body.firstname, req.body.lastname, req.body.phone, req.body.email);
   			res.send('update done');
   }

   deleteUser = function(req, res){
   			console.log('DELETE user with email = ' + req.body.email);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'DELETE');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("DELETE FROM user WHERE email = ?");
    		stmt.run(req.body.email);
   			res.send('update done');
   }

   closeDb = function() {
      console.log("closeDb");
      db.close();
   };
	//Link routes and functions
  app.get('/api/v1/user/consult/list', findAllUsers);
  app.get('/api/v1/user/consult/specific/:email', findUser);
  app.post('/api/v1/user/create', createUser);
  app.put('/api/v1/user/update', updateUser);
  app.delete('/api/v1/user/delete', deleteUser);
}