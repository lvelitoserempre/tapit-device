import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SignUpFormModel} from 'src/app/models/sign-up-form.model';
import {UserAccountService} from 'src/app/services/user-account/user-account.service';
import {LoaderService} from 'src/app/services/loader/loader.service';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';
import {DialogService} from 'src/app/services/dialog/dialog.service';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DateFormatter} from 'src/app/common/utils/date-formatter';
import UserCredential = firebase.auth.UserCredential;
import {from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {User} from 'firebase';
import {MatDatepicker} from '@angular/material/datepicker';
import {DurationInputArg2, Moment} from 'moment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SignUpComponent {
  signUpForm: FormGroup;
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
    firstName: {required: 'El nombre es obligatorio.'},
    lastName: {required: 'Los apellidos son obligatorios.'},
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

  async onSubmit() {
    const form = this.signUpForm.value;
    const date = this.signUpForm.get('birthDate').value as Moment;

    this.loaderService.show();

    from(this.authService.signUp(form.email, form.password))
      .pipe(mergeMap((userCredential: UserCredential) => {
        this.authService.setUserInLocalStorage(userCredential.user);

        return from(this.authService.login(form.email, form.password));
      }))
      .pipe(mergeMap(() =>
        this.userAccountService.checkExistentUser({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: date.toDate().getTime(),
          phone: form.phone
        })))
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigate(['/home']);
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }
}
