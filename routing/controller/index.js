/*module.exports = function(req, res, next){
	var err = true;
	if(err){
		res.status(500).send("madastes mal los datos gil")
		next();
		return;
	}

	res.send("estoy adentro del controller ")
	next();
}*/

//obtenemos el modelo UserModel con toda la funcionalidad
var UserModel = require('./users');
//item.js
var itemModel = require('./item');

var clientsModel = require('./clients');

var sucuModel = require('./sucu');
////////////////////////////////////////////////////////////////////////////////////////////// 
//creamos el ruteo de la aplicación
module.exports = function(app)
{
	//formulario que muestra los datos de un usuario para editar
	app.get("/user/update/:id", function(req, res){
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			UserModel.getUser(id,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si la id no es numerica mostramos un error de servidor
		else
		{
			res.json(500,{"msg":"The id must be numeric"});
		}
	});
 
	//formulario para crear un nuevo usuario
	app.get("/create", function(req, res){
		res.render("new",{ 
			title : "Formulario para crear un nuevo recurso"
		});
	});
 
	//formulario para eliminar un usuario
	app.get("/delete", function(req, res){
		res.render("delete",{ 
			title : "Formulario para eliminar un recurso"
		});
	});
 
	//mostramos todos los usuarios 
	app.get("/users", function(req,res){
		UserModel.getUsers(function(error, data)
		{
			res.json(200,data);
		});
	});
 
	//obtiene un usuario por su id
	app.get("/users/:id", function(req,res)
	{
		//id del usuario
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			UserModel.getUser(id,function(error, data)
			{
				//si el usuario existe lo mostramos en formato json
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.json(200,data);
				}
				//en otro caso mostramos una respuesta conforme no existe
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si hay algún error
		else
		{
			res.json(500,{"msg":"Error"});
		}
	});
 
	//obtiene un usuario por su id
	app.post("/users", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var userData = {
			id : null,
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
			created_at : null,
			updated_at : null
		};
		UserModel.insertUser(userData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.redirect("/users/" + data.insertId);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//función que usa el verbo http put para actualizar usuarios
	app.put("/users", function(req,res)
	{
		//almacenamos los datos del formulario en un objeto
		var userData = {id:req.param('id'),username:req.param('username'),email:req.param('email')};
		UserModel.updateUser(userData,function(error, data)
		{
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if(data && data.msg)
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//utilizamos el verbo delete para eliminar un usuario
	app.delete("/users", function(req,res)
	{
		//id del usuario a eliminar
		var id = req.param('id');
		UserModel.deleteUser(id,function(error, data)
		{
			if(data && data.msg === "deleted" || data.msg === "notExist")
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
}
////////////////////////////////////////////////////////////////////////////////////

module.exports = function(app)
{
	//formulario que muestra los datos de un usuario para editar
	app.get("/item/update/:id", function(req, res){
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			itemModel.getitem(id,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si la id no es numerica mostramos un error de servidor
		else
		{
			res.json(500,{"msg":"The id must be numeric"});
		}
	});

 	//formulario para crear un nuevo usuario
	app.get("/createitem", function(req, res){
		res.render("new",{ 
			title : "Formulario para crear un nuevo recurso"
		});
	});
 
	//formulario para eliminar un usuario
	app.get("/deleteitem", function(req, res){
		res.render("delete",{ 
			title : "Formulario para eliminar un recurso"
		});
	});
 
	//mostramos todos los usuarios 
	app.get("/item", function(req,res){
		itemModel.getitem(function(error, data)
		{
			res.json(200,data);
		});
	});

	/////
	//obtiene un usuario por su id
	app.get("/item/:id", function(req,res)
	{
		//id del usuario
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			itemModel.getUser(id,function(error, data)
			{
				//si el usuario existe lo mostramos en formato json
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.json(200,data);
				}
				//en otro caso mostramos una respuesta conforme no existe
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si hay algún error
		else
		{
			res.json(500,{"msg":"Error"});
		}
	});
 
	//obtiene un usuario por su id
	app.post("/item", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var itemData = {
			id_articulos : null,
			articulos : req.body.articulos,
			
		};
		itemModel.insertitem(itemData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.redirect("/item/" + data.insertId);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//función que usa el verbo http put para actualizar usuarios
	app.put("/item", function(req,res)
	{
		//almacenamos los datos del formulario en un objeto
		var itemData = {id_articulos:req.param('id_articulos'),articulos:req.param('articulos')};
		itemModel.updateitem(itemData,function(error, data)
		{
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if(data && data.msg)
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//utilizamos el verbo delete para eliminar un usuario
	app.delete("/item", function(req,res)
	{
		//id del usuario a eliminar
		var id = req.param('id_articulos');
		itemModel.deleteitem(id,function(error, data)
		{
			if(data && data.msg === "deleted" || data.msg === "notExist")
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = function(app)
{
	//formulario que muestra los datos de un usuario para editar
	app.get("/clients/update/:id", function(req, res){
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			clientsModel.getitem(id,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si la id no es numerica mostramos un error de servidor
		else
		{
			res.json(500,{"msg":"The id must be numeric"});
		}
	});

 	//formulario para crear un nuevo usuario
	app.get("/createclients", function(req, res){
		res.render("new",{ 
			title : "Formulario para crear un nuevo recurso"
		});
	});
 
	//formulario para eliminar un usuario
	app.get("/deleteclients", function(req, res){
		res.render("delete",{ 
			title : "Formulario para eliminar un recurso"
		});
	});
 
	//mostramos todos los usuarios 
	app.get("/clients", function(req,res){
		clientsModel.getitem(function(error, data)
		{
			res.json(200,data);
		});
	});

	/////
	//obtiene un usuario por su id
	app.get("/clients/:id", function(req,res)
	{
		//id del usuario
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			clientsModel.getUser(id,function(error, data)
			{
				//si el usuario existe lo mostramos en formato json
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.json(200,data);
				}
				//en otro caso mostramos una respuesta conforme no existe
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si hay algún error
		else
		{
			res.json(500,{"msg":"Error"});
		}
	});
 
	//obtiene un usuario por su id
	app.post("/clients", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var clientsData = {
			id_clientes : null,
			nombre : req.body.nombre,
			domicilio : req.body.domicilio
		};
		clientsModel.insertclients(clientsData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.redirect("/clients/" + data.insertId);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//función que usa el verbo http put para actualizar usuarios
	app.put("/clients", function(req,res)
	{
		//almacenamos los datos del formulario en un objeto
		var clientsData = {id_clientes:req.param('id_clientes'),nombre:req.param('nombre'),domicilio:req.param('domicilio')};
		clientsModel.updateclients(clientsData,function(error, data)
		{
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if(data && data.msg)
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//utilizamos el verbo delete para eliminar un usuario
	app.delete("/clients", function(req,res)
	{
		//id del usuario a eliminar
		var id = req.param('id_clientes');
		clientsModel.deleteclients(id,function(error, data)
		{
			if(data && data.msg === "deleted" || data.msg === "notExist")
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
}
/////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function(app)
{
	//formulario que muestra los datos de un usuario para editar
	app.get("/sucu/update/:id", function(req, res){
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			sucuModel.getitem(id,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si la id no es numerica mostramos un error de servidor
		else
		{
			res.json(500,{"msg":"The id must be numeric"});
		}
	});

 	//formulario para crear un nuevo usuario
	app.get("/createsucu", function(req, res){
		res.render("new",{ 
			title : "Formulario para crear un nuevo recurso"
		});
	});
 
	//formulario para eliminar un usuario
	app.get("/deletesucu", function(req, res){
		res.render("delete",{ 
			title : "Formulario para eliminar un recurso"
		});
	});
 
	//mostramos todos los usuarios 
	app.get("/sucu", function(req,res){
		sucuModel.getitem(function(error, data)
		{
			res.json(200,data);
		});
	});

	/////
	//obtiene un usuario por su id
	app.get("/sucu/:id", function(req,res)
	{
		//id del usuario
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			sucuModel.getUser(id,function(error, data)
			{
				//si el usuario existe lo mostramos en formato json
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.json(200,data);
				}
				//en otro caso mostramos una respuesta conforme no existe
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si hay algún error
		else
		{
			res.json(500,{"msg":"Error"});
		}
	});
 
	//obtiene un usuario por su id
	app.post("/sucu", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var clientsData = {
			id_sucursales : null,
			sucursal : req.body.sucursal
			
		};
		sucuModel.insertclients(sucuData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.redirect("/sucu/" + data.insertId);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//función que usa el verbo http put para actualizar usuarios
	app.put("/sucu", function(req,res)
	{
		//almacenamos los datos del formulario en un objeto
		var sucuData = {id_sucursales:req.param('id_sucursales'),sucursal:req.param('sucursal')};
		sucuModel.updatesucu(sucuData,function(error, data)
		{
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if(data && data.msg)
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
 
	//utilizamos el verbo delete para eliminar un usuario
	app.delete("/sucu", function(req,res)
	{
		//id del usuario a eliminar
		var id = req.param('id_sucursales');
		sucuModel.deletesucu(id,function(error, data)
		{
			if(data && data.msg === "deleted" || data.msg === "notExist")
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});
}