export const environment = {
  production: true,
  firebase: {
    config: {
      apiKey: 'AIzaSyBvKuj3cv5te44wY6IW2BcsmaGxFojCU3g',
      authDomain: 'rei-imagining-loyalty.firebaseapp.com',
      databaseURL: 'https://rei-imagining-loyalty.firebaseio.com',
      projectId: 'rei-imagining-loyalty',
      storageBucket: 'rei-imagining-loyalty.appspot.com',
      messagingSenderId: '829727191495',
      appId: '1:829727191495:web:87c155870b09f3522d69e2',
      measurementId: 'G-SJR2YLNKJS'
    },
    collections: {
      userAccount: 'user_account_tap'
    },
    functions: {
      url: 'https://api.tapit.com.co',
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
  googleTagManagerId: 'GTM-MGL9B93',
  googleAnalyticsId: 'UA-159252784-5',
  hosting: 'https://tapit-sso-production.web.app/v3',
  facebook: {
    appId: '1703386173129451'
  },
  facebookPixelId: '946672495822340',
  drupal:{
    url: 'https://content.abi-rewards.de',
    v1ApiPath: '/api/v1/pages',
    v2ApiPath: '/api/v2/pages',
    apiAuth: '/oauth/token',
    token: 'e572e1c3-516f-462a-9688-20370f77b598',
    client_id: '10b16998-d0d9-4d10-a20f-5bff1d99df7b'
  },
  ssoApp: 'https://sso.tapit.com.co/v3/tapit.sso.main.js',
  marketUrl: 'https://market.tapit.com.co',
  maxAge: 86400,
  sMaxAge: 86400
};
