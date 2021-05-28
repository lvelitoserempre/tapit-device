export const environment = {
  production: true,
  firebase: {
    config: {
      apiKey: 'AIzaSyBrq4lh-ysZSjJkXyz0BVK_Yc4Csvy3tz4',
      authDomain: 're-imagining-loyalty-qa.firebaseapp.com',
      databaseURL: 'https://re-imagining-loyalty-qa.firebaseio.com',
      projectId: 're-imagining-loyalty-qa',
      storageBucket: 're-imagining-loyalty-qa.appspot.com',
      messagingSenderId: '1070474351483',
      appId: '1:1070474351483:web:b1a6438473a46ff7df63de'
    },
    collections: {
      userAccount: 'user_account_tap'
    },
    functions: {
      url: 'https://api.qa.tapit.com.co',
      checkUser: '/v1/user/check',
      getAllEvents: '/v1/list/events',
      getAllCodes: '/v1/tapits/',
      sendDigitalInvoice: '/api-receiveDigitalInvoice',
      getCustomToken: '/v1/sso/customToken',
      register: '/v2/sso/register',
      auth: '/v2/sso/auth',
      xeerpa: '/v1/xeerpa'
    }
  },
  googleTagManagerId: 'GTM-NFCC7RC',
  googleAnalyticsId: 'UA-159252784-6',
  hosting: 'https://tapit-sso-qa.web.app/v3',
  facebook: {
    appId: '1267417616962530'
  },
  facebookPixelId: '1374695322930119',
  drupal:{
    url: 'http://tapit.test-abinbev.acsitefactory.com',
    oldApiPath: '/api/homepage',
    newApiPath: '/api/v1/pages',
    token: 'a697c03d-b6da-45bd-9418-e05f727010bc'
  },
  ssoApp: 'https://sso.qa.tapit.com.co/v3/tapit.sso.main.js',
  marketUrl: 'https://market.qa.tapit.com.co',
  maxAge: 300,
  sMaxAge: 60
};
