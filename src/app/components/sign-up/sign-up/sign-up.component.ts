import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpFormModel } from 'src/app/models/sign-up-form.model';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFormatter } from 'src/app/common/utils/date-formatter';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
/**
 * Component for sign up screen
 */
export class SignUpComponent {

    signUpForm: FormGroup;
    date = '';

    validationMessages = {
        birthDate: {
            required: 'Por favor, selecciona una fecha de nacimiento.',
            underAge: 'Debes ser mayor de 18 para poder registrarte.'
        },
        email: {
            required: 'El email es obligatorio.',
            email: 'El formato de email no es válido.'
        },
        password: {
            required: 'La contraseña es obligatoria.',
            pattern: 'La contraseña debe de tener al menos 6 caracteres.'
        },
        firstName: { required: 'El nombre es obligatorio.' },
        lastName: { required: 'Los apellidos son obligatorios.' },
        phone: {
            required: 'El número de teléfono es obligatorio.',
            pattern: 'El teléfono tiene que tener 10 dígitos.'
        }
    };

    constructor(
        private formBuilder: FormBuilder,
        private userAccountService: UserAccountService,
        private loaderService: LoaderService,
        private authService: AuthService,
        private router: Router,
        private dialogService: DialogService,
        private dateAdapter: DateAdapter<any>
    ) {
        this.signUpForm = this.formBuilder.group(new SignUpFormModel());
    }

    /**
     * Add a correct format to date.
     */
    addEventDate() {
        const d = this.signUpForm.get('birthDate').value;
        this.date = DateFormatter.format(d.toDate());
        this.dateAdapter.setLocale('es');
    }

    /**
     * Handles the form submission
     */
    async onSubmit() {
        this.loaderService.show();

        // Credentials used for login after successful sign up
        const email = this.signUpForm.get('email').value;
        const password = this.signUpForm.get('password').value;

        // The password field is not part of the final model
        // Is required for user creation purposes only and
        // will be removed before sending the final form
        const userAccountValue = this.signUpForm.value;
        // birthDate field with dd/MM/yyyy format
        userAccountValue.birthDate = this.date;
        delete userAccountValue.password;

        // Sign up with firebase
        const user = await this.authService.signUp(email, password).catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
        });

        // Set the user info in local storage
        this.authService.setUserInLocalStorage(user.user);

        // Create a new item in the user account collection
        await this.userAccountService.create(userAccountValue).catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
        });

        // Create a referral code for the user
        await this.userAccountService.createUserReferralCode(user.user.uid).catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
        });

        const referralCode = this.signUpForm.get('referralCode').value;

        if (!!referralCode) {
            await this.userAccountService.applyPromotionalCode(user.user.uid, referralCode).catch((error) => {
                this.loaderService.hide();
                this.dialogService.manageError(error);
            });
        }

        // Send welcoming email
        await this.userAccountService.sendEmailUserRegister(user.user.uid).catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
        });

        // Log in with firebase
        await this.authService.login(email, password).catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
        });

        this.loaderService.hide();
        this.router.navigate(['/home']);
    }

}
