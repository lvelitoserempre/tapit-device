export const environment = {
  production: true,
  firebase: {
    config: {
      apiKey: 'AIzaSyB822NxnsV-CB_k5E78q76jaqnCC4ohfVI',
      authDomain: 'clube-brahma.firebaseapp.com',
      databaseURL: 'https://clube-brahma.firebaseio.com',
      projectId: 'clube-brahma',
      storageBucket: 'clube-brahma.appspot.com',
      messagingSenderId: '226852992923',
      appId: '1:226852992923:web:1ad18fa74cab2f9826933e',
      measurementId: 'G-9P28VMNFGR'
    },
    collections: {
      userAccount: 'user_account_tap'
    },
    functions: {
      url: 'https://us-central1-clube-brahma.cloudfunctions.net/api-sso',
      checkUser: '/v1/user/check',
      getAllEvents: '/v1/list/events',
      getAllCodes: '/v1/tapits/',
      sendDigitalInvoice: '/api-receiveDigitalInvoice',
      getCustomToken: '/v1/sso/customToken',
      createUser: '/v1/sso/user'
    }
  }
};
