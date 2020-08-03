import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() {
  }

  static parseUserData(form, origin) {
    return {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      birthDate: form.birthDate.toISOString(),
      origin,
      ...(form.referralCode && form.referralCode.trim()) && {referredBy: form.referralCode}
    };
  }
}
