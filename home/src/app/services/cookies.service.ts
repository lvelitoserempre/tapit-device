export class CookiesService {
  static setObject(key: string, object: any) {
    this.setValue(key, (object ? encodeURIComponent(JSON.stringify(object)) : ''));
  }

  static setValue(key: string, value: string) {
    document.cookie = key + '=' + value + ';path=/;SameSite=Strict;'
      + (!value ? 'max-age=0;' : 'max-age=31536000;')
      + (window.location.hostname == 'localhost' ? '' : 'domain=tapit.com.co;');
  }

  static getObject(key: string) {
    let value = this.getValue(key);
    return value ? JSON.parse(decodeURIComponent(value)) : undefined;
  }

  static getValue(key: string) {
    let returnedCookieValue = '';
    const cookieValue = document.cookie.match(key + '=[^ ;]*');

    if (cookieValue) {
      returnedCookieValue = cookieValue[0].replace(key + '=', '');
    }
    return returnedCookieValue;
  }
}
