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
var sucuModel = {};
 
//obtenemos todos los usuarios
sucuModel.getUsers = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM sucursales ORDER BY id', function(error, rows) {
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
sucuModel.getUser = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM sucursales WHERE id = ' + connection.escape(id);
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
sucuModel.insertUser = function(sucuData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO sucursales SET ?', sucuData, function(error, result) 
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
sucuModel.updateUser = function(clientsData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE sucursales SET sucursal = ' + connection.escape(sucuData.sucursal) + ',' +  
		'email = ' + connection.escape(clientsData.email) +
		'WHERE id = ' + clientsData.id;
 
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
sucuModel.deleteUser = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM sucursales WHERE id = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM sucursales WHERE id = ' + connection.escape(id);
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
module.exports = sucuModel;