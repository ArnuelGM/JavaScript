import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OnlineProvider } from '../providers/online/online';
import { Subscription } from 'rxjs/Subscription';
import { SincronizadorProvider } from '../providers/sincronizador/sincronizador';
import { DatabaseProvider } from '../providers/database/database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy{

  rootPage:any = HomePage;

  onlineSubcription: Subscription;
  offlineSubcription: Subscription;
  databaseSubscription: Subscription;

  hayPendientes = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _online: OnlineProvider,
    private _sync: SincronizadorProvider,
    private _db: DatabaseProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  ngOnInit(){

    this._online.initOnlineChecker();
    this._online.initOfflineChecker();

    // SE ENVIAN LOS DATOS CUANDO SE HAGA MODIFICACIONES AL DB LOCAL
    this.databaseSubscription = this._db.change$.subscribe( () => {

      let estaOnline = this._online.isOnline;
      if( estaOnline ){
        this.enviarDatos();
      }else{
        this.hayPendientes = true;
      }

    });


    // SI VUELVE A ESTAR ONLINE SE ENVIAN LOS DATOS DE LA DB
    this.onlineSubcription = this._online.onOnline$.subscribe( () => {

      if( this.hayPendientes ){

        this.enviarDatos();

      }

    });

    this.offlineSubcription = this._online.onOffline$.subscribe( () => {
      console.log('app is offline now!!');
    });

    this.obtenerDatos();
  }

  ngOnDestroy(): void {
    this.onlineSubcription.unsubscribe();
    this.offlineSubcription.unsubscribe();
    this.databaseSubscription.unsubscribe();
    this._online.stopOnlineChecker();
    this._online.stopOfflineChecker();
  }

  enviarDatos(){
    this._sync.enviarDatos().then(() => {
      this.hayPendientes = false;
    });
  }

  obtenerDatos(){
    this._sync.obtenerDatos();
  }

}

