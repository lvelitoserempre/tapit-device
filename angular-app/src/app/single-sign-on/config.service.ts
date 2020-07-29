import {Injectable} from '@angular/core';
import SSOConfig from './sso-config';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private replaySubject: ReplaySubject<SSOConfig>;
  private config: SSOConfig = {
    showFacebookButton: true,
    showOffersOption: false,
    email: '',
    origin: '',
    emailHint: '',
    passwordHint: '',
    signUpLegalHtml: '<h1 class="text-sm font-bold mb-1 text-center">Al registrarte estás aceptando:</h1><p class="text-sm text-center">Nuestros <a class="text-primary-500" href="/terms.html" target="_blank">Términos y Condiciones de Tapit,</a> las <a class="text-primary-500" href="/privacy.html" target="_blank">Políticas de Privacidad,</a> la <a class="text-primary-500" href="/data-proteccion.html" target="_blank">Política de protección de datos personales</a> y el envío de ofertas exclusivas a mi correo. <br><br> El procesamiento de mi información personal por parte de Bavaria & Cía S.C.A. con las finalidades y usos requeridos por cerveza Poker descritos en la mencionada política. <br><br> Confirmo ser mayor de 18 años.</p>',
    loginLegalHtml: '<p class="text-sm text-center">Al iniciar sesión estás aceptando nuestros <a class="text-primary-500" href="/terms.html" target="_blank">Términos y Condiciones de Tapit,</a> las <a class="text-primary-500" href="/privacy.html" target="_blank">Políticas de Privacidad,</a> la <a class="text-primary-500" href="/data-proteccion.html" target="_blank">Política de protección de datos personales</a> y el envío de ofertas exclusivas a mi correo. </p>'
  }

  constructor() {
    this.replaySubject = new ReplaySubject<SSOConfig>(1);
    this.replaySubject.next(this.config);
  }

  setConfig(config: SSOConfig) {
    Object.assign(this.config, config);
    this.replaySubject.next(this.config);
  }

  getConfig() {
    return this.replaySubject.asObservable();
  }
}
