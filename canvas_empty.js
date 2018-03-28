// VERIFICA SI UN OBJETO CANVAS ESTA VACIO
// RETURNA true SI ESTA VACIO O false SI CONTIENE ALGUN DATO
CONSENTIMIENTO.isCanvasEmpty = function(canvas){
	var blank = document.createElement('canvas');
	blank.width = canvas.width;
	blank.height = canvas.height;

	return canvas.toDataURL() == blank.toDataURL();
}