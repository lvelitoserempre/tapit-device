export class SsoClient {
  constructor(clientConfig, ssoConfig) {
    this.clientConfig = {
      ssoOrigin: 'http://localhost:4200',
      ssoPath: '/',
      ssoIframeId: 'sso-iframe',
      channel: 'TAPIT',
      ssoActionListener: null,
      getUrl: function () {
        return this.ssoOrigin + this.ssoPath
      }
    };

    this.setClientConfig(clientConfig);
    this.ssoConfig = ssoConfig;
  }

  setClientConfig(clientConfig) {
    Object.assign(this.clientConfig, clientConfig);
  }

  init() {
    SsoClient.validateConfig(this.clientConfig, this.ssoConfig);

    window.addEventListener("message", (event) => {
      if (event.data && event.origin === this.clientConfig.ssoOrigin) {
        this.clientConfig.ssoActionListener(event.data.action, event.data.data)
      }
    }, false);

    SsoClient.configSsoOnLoad(this.clientConfig, this.ssoConfig);
  }

  static validateConfig(clientConfig, ssoConfig) {
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
  }

  static configSsoOnLoad(clientConfig, ssoConfig) {
    const ssoIframe = document.getElementById(clientConfig.ssoIframeId);

    if (!ssoIframe) {
      throw new Error('Do not exists any element with id=' + clientConfig.ssoIframeId + 'in the page');
    }

    ssoIframe.addEventListener("load", function () {
      SsoClient.configSso(ssoIframe, clientConfig, ssoConfig);
    }, {once: true});

    ssoIframe.setAttribute('src', clientConfig.getUrl());
  }

  static configSso(ssoIframeElement, clientConfig, ssoConfig) {
    if (!(ssoIframeElement instanceof Element)) {
      throw new Error('ssoIframeElement is not a DOM element');
    }

    ssoIframeElement.contentWindow.postMessage({
        channel: clientConfig.channel,
        action: 'config',
        config: ssoConfig
      },
      clientConfig.ssoOrigin);
  }

  ssoExecuteAction(action, data) {
    const ssoIframeElement = document.getElementById(this.clientConfig.ssoIframeId);

    if (!(ssoIframeElement instanceof Element)) {
      throw new Error('ssoIframeElement is not a DOM element');
    }

    ssoIframeElement.contentWindow.postMessage({
        channel: this.clientConfig.channel,
        action: action,
        data: data
      },
      this.clientConfig.ssoOrigin);
  }
}
