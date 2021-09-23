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
      createUser: '/v1/sso/user',
      xeerpa: '/v1/xeerpa',
      activatePromo: '/v1/coupon-wallet/coupons/activate',
      deactivateCoupon: '/v1/coupon-wallet/coupons/deactivate',
      getCoupons: '/v1/coupon-wallet/coupons',
      getPocs: '/v1/pointsOfConsumption/',
    }
  },
  marketUrl: 'https://market.tapit.com.co/api/vtexid/pub/logout?scope=bavariaco&returnUrl=https://market.tapit.com.co',
  googleAnalyticsId: 'UA-159252784-5',
  googleTagManagerId: 'GTM-MGL9B93',
  facebookPixelId: '946672495822340',
  drupal:{
    url: 'https://content.abi-rewards.de',
    promoPath: '/api/v1/promotions'
  },
};
