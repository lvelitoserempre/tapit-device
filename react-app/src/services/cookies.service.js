export class CookiesService {
  static setObject(key, object) {
    this.setValue(key, encodeURIComponent(JSON.stringify(object)));
  }

  static setValue(key, value) {
    document.cookie = key + '=' + value + ';max-age=31536000;path=/;';
  }

  static getObject(key) {
    let value = this.getValue(key);
    return value ? JSON.parse(decodeURIComponent(value)) : undefined;
  }

  static getValue(key) {
    const cookieValue = document.cookie.match(key + '=[^ ;]*');

    if (cookieValue) {
      return cookieValue[0].replace(key + '=', '');
    }
  }
}
