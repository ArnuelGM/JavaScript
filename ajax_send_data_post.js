// REQUEST FOR CONFIRMATION
CONSENTIMIENTO.confirmarConsentimiento = function(data){

	var ajax = null;

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		ajax = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	ajax.open( 'POST', 'consentimiento.php?operacion=guardar&estudio=' + <?php echo $estudio ?> , true );
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	data.firma = encodeURI( JSON.stringify( data.firma ) );
	data.foto = encodeURIComponent(data.foto);

	// document.querySelector('#img_prueba').src = data.foto;

	var arraydata = [];
	for(name in data){
		arraydata.push( name + '=' + data[name] );
	}

	console.log(arraydata);

	var encodeddata = arraydata.join('&');

	ajax.send( encodeddata );

	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200) {
			location.reload(true);
		}
	}
}