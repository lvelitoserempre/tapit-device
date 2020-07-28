var CookiesService = /*#__PURE__*/function () {
  function CookiesService() {
  }

  CookiesService.setObject = function setObject(key, object) {
    this.setValue(key, object ? encodeURIComponent(JSON.stringify(object)) : '');
  };

  CookiesService.setValue = function setValue(key, value) {
    document.cookie = key + '=' + value + ';max-age=31536000;path=/;' + (!value ? 'max-age=0;' : '') + (window.location.hostname == 'localhost' ? '' : 'domain=tapit.com.co;');
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

window.zESettings = {
  webWidget: {
    contactForm: {
      attachments: true
    },
    color: {
      theme: '#191419',
      launcher: '#191419',
      launcherText: '#FFFFFF'
    }
  }
};

zE('webWidget:on', 'open', function () {
  var loggedUser = CookiesService.getObject('loggedUser');
  setZeUserData(loggedUser);
});

zE('webWidget:on', 'close', function () {
  zE('webWidget', 'prefill', {
    name: {
      readOnly: false
    },
    email: {
      readOnly: false
    }
  });
});

function setZeUserData(user) {
  if (user) {
    zE('webWidget', 'prefill', {
      name: {
        value: user.firstName + ' ' + user.lastName,
        readOnly: true
      },
      email: {
        value: user.email,
        readOnly: true
      }
    });
  }
}
