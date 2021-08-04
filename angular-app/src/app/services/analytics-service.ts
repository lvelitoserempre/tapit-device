export class AnalyticsService {

  private constructor() {
  }

  static sendData(uid, action: string, label: string, gaCategory: string, gaAction: String) {
    if (window['dataLayer'] && window['dataLayer'] instanceof Array) {
      if (uid) {
        window['dataLayer'].push({
          'userId': uid
        });
      }

      window['dataLayer'].push({
        'category': 'sso_page',
        'action': action,
        'label': label,
        'event': 'clic'
      });
    }

    if (window['ga'] && typeof window['ga'] == 'function') {
      window['ga']('send', {hitType: 'event', eventCategory: gaCategory, eventAction: gaAction, eventLabel: ''});
    }
  }
}
