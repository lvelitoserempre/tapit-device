import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthFormModel} from 'src/app/models/auth-form.model';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/services/loader/loader.service';
import {UserService} from '../../user/user.service';
import {DialogService} from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFormModel: AuthFormModel = new AuthFormModel();
  validationMessages = {
    email: {required: 'El email es obligatorio.', email: 'El formato de email no es válido.'},
    password: {required: 'La contraseña es obligatoria.'}
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group(this.loginFormModel);
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.loaderService.show();

    this.userService.login(email, password)
      .subscribe(res => {
          this.loaderService.hide();
          this.router.navigateByUrl('/home');
        },
        error => {
          this.loaderService.hide();
          this.dialogService.manageError(error);
        });
  }

}
