export default interface SSOConfig {
  signUpAcceptOffersHtml: string;
  interests: { label: string, key: string }[];
  project: string;
  logoUrl: string;
  sloganHtml: string;
  showLoginFacebookButton: boolean;
  showSignUpFacebookButton: boolean;
  showOffersOption: boolean;
  loginEmail: string;
  loginEmailHint: string;
  loginPasswordHint: string;
  signUpAcceptTermsHtml: string;
  loginFooterHtml: string;
  showCloseButton: boolean;
  showContainerBackground: boolean;
  styles: string;
}
