export const environment = {
  production: true,
  firebase: {
    config: {
      apiKey: "AIzaSyBrq4lh-ysZSjJkXyz0BVK_Yc4Csvy3tz4",
      authDomain: "re-imagining-loyalty-qa.firebaseapp.com",
      databaseURL: "https://re-imagining-loyalty-qa.firebaseio.com",
      projectId: "re-imagining-loyalty-qa",
      storageBucket: "re-imagining-loyalty-qa.appspot.com",
      messagingSenderId: "1070474351483",
      appId: "1:1070474351483:web:b1a6438473a46ff7df63de"
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
      createUser: '/v1/sso/user',
      xeerpa: '/v1/xeerpa'
    }
  },
  marketUrl: 'https://market.qa.tapit.com.co/api/vtexid/pub/logout?scope=bavariaco&returnUrl=https://market.qa.tapit.com.co',
  googleAnalyticsId: 'UA-159252784-5',
  googleTagManagerId: 'GTM-MGL9B93',
  facebookPixelId: '1374695322930119',
  drupal:{
    url: 'https://qa-content.abi-rewards.de',
    promoPath: '/api/v1/promotions'
  },
};
