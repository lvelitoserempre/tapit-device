export default class ConfigService {
  static getEnvConfig() {
    return {
      localhost: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'http://localhost:4200',
        react: 'http://localhost:9000',
        api: 'https://api-dev.tapit.com.co',
      },
      develop: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'https://dev.tapit.com.co/app',
        react: 'https://dev.tapit.com.co',
        api: 'https://api-dev.tapit.com.co',
      },
      qa: {
        market: 'https://market.qa.tapit.com.co',
        angular: 'https://qa.tapit.com.co/app',
        react: 'https://qa.tapit.com.co',
        api: 'https://api.qa.tapit.com.co',
      },
      testing: {
        market: 'https://market-dev.tapit.com.co',
        angular: 'https://testing.tapit.com.co/app',
        react: 'https://testing.tapit.com.co',
        api: 'https://api-dev.tapit.com.co',
      },
      preview: {
        market: 'https://market.tapit.com.co',
        angular: 'https://preview.tapit.com.co/app',
        react: 'https://preview.tapit.com.co',
        api: 'https://api.tapit.com.co',
      },
      production: {
        market: 'https://market.tapit.com.co',
        angular: 'https://tapit.com.co/app',
        react: 'https://tapit.com.co',
        api: 'https://api.tapit.com.co',
      }
    }
  }

  static getHostNameMap() {
    return {
      'localhost': this.getEnvConfig().localhost,
      'dev.tapit.com.co': this.getEnvConfig().develop,
      'qa.tapit.com.co': this.getEnvConfig().qa,
      'testing.tapit.com.co': this.getEnvConfig().testing,
      'preview.tapit.com.co': this.getEnvConfig().preview,
      'tapit.com.co': this.getEnvConfig().production,
      'market-dev.tapit.com.co': this.getEnvConfig().develop,
      'market.tapit.com.co': this.getEnvConfig().production
    }
  }
}
