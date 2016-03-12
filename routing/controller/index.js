module.exports = function(req, res, next){
	var err = true;
	if(err){
		res.status(500).send("madastes mal los datos gil")
		next();
		return;
	}

	res.send("estoy adentro del controller ")
	next();
}