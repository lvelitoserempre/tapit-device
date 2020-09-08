const TAPIT_CONFIG_PROD = {
  clientConfig: {
    ssoOrigin: 'https://tapit.com.co',
    ssoPath: '/sso/sign-up',
    ssoIframeId: 'sso-iframe',
    channel: 'TAPIT',
    ssoActionListener: null,
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBvKuj3cv5te44wY6IW2BcsmaGxFojCU3g',
    authDomain: 'rei-imagining-loyalty.firebaseapp.com',
    databaseURL: 'https://rei-imagining-loyalty.firebaseio.com',
    projectId: 'rei-imagining-loyalty',
    storageBucket: 'rei-imagining-loyalty.appspot.com',
    messagingSenderId: '829727191495',
    appId: '1:829727191495:web:87c155870b09f3522d69e2',
    measurementId: 'G-SJR2YLNKJS'
  },
  ssoConfig: {
    project: 'pola',
    /* String type parameter to indicate the application that is sending the request. */
    logoUrl: 'data:image/png;base64,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',
    /* String type parameter for the logo image URL or the base64 image. */
    sloganHtml: '<p class="text-center text-xs">La comunidad de los <span class="text-primary-500">amantes de la cerveza.</span></p>',
    /* String type parameter for the slogan in HTML tag format. Example: <p>Our Slogan</p>. */
    showLoginFacebookButton: true,
    /* Boolean type parameter to show the login facebook button. */
    showSignUpFacebookButton: true,
    /* Boolean type parameter to show the sign up facebook button. */
    showSignUPWithFields: true,
    /* Boolean type parameter to show the sign form. */
    showOffersOption: true,
    /* Boolean type parameter to show offers options. */
    loginEmail: '',
    /* String type parameter for sample mail to be displayed as a value within the email field. */
    loginEmailHint: '',
    /* String type parameter to show a suggestion of mail or text under the email field. Empty by default */
    loginPasswordHint: '',
    /* String type parameter to show a suggestion of password or text under the password field. Empty by default */
    signUpAcceptTermsHtml: '<h1 class="text-sm font-bold mb-1 text-left">Al registrarte estás aceptando:</h1><p class="text-sm text-left">Nuestros <a class="text-primary-500" href="/terms.html" target="_blank">Términos y Condiciones de Tapit,</a> las <a class="text-primary-500" href="/privacy.html" target="_blank">Políticas de Privacidad,</a> la <a class="text-primary-500" href="/data-proteccion.html" target="_blank">Política de protección de datos personales.</a> <br><br> El procesamiento de mi información personal por parte de Bavaria & Cía S.C.A. con las finalidades y usos requeridos por cerveza Poker descritos en la mencionada política. <br><br> Confirmo ser mayor de 18 años.</p>',
    /* String type parameter for legend of acceptance of terms and conditions when the user registers, in HTML tag format. SSO can recognize and apply tailwind css classes */
    signUpAcceptOffersHtml: '<p class="text-sm text-left">Acepto el envío de ofertas exclusivas a mi correo.</p>',
    /* String type parameter for legend of acceptance of sending offers when the user registers, in HTML tag format. SSO can recognize and apply tailwind css classes */
    loginFooterHtml: '<p class="text-sm text-center">Al iniciar sesión estás aceptando nuestros <a class="text-primary-500" href="/terms.html" target="_blank">Términos y Condiciones de Tapit,</a> las <a class="text-primary-500" href="/privacy.html" target="_blank">Políticas de Privacidad,</a> la <a class="text-primary-500" href="/data-proteccion.html" target="_blank">Política de protección de datos personales</a> y el envío de ofertas exclusivas a mi correo. </p>',
    /* String type parameter for legend of acceptance of terms and conditions when the user registers, in HTML tag format. SSO can recognize and apply tailwind css classes */
    showCloseButton: true,
    /* Boolean type parameter to show the close button. */
    showContainerBackground: true,
    /* Boolean type parameter to show the container background. */
    language: 'es',
    /* String type parameter to define the language, in case a valid parameter is not sent, the browser language will be taken */
    reference: '',
    /* String type parameter to define the referrer of the iframe (the domain of the current client)*/
    showRecoverPassword: true,
    /* Boolean type parameter to show recover Password link. */
    styles: '.text-primary-500{color: #da291c;} .bg-primary-500{background: #da291c;} .border-primary-500{border-color: #da291c;} .logo {padding-top: 15px;} .app-checkbox input:checked ~ .checkmark { background-color: #da291c; border-color: #da291c;}',
    /*  String type parameter to add custom stylest in CSS format. Empty by default */
    interests: [
      /* Object type parameter to add custom inputs.
          Each custom input must be made up of a key and a label.
          The password will be saved in the database in the interests property, only if the user selects that interest
      */
      {key: 'beer', label: 'Cerveza'},
      {key: 'soccer', label: 'Futbol'}
    ]
  }
}
