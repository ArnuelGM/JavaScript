prepareFoto(event){
	this.foto = event.target.files[0];
}

save(){
	if( !this.foto ){
		alert('Debes seleccionar una foto');
		return;
	}
	this.prepareForm();
	this.send( this.formData );
}

prepareForm(){
	this.formData = new FormData();
	this.formData.append('imagen', this.foto);
}

send(formData){
	return new Promise((resolve, reject)=>{
			
		let ajax = new XMLHttpRequest();

		ajax.open('POST', this.url + '/banners/' + formData.get('tipo') , true);

		ajax.onload = ()=> {
			// resolve();
			if( ajax.status == 200 ){
				resolve();
			}else{
				reject();
			}
		};

		ajax.send(formData);

	});
}