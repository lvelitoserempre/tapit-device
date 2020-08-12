var UrlBuilderService = /*#__PURE__*/function () {
  function UrlBuilderService() {}
  UrlBuilderService.buildUrl = function buildUrl(app, path) {
    if (UrlService.getSearchMap().env) {
        return this.buildUrlByEnvironmentParam(app, path);
    } else {
        return this.buildUrlByHostName(app, path);
    }
  };
  UrlBuilderService.buildUrlByEnvironmentParam = function buildUrlByEnvironmentParam(app, path) {
    var env = UrlService.getSearchMap().env;
    if (!ConfigService.getEnvConfig()[env]) {
        throw Error('Env ' + env + ' does not exist');
    }
    if (!ConfigService.getEnvConfig()[env][app]) {
        throw Error('App ' + app + ' does not exist in the config for the env: ' + env);
    }
    return ConfigService.getEnvConfig()[env][app] + this.normalizePath(path);
  };
  UrlBuilderService.buildUrlByHostName = function buildUrlByHostName(app, path) {
    if (!ConfigService.getHostNameMap()[window.location.hostname]) {
      throw Error('There is not config for this hostname: ' + window.location.hostname);
    }
    if (!ConfigService.getHostNameMap()[window.location.hostname][app]) {
      throw Error('App ' + app + ' does not exist in the config for the host name: ' + window.location.hostname);
    }
    return ConfigService.getHostNameMap()[window.location.hostname][app] + this.normalizePath(path);
  };
  UrlBuilderService.normalizePath = function normalizePath(path) {
    return path ? path.startsWith('/') ? path : '/' + path : '';
  };
  return UrlBuilderService;
}();

var UrlService = /*#__PURE__*/function () {
  function UrlService() {}
  UrlService.getSearchMap = function getSearchMap() {
    var searchMap = {};
    var params = window.location.search.substring(1).split('&');
    params.forEach(function (param) {
      if (param.includes('=')) {
        searchMap = searchMap || {};
        var keyValue = param.split('=');
        searchMap[keyValue[0]] = keyValue[1];
      }
    });
    return searchMap;
  };
  return UrlService;
}();

var ConfigService = /*#__PURE__*/function () {
  function ConfigService() {}
  ConfigService.getEnvConfig = function getEnvConfig() {
    return {
      localhost: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'http://localhost:4200',
        react: 'http://localhost:9000',
        api: 'https://api-dev.tapit.com.co'
      },
      develop: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'https://dev.tapit.com.co/app',
        react: 'https://dev.tapit.com.co',
        api: 'https://api-dev.tapit.com.co'
      },
      testing: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'https://testing.tapit.com.co/app',
        react: 'https://testing.tapit.com.co',
        api: 'https://api-dev.tapit.com.co'
      },
      preview: {
        market: 'https://market.tapit.com.co',
        angular: 'https://preview.tapit.com.co/app',
        react: 'https://preview.tapit.com.co',
        api: 'https://api.tapit.com.co'
      },
      production: {
        market: 'https://market.tapit.com.co',
        angular: 'https://tapit.com.co/app',
        react: 'https://tapit.com.co',
        api: 'https://api.tapit.com.co'
      }
    };
  };
  ConfigService.getHostNameMap = function getHostNameMap() {
    return {
		'localhost': this.getEnvConfig().localhost,
		'dev.tapit.com.co': this.getEnvConfig().develop,
		'testing.tapit.com.co': this.getEnvConfig().testing,
		'preview.tapit.com.co': this.getEnvConfig().preview,
		'tapit.com.co': this.getEnvConfig().production,
		'market-dev.tapit.com.co': this.getEnvConfig().develop,
		'bavariacotest.vtexlocal.com.br': this.getEnvConfig().develop,
		'market.tapit.com.co': this.getEnvConfig().production
    };
  };
  return ConfigService;
}();
