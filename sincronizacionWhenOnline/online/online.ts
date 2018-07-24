import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OnlineProvider {

  private onlineChecker = new Subject<void>();
  private offlineChecker = new Subject<void>();

  onOnline$ = this.onlineChecker.asObservable();
  onOffline$ = this.offlineChecker.asObservable();

  isOnline = true;
  isOffline = false;

  constructor() {}

  // online checker
  initOnlineChecker(){
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.isOffline = false;
      this.onlineChecker.next();
    });
  }

  stopOnlineChecker(){
    window.removeEventListener('online', null);
  }

  // offline chekcer
  initOfflineChecker(){
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.isOffline = true;
      this.offlineChecker.next();
    });
  }

  stopOfflineChecker(){
    window.removeEventListener('offline', null);
  }

}
