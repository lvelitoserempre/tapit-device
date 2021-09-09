import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../../user/update-profile/form-profile/services/profile.service';
@Component({
  selector: 'app-actualizar-cedula',
  templateUrl: './actualizar-cedula.component.html',
  styleUrls: ['./actualizar-cedula.component.scss']
})
export class ActualizarCedulaComponent implements OnInit {

  loading: boolean = false;

  // INVALID DOCUMENT
  textError: string = null;

  isErrorAny: boolean = false;
  textErrorAny: string = '¡Lo sentimos! No hemos podido completar la validación de tus datos. Por favor, inténtalo más tarde.';

  // USER
  user: any;
  private userSubscription: Subscription;

  // FORM
  formDataUser: FormGroup;

  // VALIDATIONS
  validation_messages = {
    'identityType': [
      { type: 'required', message: 'Selecciona el tipo de documento.' }
    ],
    'identity': [
      { type: 'required', message: 'Ingresa el número de documento.' },
      { type: 'minlength', message: 'El número de documento no puede ser menor de 4 digitos.' },
      { type: 'maxlength', message: 'El número de documento no puede tener más de 12 dígitos.' },
      { type: 'pattern', message: 'El número de documento no es válido.' }
    ],
  }

  constructor(
    private userAuthenticationService: AuthService,
    private _profileSvc: ProfileService
  ) {


  }

  ngOnInit(): void {
    this.userSubscription = this.userAuthenticationService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
        this.loading = false
      })

  }

}
