export const environment = {
  production: false,
  firebase: {
    config: {
      apiKey: 'AIzaSyBbMDkDVAUJ8MWcKMVtU7Onrzv5JVlfSbA',
      authDomain: 're-imagining-loyalty-dev.firebaseapp.com',
      databaseURL: 'https://re-imagining-loyalty-dev.firebaseio.com',
      projectId: 're-imagining-loyalty-dev',
      storageBucket: 're-imagining-loyalty-dev.appspot.com',
      messagingSenderId: '25832745393',
      appId: '1:25832745393:web:773b0a77001015f2fcf590',
      measurementId: 'G-L8M3HWX53Q'
    },
    collections: {
      userAccount: 'user_account_tap'
    },
    functions: {
      url: 'https://api-dev.tapit.com.co',
      checkUser: '/v1/user/check',
      getAllEvents: '/v1/list/events',
      getAllCodes: '/v1/tapits/',
      sendDigitalInvoice: '/v1/digitalinvoice',
      getCustomToken: '/v1/sso/customToken',
      createUser: '/v1/sso/user',
      xeerpa: '/v1/xeerpa',
      activatePromo: '/v1/coupon-wallet/coupons/activate',
      deactivateCoupon: '/v1/coupon-wallet/coupons/deactivate',
      getCoupons: '/v1/coupon-wallet/coupons',
      getPocs: '/v1/pointsOfConsumption/',
    }
  },
  marketUrl: 'https://market-dev.tapit.com.co/api/vtexid/pub/logout?scope=bavariacotest&returnUrl=https://market-dev.tapit.com.co',
  googleAnalyticsId: 'UA-159252784-3',
  googleTagManagerId: 'GTM-NFCC7RC',
  facebookPixelId: '1374695322930119',
  drupal:{
    url: 'https://dev-content.abi-rewards.de',
    promoPath: '/api/v1/promotions'
  },
};
