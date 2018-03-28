window.URL = window.URL || window.webkitURL;
if( !!navigator.mediaDevices && navigator.mediaDevices.getUserMedia ){
	navigator.mediaDevices.getUserMedia( { video: true } )
	.then( VIDEOCAPTURE.handleSuccess )
	.catch( VIDEOCAPTURE.handleError );
}
else{
	alert('La captura de video no está soportada en este momento!!');
}

// HANDLER FOR SUCCESS VIDEO CAPTURE
VIDEOCAPTURE.handleSuccess = function(stream) {

	VIDEOCAPTURE.video_element.onloadedmetadata = function(e) {
  	VIDEOCAPTURE.video_element.play();
	};

	VIDEOCAPTURE.stream = stream;

	if( 'srcObject' in VIDEOCAPTURE.video_element ){
  	VIDEOCAPTURE.video_element.srcObject = stream;
	}
	else{
 	VIDEOCAPTURE.video_element.src = window.URL.createObjectURL(stream);
	}

}

// HANDLER FOR ERROR VIDEO CAPTURE
VIDEOCAPTURE.handleError = function(error) {
	alert( 'error: \n' + `${error.name} : ${error.message}` );
	console.log( `${error.name} : ${error.message}` );
}

VIDEOCAPTURE.take_picture = function(){

if( VIDEOCAPTURE.stream ){
	var canvasElement = document.querySelector('#photo_img');
	var ctx = canvasElement.getContext('2d');
	ctx.drawImage( VIDEOCAPTURE.video_element, 0, 0, 100, 100);

	var canvas_img = document.querySelector('#_img');
	var ctx_img = canvas_img.getContext('2d');
	ctx_img.drawImage(  VIDEOCAPTURE.video_element, 0, 0, 150, 200);
	// canvas_img.removeAttribute('hidden');

	VIDEOCAPTURE.video_element.setAttribute('hidden', "true");
	canvasElement.removeAttribute('hidden');

	document.querySelector('#btn_take').setAttribute('hidden', "true");
	document.querySelector('#btn_new').removeAttribute('hidden');

}
else{
	alert('Stream de video no encontrado!!');
}
}