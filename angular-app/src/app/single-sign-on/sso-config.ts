export default interface SSOConfig {
  interests: { label: string, key: string }[];
  project: string;
  logoUrl: string;
  sloganHtml: string;
  showLoginFacebookButton: boolean;
  showOffersOption: boolean;
  email: string;
  emailHint: string;
  passwordHint: string;
  signUpLegalHtml: string;
  loginLegalHtml: string;
  showCloseButton: boolean;
  styles: string;
}
