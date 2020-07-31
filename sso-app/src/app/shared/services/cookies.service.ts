export class CookiesService {
  static setObject(key: string, object) {
    this.setValue(key, (object ? encodeURIComponent(JSON.stringify(object)) : ''));
  }

  static setValue(key: string, value: string) {
    document.cookie = key + '=' + value + ';max-age=31536000;path=/;'
      + (!value ? 'max-age=0;' : '')
      + (window.location.hostname == 'localhost' ? '' : 'domain=tapit.com.co;');
  }

  static getObject(key: string) {
    let value = this.getValue(key);
    return value ? JSON.parse(decodeURIComponent(value)) : undefined;
  }

  static getValue(key: string) {
    const cookieValue = document.cookie.match(key + '=[^ ;]*');

    if (cookieValue) {
      return cookieValue[0].replace(key + '=', '');
    }
  }
}
