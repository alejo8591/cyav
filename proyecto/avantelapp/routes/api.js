module.exports = function(app, db){
	// --------------------------- API V1 for User model --------------------------------------- //

	// Find all User and return list
	findAllUsers = function(req, res){
		console.log("GET - read all users");
		db.all("SELECT * FROM user", function(err, rows) {
			console.log('GET All Users');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        rows.forEach(function (row) {
	            console.log(row.id + ": " + row.firstname);
	        });
	        res.send(rows);
	        //closeDb();
    	});
	};
	// Find User by email specific field
   findUser = function(req, res){
   		console.log("GET - read user by email= " + req.params.email);

	   	db.get("SELECT * FROM user WHERE email = ?", [req.params.email], function(err, rows) {
				console.log('GET user with email: ' + req.params.email);
		        res.set('Access-Control-Allow-Origin', '*');
		        res.set('Access-Control-Allow-Methods', 'GET');
		        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		        res.send(rows);
		        //closeDb();
		  });
   };
   // Create User with all fields
   createUser = function(req, res){
   			console.log('POST - save Product with data = \n {' + '\n email : ' + req.body.email + '\n password : ' + req.body.password + '\n firstname : ' + req.body.firstname + '\n lastname : ' + req.body.lastname + '\n phone : ' + req.body.phone + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("INSERT INTO user (email, password, firstname, lastname, phone) VALUES (?, ?, ?, ?, ?)");
    		stmt.run(req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.phone);
   			res.send('save done');
   }
   // Update User with all fields
   updateUser = function(req, res){
   			console.log('PUT - update Product with data = \n {' + '\n email : ' + req.body.email + '\n password : ' + req.body.password + '\n firstname : ' + req.body.firstname + '\n lastname : ' + req.body.lastname + '\n phone : ' + req.body.phone + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'PUT');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("UPDATE user SET password = ?, firstname = ?, lastname = ?, phone = ? WHERE email = ?");
    		stmt.run(req.body.password, req.body.firstname, req.body.lastname, req.body.phone, req.body.email);
   			res.send('update done');
   }
   // Delete User by email field
   deleteUser = function(req, res){
   			console.log('DELETE user with email : ' + req.body.email);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'DELETE');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("DELETE FROM user WHERE email = ?");
    		stmt.run(req.body.email);
   			res.send('update done');
   }
	  //Link routes and functions
	  // URI for all users
	  app.get('/api/v1/user/list', findAllUsers);
	  // URI for search email fiel 
	  app.get('/api/v1/user/:email', findUser);
	  // URI for create User
	  app.post('/api/v1/user/create', createUser);
	  // URI for update User
	  app.put('/api/v1/user/update', updateUser);
	  // URI for delete User
	  app.delete('/api/v1/user/delete', deleteUser);

  // --------------------------- API V1 for Product model --------------------------------------- //

	// Find all Products and return list
	findAllProducts = function(req, res){
		console.log("GET - read all Products");

		db.all("SELECT * FROM product", function(err, rows) {
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        rows.forEach(function (row) {
	            console.log(row.id + ": " + row.name);
	        });
	        res.send(rows);
	        //closeDb();
    	});
	};
	// Find Product by id specific field
   findProduct = function(req, res){
   	console.log("GET - read product by id : " + req.params.id);

   	db.get("SELECT * FROM product WHERE id = ?", [req.params.id], function(err, rows) {
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        res.send(rows);
	        //closeDb();
	  });
   };
   // Create Product with all fields
   createProduct = function(req, res){
   			console.log('POST - save Product with data = \n {' + '\n name : ' + req.body.name + '\n type : ' + req.body.type + '\n amount : ' + req.body.amount + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("INSERT INTO product (name, type, amount) VALUES (?, ?, ?)");
    		stmt.run(req.body.name, req.body.type, req.body.amount);
   			res.send('save done');
   }
   // Update Product with all fields
   updateProduct = function(req, res){
   			console.log('PUT - update Product with data = \n {' + '\n name : ' + req.body.name + '\n type : ' + req.body.type + '\n amount : ' + req.body.amount + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'PUT');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("UPDATE product SET name = ?, type = ?, amount = ? WHERE id = ?");
    		stmt.run(req.body.name, req.body.type, req.body.amount, req.body.id);
   			res.send('update done');
   }
   // Delete Product by id field
   deleteProduct = function(req, res){
   			console.log('DELETE product with id = ' + req.body.id);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'DELETE');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("DELETE FROM product WHERE id = ?");
    		stmt.run(req.body.id);
   			res.send('update done');
   }
	  //Link routes and functions
	  // URI for all products
	  app.get('/api/v1/product/list', findAllProducts);
	  // URI for search id fiel 
	  app.get('/api/v1/product/:id', findProduct);
	  // URI for create Product
	  app.post('/api/v1/product/create', createProduct);
	  // URI for update Product
	  app.put('/api/v1/product/update', updateProduct);
	  // URI for delete Product
	  app.delete('/api/v1/product/delete', deleteProduct);

	// Close DB
	function closeDb() {
    	console.log("closeDb");
    	db.close();
    }
}
