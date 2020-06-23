export class CookiesService {
  static setObject(key: string, object) {
    this.setValue(key, encodeURIComponent(JSON.stringify(object)));
  }

  static setValue(key: string, value: string) {
    document.cookie = key + "=" + value + ";max-age=31536000;path=/;";
  }

  static getObject(key: string) {
    return JSON.parse(decodeURIComponent(this.getValue(key)));
  }

  static getValue(key: string) {
    return document.cookie.match(key + "=[^ ;]*")[0].replace(key + "=", "");
  }
}
