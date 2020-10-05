import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() {
  }

  static extractFormUserData(form, origin: string, interests: string[]) {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate.toISOString(),
      // identity: form.cpf,
      getExclusiveEmails: form.acceptOffers,
      origin,
      ...((interests && interests.length) ? {interests: interests} : {}),
      ...(form.referralCode && form.referralCode.trim()) && {referredBy: form.referralCode},
    };
  }
}
