import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthFormModel} from 'src/app/models/auth-form.model';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/services/loader/loader.service';
import {DialogService} from 'src/app/services/dialog/dialog.service';
import {UserAccountService} from 'src/app/services/user-account/user-account.service';
import {UserAccount} from 'src/app/models/user-account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  loginFormModel: AuthFormModel = new AuthFormModel();
  validationMessages = {
    email: {required: 'El email es obligatorio.', email: 'El formato de email no es válido.'},
    password: {required: 'La contraseña es obligatoria.'}
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private userAccountService: UserAccountService
  ) {
    this.loginForm = this.formBuilder.group(this.loginFormModel);
  }

  ngAfterViewInit() {
    this.loaderService.hide();
  }

  login() {
    this.loaderService.show();
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(email, password)
      .then(async (user) => {
        // Set the user info in local storage
        this.authService.setUserInLocalStorage(user.user);
        // Set the user account data in local storage
        await this.userAccountService.getUserAccount(user.user.uid)
          .then((doc) => {
            if (doc.exists) {
              const userAccount: UserAccount = doc.data() as UserAccount;
              this.userAccountService.setUserAccountInLocalStorage({
                firstName: userAccount.firstName,
                lastName: userAccount.lastName
              });
            }
          })
          .catch((error) => {
            this.loaderService.hide();
            this.dialogService.manageError(error);
          });

        this.loaderService.hide();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loaderService.hide();
        this.dialogService.manageError(error);
      });
  }

}
