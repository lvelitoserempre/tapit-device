export const environment = {
  production: true,
  cloudFunctionsApiKey: '87b56ab7-dacb-48b2-8aa1-a5cddc850ae8',
  firebase: {
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
      createUserReferralCode: 'createUserReferralCode',
      sendEmailUserRegister: 'sendEmailUserRegister',
      getEvents: 'getEventsForWeb',
      generateBooking: 'generateBookingV2',
      applyPromotionalCode: 'applyPromotionalCode',
      getEventsOneTime: 'getEventsV2'
  },
  shareUrl: "https://www.cervezapoker.com/poker-roja/gratis/{0}"
};
