import {Injectable} from '@angular/core';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() {
  }

  static extractFacebookUserData(form, userCredential: UserCredential, project: string, interests?: string[]) {
    const profile: any = userCredential.additionalUserInfo.profile;

    if (!profile.email) {
      throw {code: 'facebook-not-authorized-email'};
    }

    return {
      firstName: profile.first_name,
      lastName: profile.last_name,
      origin: project,
      getExclusiveEmails: form.acceptOffers,
      ...(profile.gender ? {gender: profile.gender} : {}),
      ...(profile.birthday ? {birthDate: (new Date(profile.birthday)).toISOString()} : {}),
      ...((interests && interests.length) ? {interests: interests} : {}),
    };
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
