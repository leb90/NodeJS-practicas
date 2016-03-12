function render(html,variables) {
	for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
				var parametro = arreglo_parametros[i];
				var param_data = parametro.split("=");
				parametros[param_data[0]] = param_data[1];
			};
}
module.exports.render = render;