declare const dataLayer;

export class GtmService {

  private constructor() {
  }

  static sendEvent(uid, action: string, label: string) {
    if (uid) {
      dataLayer.push({
        'userId': uid
      });
    }

    dataLayer.push({
      'category': 'sso_page',
      'action': action,
      'label': label,
      'event': 'clic'
    });
  }
}
