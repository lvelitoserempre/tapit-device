export interface DialogConfiguration {
  type: 'error' | 'information' ;
  icon?: string;
  title?: string;
  subtitle?: string;
  message: string;
  buttonOne: string;
  buttonTwo?: string;
  iconButton?: string;
}
