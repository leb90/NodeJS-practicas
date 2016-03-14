var express =require ("express");
var app = express();

var indexController =require("./controller/index");

var user = require('./user');
var http = require('http');
var path = require('path');
 
var app = express();
 

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
 
require('./')(app);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*
app.set("view engine", "jade");

app.get("/",function(req,res, next){
	indexController(req, res, next)
});
app.get("/:nombre", function(req,res){
	res.send("form",{nombre: req.params.nombre});

});

app.post("/", function(req,res){
	res.send("form");
});

app.use(function(req, res, next){
	console.log("tu vieja")
});


*/