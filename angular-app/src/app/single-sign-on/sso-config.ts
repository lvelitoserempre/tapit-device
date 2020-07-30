export default interface SSOConfig {
  interests: { label: string, key: string }[];
  origin: string;
  logoUrl: string;
  sloganHtml: string;
  showFacebookButton: boolean;
  showOffersOption: boolean;
  email: string;
  emailHint: string;
  passwordHint: string;
  signUpLegalHtml: string;
  loginLegalHtml: string;
  showCloseButton: boolean;
  styles: string;
}
