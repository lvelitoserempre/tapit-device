import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private languages = new Set(['en', 'es', 'pt']);
  private defaultLanguage: string = 'en'
  private currentLanguage: string;

  constructor() { }

  getUserLanguage(): string {
    const userLanguage = navigator.language ? navigator.language.slice(0,2) : this.defaultLanguage;
    this.currentLanguage = this.languages.has(userLanguage) ? userLanguage : this.defaultLanguage;
    return this.currentLanguage; 
  }

  getCurrentLanguage(): string {
    return this.currentLanguage ? this.currentLanguage : this.getUserLanguage();
  }

  setCurrentLanguage(language: string) {
    if(language && this.languages.has(language)){
      this.currentLanguage = language;
    }
  }

}
