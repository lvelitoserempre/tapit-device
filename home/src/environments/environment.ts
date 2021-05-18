// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
      url: 'https://api.dev.tapit.com.co',
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
  hosting: '',
  facebook: {
    appId: '656082591823070'
  },
  facebookPixelId: '1374695322930119',
  drupalUrl: 'http://tapit.dev-abinbev.acsitefactory.com/api/homepage',
  drupalToken: 'a697c03d-b6da-45bd-9418-e05f727010bc',
  ssoApp: 'https://sso.dev.tapit.com.co/v3/tapit.sso.main.js',
  marketUrl: 'https://market-dev.tapit.com.co',
  maxAge: 300,
  sMaxAge: 60
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
