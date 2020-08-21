export class UserAgentService {
  static isFacebook() {
    const userAgent: string = navigator.userAgent || navigator.vendor || window['opera'];
    return userAgent.includes('FBAN') || userAgent.includes('FBAV');
  }

  static isInstagram() {
    const userAgent: string = navigator.userAgent || navigator.vendor || window['opera'];
    return userAgent.includes('Instagram');
  }

  static isNotSupported() {
    return UserAgentService.isFacebook() || UserAgentService.isInstagram();
  }
}
