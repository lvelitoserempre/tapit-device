function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

var SsoClient = /*#__PURE__*/function () {
  function SsoClient(clientConfig, ssoConfig) {
    this.clientConfig = {
      ssoOrigin: 'http://localhost:4200',
      ssoPath: '/',
      ssoIframeId: 'sso-iframe',
      channel: 'TAPIT',
      ssoActionListener: null,
      getUrl: function getUrl() {
        return this.ssoOrigin + this.ssoPath;
      }
    };
    this.setClientConfig(clientConfig);
    this.ssoConfig = ssoConfig;
  }

  var _proto = SsoClient.prototype;

  _proto.setClientConfig = function setClientConfig(clientConfig) {
    Object.assign(this.clientConfig, clientConfig);
  };

  _proto.init = function init() {
    var _this = this;

    SsoClient.validateConfig(this.clientConfig, this.ssoConfig);
    window.addEventListener("message", function (event) {
      if (event.data && event.origin === _this.clientConfig.ssoOrigin) {
        _this.clientConfig.ssoActionListener(event.data.action, event.data.data);
      }
    }, false);
    SsoClient.configSsoOnLoad(this.clientConfig, this.ssoConfig);
  };

  SsoClient.validateConfig = function validateConfig(clientConfig, ssoConfig) {
    if (!clientConfig.ssoOrigin) {
      console.warn('The ssoOrigin is empty. Make sure you are setting the clientConfig correctly');
    }

    if (clientConfig.ssoOrigin.startsWith('http://localhost')) {
      console.warn('You have not changed the ssoOrigin. Make sure you are setting the clientConfig correctly');
    }

    if (clientConfig.channel !== 'TAPIT') {
      console.warn('You changing the channel name. Make sure you are setting the clientConfig correctly');
    }

    if (typeof clientConfig.ssoActionListener !== 'function') {
      console.warn('You are not setting the ssoActionListener. Make sure you are setting the clientConfig correctly');
    }

    if (!ssoConfig) {
      throw new Error('The ssoConfig property has not been defined. Make sure you are setting the config correctly');
    }
  };

  SsoClient.configSsoOnLoad = function configSsoOnLoad(clientConfig, ssoConfig) {
    var ssoIframe = document.getElementById(clientConfig.ssoIframeId);

    if (!ssoIframe) {
      throw new Error('Do not exists any element with id=' + clientConfig.ssoIframeId + 'in the page');
    }

    ssoIframe.addEventListener("load", function () {
      SsoClient.configSso(ssoIframe, clientConfig, ssoConfig);
    }, {
      once: true
    });
    ssoIframe.setAttribute('src', clientConfig.getUrl());
  };

  SsoClient.configSso = function configSso(ssoIframeElement, clientConfig, ssoConfig) {
    if (!_instanceof(ssoIframeElement, Element)) {
      throw new Error('ssoIframeElement is not a DOM element');
    }

    ssoIframeElement.contentWindow.postMessage({
      channel: clientConfig.channel,
      action: 'config',
      config: ssoConfig
    }, clientConfig.ssoOrigin);
  };

  _proto.ssoExecuteAction = function ssoExecuteAction(action, data) {
    var ssoIframeElement = document.getElementById(this.clientConfig.ssoIframeId);

    if (!_instanceof(ssoIframeElement, Element)) {
      throw new Error('ssoIframeElement is not a DOM element');
    }

    ssoIframeElement.contentWindow.postMessage({
      channel: this.clientConfig.channel,
      action: action,
      data: data
    }, this.clientConfig.ssoOrigin);
  };

  return SsoClient;
}();
