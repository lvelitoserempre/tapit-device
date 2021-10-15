import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/remote-config';
import remoteConfig = firebase.remoteConfig;
import initializeApp = firebase.initializeApp;
import { DataRepoService } from './data-repo.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  constructor(
    private dataRepoService: DataRepoService
  ) {
    initializeApp(environment.firebase.config);
  }

  getValues(): void {
    remoteConfig().settings = {
      minimumFetchIntervalMillis: 900000,
      fetchTimeoutMillis: 60000
    };
  
    remoteConfig().defaultConfig = {
      discover_enabled: true,
      wallet_enabled: true,
      microgifting_enabled: false
    };
  
    remoteConfig().fetchAndActivate()
    .then(() => {
      if (!environment.production) {
        console.log(remoteConfig().getAll());
      }
      this.dataRepoService.setShowDiscover(remoteConfig().getBoolean('discover_enabled'));
      this.dataRepoService.setShowWallet(remoteConfig().getBoolean('wallet_enabled'));
      this.dataRepoService.setShowMicrogifting(remoteConfig().getBoolean('microgifting_enabled'));
    }).catch(error => console.error(error));
  }

  getValue(attribute: string): Promise<boolean> {
    return remoteConfig().fetchAndActivate()
    .then(() => {
      return remoteConfig().getBoolean(attribute)
    })
  }

}
