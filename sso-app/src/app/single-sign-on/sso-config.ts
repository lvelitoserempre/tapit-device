export default interface SSOConfig {
  signUpAcceptOffersHtml: string;
  interests: { label: string, key: string }[];
  project: string;
  logoUrl: string;
  sloganHtml: string;
  showLoginFacebookButton: boolean;
  showSignUpFacebookButton: boolean;
  showSignUPWithFields: boolean;
  showOffersOption: boolean;
  preCheckOffers: boolean;
  showRecoverPassword: boolean;
  loginEmail: string;
  loginEmailHint: string;
  loginPasswordHint: string;
  signUpAcceptTermsHtml: string;
  loginFooterHtml: string;
  language: string;
  showCloseButton: boolean;
  showContainerBackground: boolean;
  styles: string;
}
