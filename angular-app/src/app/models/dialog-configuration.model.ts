/**
 * Interface for Dialog Configuration Model
 */
export interface DialogConfigurationModel {
    icon?: string;
    title: string;
    subtitle?: string;
    message: string;
    qr?: string;
    buttonOne: string;
    isShareDialog?: boolean;
    buttonTwo?: string;
    iconButton?: string;
    buttonPoints?: boolean;
    disclaimer?: string;
}
