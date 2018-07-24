import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class SincronizadorProvider {

  dataFromServer: any;

  constructor(
    public http: HttpClient,
    private db: DatabaseProvider
  ) {}


  enviarDatos(){

    return new Promise( (resolve, reject) => {

      this.db.getAll().then((documents) => {

        let rows = documents.rows;
        let documentos = [];
        rows.forEach(row => {
          documentos.push(row.doc);
        });

        let data = { items: documentos };

        this.http.post( 'http://192.168.1.20:7010/sincronizar', data ).subscribe((res)=>{

          console.log('sinconizar: ', res);
          resolve();

        }, (error) => { reject(); console.log('error al enviar datos: ', error);} );

      }, (error) => { reject(); console.log('error al obtener los documentos.');} );

    });

  }

  obtenerDatos(){

    console.log('obteniendo datos...');

    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        this.http.get( 'http://192.168.1.20:7010/sincronizar' ).subscribe((res: any)=>{

          console.log(res);
          this.dataFromServer = res;

          this.putDataFromServer().then( ()=> resolve() );

        }, (error) => { reject(); console.log('error al enviar datos: ', error); });

      }, 1000);

    });

  }

  putDataFromServer(){

    console.log('put data from server');

    return new Promise( (resolve, reject) => {

      if( this.db.ready ){
        this.db.db.bulkDocs(this.dataFromServer).then( (bulk) =>{
          console.log('bulk docs: ', bulk);
          resolve();
        }, (error) => {
          console.log('error bulk: ', error);
          reject()
        });
      }else{

        setTimeout(() => {
          this.putDataFromServer().then( () => resolve(), () => reject() );
        }, 100);

      }


    });

  }


}
