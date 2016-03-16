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
var clientsModel = {};
 
//obtenemos todos los usuarios
clientsModel.getUsers = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM clientes ORDER BY id', function(error, rows) {
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
clientsModel.getUser = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM clientes WHERE id = ' + connection.escape(id);
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
clientsModel.insertUser = function(clientsData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO clientes SET ?', clientsData, function(error, result) 
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
clientsModel.updateUser = function(clientsData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE clientes SET nombre = ' + connection.escape(clientsData.nombre) + ',' +  
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
clientsModel.deleteUser = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM clientes WHERE id = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM clientes WHERE id = ' + connection.escape(id);
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
module.exports = clientsModel;