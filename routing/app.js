var express =require ("express");
var app = express();

var indexController =require("./controller/index");

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

app.listen(8080);