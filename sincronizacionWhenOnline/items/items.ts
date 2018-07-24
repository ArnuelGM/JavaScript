import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../database/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ItemsProvider {

  change$: Observable<void>;

  constructor(
    private database: DatabaseProvider
  ) {

    console.log('items provides inicializado.');
    this.change$ = this.database.change$;

  }


  getAllItems(): Promise<any[]>{

    return new Promise( (resolve, reject) => {

      this.database.getAll().then((docs: any) => {

        resolve(docs.rows);

      }, (error) => {

        console.log('error al consultar los items: ', error);
        reject(error);

      });


    });

  }


  getItem(uuid: string){

    return this.database.get(uuid);

  }


  guardar(document: any){

    if( !document.type ){
      document['type'] = 'item';
    }
    return this.database.put(document);

  }

  eliminar(document: any){

    return this.database.remove(document);

  }


}
