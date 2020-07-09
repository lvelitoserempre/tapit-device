import UrlService from "./url.service";
import ConfigService from "./config.service";

export default class UrlBuilderService {
  static buildUrl(app, path) {
    if (UrlService.getSearchMap().env) {
      return this.buildUrlByEnvironmentParam(app, path);
    } else {
      return this.buildUrlByHostName(app, path);
    }
  }

  static buildUrlByEnvironmentParam(app, path) {
    const env = UrlService.getSearchMap().env;

    if (!ConfigService.getEnvConfig()[env]) {
      throw Error('Env ' + env + ' does not exist');
    }

    if (!ConfigService.getEnvConfig()[env][app]) {
      throw Error('App ' + app + ' does not exist in the config for the env: ' + env);
    }

    return ConfigService.getEnvConfig()[env][app] + this.normalizePath(path);
  }

  static buildUrlByHostName(app, path) {
    if (!ConfigService.getHostNameMap()[window.location.hostname]) {
      throw Error('There is not config for this hostname: ' + window.location.hostname);
    }

    if (!ConfigService.getHostNameMap()[window.location.hostname][app]) {
      throw Error('App ' + app + ' does not exist in the config for the host name: ' + window.location.hostname);
    }

    return ConfigService.getHostNameMap()[window.location.hostname][app] + this.normalizePath(path);
  }

  static normalizePath(path) {
    return (path ? (path.startsWith('/') ? path : '/' + path) : '');
  }
}
