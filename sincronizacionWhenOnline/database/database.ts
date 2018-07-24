import { Injectable } from "@angular/core";
import PouchDB from "pouchdb";
import uuid from "uuid";
import { Subject } from "rxjs/Subject";

@Injectable()
export class DatabaseProvider {

  db: any;
  ready = false;
  private databaseChange: Subject<void> = new Subject<void>();
  change$ = this.databaseChange.asObservable();

  constructor() {
    this.db = new PouchDB("__my_pouchdb__");
    this.db.info().then(info => {
      this.ready = true;
      console.log('database ready: ', info);
    });

    this.db
      .changes({
        since: "now",
        live: true
      })
      .on("change", change => {
        console.log("database changes: ", change);
        this.databaseChange.next();
      })
      .on("error", err => {
        console.log("database error: ", err);
      });
  }

  get(uuid: string) {
    return this.db.get(uuid);
  }

  put(document: any) {
    if (!document._id) document._id = uuid();

    return this.db.put(document);
  }

  remove(document: any) {
    return this.db.remove(document);
  }

  getAll(): Promise<any> {
    return this.db.allDocs({ include_docs: true });
  }

  reclicateTo(url: string) {
    return this.db.replicate.to(url);
  }

  replicateFrom(url: string) {
    return this.db.replicate.from(url);
  }

  sync(database: string | any, live: boolean = false, retry: boolean = false) {
    return this.db.sync(database, { live, retry });
  }
}
