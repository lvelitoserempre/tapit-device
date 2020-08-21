var CookiesService = /*#__PURE__*/function () {
  function CookiesService() {
  }

  CookiesService.setObject = function setObject(key, object) {
    this.setValue(key, object ? encodeURIComponent(JSON.stringify(object)) : '');
  };

  CookiesService.setValue = function setValue(key, value, domain) {
    document.cookie = key + '=' + value + ';path=/;SameSite=Strict;'
      + (!value ? 'max-age=0;' : 'max-age=31536000;')
      + (window.location.hostname == 'localhost' ? '' : 'domain=' + (domain || 'tapit.com.co') + ';');
  };

  CookiesService.getObject = function getObject(key) {
    var value = this.getValue(key);
    return value ? JSON.parse(decodeURIComponent(value)) : undefined;
  };

  CookiesService.getValue = function getValue(key) {
    var cookieValue = document.cookie.match(key + '=[^ ;]*');

    if (cookieValue) {
      return cookieValue[0].replace(key + '=', '');
    }
  };

  return CookiesService;
}();
