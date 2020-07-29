import {Injectable} from '@angular/core';
import SSOConfig from './sso-config';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: ReplaySubject<SSOConfig>;

  constructor() {
    const defaultConfig: SSOConfig = {
      showFacebookButton: true,
      showOffersOption: false,
      email: '',
      origin: '',
      emailHint: '',
      passwordHint: '',
      legalLinksToAccept: []
    }

    this.config = new ReplaySubject<SSOConfig>(1);
    this.config.pipe(config => {
      console.log('config service', config);
      return config;
    })
  }
}
