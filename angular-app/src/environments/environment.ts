export const environment = {
  production: false,
  cloudFunctionsApiKey: '87b56ab7-dacb-48b2-8aa1-a5cddc850ae8',
  firebase: {
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
    url: 'https://us-central1-re-imagining-loyalty-dev.cloudfunctions.net',
    checkExistentUser: 'api-checkExistentUser',
    getAllEvents: 'api-listEvents'
  },
  googleAnalyticsId: 'UA-159252784-3',
  googleTagManagerId: 'GTM-NFCC7RC'
};
