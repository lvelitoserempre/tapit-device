export interface UserAccount {
  points?: number;
  refreshToken?: string;
  idToken?: string;
  id?: string;
  customToken?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: Date | string;
  additionalData?: any;
  phone?: string;
  gender?: string;
  identityType?: string;
  identity?: string;
  city?: string;
  password?: string;
  origin?: string;
  getExclusiveEmails?: boolean;
  termsAndConditions?: boolean;
}
