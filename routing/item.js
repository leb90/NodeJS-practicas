




// falta editar


var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: '', 
		database: 'compu'
	}
);
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var itemModel = {};
 
//obtenemos todos los usuarios
itemModel.getUsers = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM articulos ORDER BY id', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}
 
//obtenemos un usuario por su id
itemModel.getUser = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM articulos WHERE id = ' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}
 
//añadir un nuevo usuario
itemModel.insertUser = function(itemData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO articulos SET ?', itemData, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				//devolvemos la última id insertada
				callback(null,{"insertId" : result.insertId});
			}
		});
	}
}
 
//actualizar un usuario
itemModel.updateUser = function(itemData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE articulos SET username = ' + connection.escape(itemData.username) + ',' +  
		'email = ' + connection.escape(itemData.email) +
		'WHERE id = ' + userData.id;
 
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"msg":"success"});
			}
		});
	}
}
 
//eliminar un usuario pasando la id a eliminar
itemModel.deleteUser = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM articulos WHERE id = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM articulos WHERE id = ' + connection.escape(id);
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,{"msg":"deleted"});
					}
				});
			}
			else
			{
				callback(null,{"msg":"notExist"});
			}
		});
	}
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = itemModel;