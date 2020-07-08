import UrlService from "./url.service";

export default class ConfigService {
  environment = {
    develop: {
      marketUrl: 'market-dev.tapit.com.co',
      angularUrl: 'dev.tapit.com.co/app',
      reactUrl: 'dev.tapit.com.co',
      apiUrl: 'api-dev.tapit.com.co',
    },
    testing: {
      marketUrl: 'market-dev.tapit.com.co',
      angularUrl: 'testing.tapit.com.co/app',
      reactUrl: 'testing.tapit.com.co',
      apiUrl: 'api-dev.tapit.com.co',
    },
    preview: {
      marketUrl: 'market-dev.tapit.com.co',
      angularUrl: 'preview.tapit.com.co/app',
      reactUrl: 'preview.tapit.com.co',
      apiUrl: 'api.tapit.com.co',
    },
    production: {
      marketUrl: 'market.tapit.com.co',
      angularUrl: 'dev.tapit.com.co/app',
      reactUrl: 'dev.tapit.com.co',
      apiUrl: 'api.tapit.com.co',
    }
  }

  static getUrl(path) {
    const environment = UrlService.getSearchMap().env || this.getEnvironment();

  }

  static getEnvironment() {
    switch (window.location.origin) {
      case 'tapit.com.co':
      case 'preview.tapit.com.co':
      case 'testing.tapit.com.co':
      case 'dev.tapit.com.co':
      case 'market-dev.tapit.com.co':

    }
  }
}
