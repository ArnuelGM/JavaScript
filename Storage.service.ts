import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	
	/**
	 * Guarda información en localStorage codificado en base64
	 * @param key Clave del dato a guardar
	 * @param data Información a gardar
	 */
	public setItem(key: string, data: any){
		data = JSON.stringify(data);
		data = this.encode(data);
		return localStorage.setItem( this.encode(key), data );
	}
	
	/**
	 * Obtiene un dato almacenado en localStorage
	 * @param key Clave del dato a obtener
	 */
	public getItem(key: string){
		let data = localStorage.getItem( this.encode(key) );
		data = JSON.parse(data);
		return data;
	}
	
	/**
	 * 
	 * @param key clave del dato al macenado
	 */
	remove(key: string){
		return localStorage.removeItem( this.encode(key) );
	}
	
	/**
	 * Elimina todos los datos de localStorage
	 */
	clear(){
		localStorage.clear();
	}

	/**
	 * Codifica una cadena en base 64
	 * @param key string a codificar
	 */
	private encode(key: string){
		return btoa(key);
	}
	
	/**
	 * Decodifica una cadena base64
	 * @param key string a decodificar
	 */
	private decode(key: string){
		return atob(key);
	}

}