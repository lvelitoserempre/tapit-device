declare const dataLayer;

export class GtmService {

  private constructor() {
  }

  static sendEvent(action, label) {
    dataLayer.push({
      'category': 'sso_page',
      'action': action,
      'label': label,
      'event': 'clic'
    });
  }
}
