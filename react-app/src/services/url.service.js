export default class UrlService {
  static getSearchMap() {
    let searchMap = {};
    const params = window.location.search.substring(1).split('&');

    params.forEach(param => {
      if (param.includes('=')) {
        searchMap = searchMap || {};
        const keyValue = param.split('=');

        searchMap[keyValue[0]] = keyValue[1];
      }
    })

    return searchMap;
  }
}
