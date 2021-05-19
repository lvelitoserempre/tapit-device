import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {

  loading: boolean = false;

  // INVALID DOCUMENT
  textError: string = null;

  // USER
  user: any;
  private userSubscription: Subscription;

  // FORM
  formDataUser: FormGroup;

  // VALIDATIONS
  validation_messages = {
    'identityType': [
      {type: 'required', message: 'Selecciona el tipo de documento.'}
    ],
    'identity': [
      {type: 'required', message: 'Ingresa el número de documento.'},
      {type: 'minlength', message: 'El número de documento no puede ser menor de 4 digitos.'},
      {type: 'maxlength', message: 'El número de documento no puede tener más de 12 dígitos.'},
      {type: 'pattern', message: 'El número de documento no es válido.'}
    ],
  }

  constructor(
    private userAuthenticationService: AuthService,
    private _profileSvc: ProfileService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
    this.loading = true;
    this.userSubscription = this.userAuthenticationService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
        this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  // This method is responsible for calling the service to save a user data
  saveDataUser() {
    this.loading = true;
    this._profileSvc.updateDocument(this.formDataUser.value, this.user.idToken).subscribe(res => {
      this.loading = false;
      this.textError = null;
    }, err => {
      this.textError = err.error?.data?.message || null;
      this.loading = false;
    });
  }

  // This method is responsible for loading the form data
  loadData() {
    this.formDataUser = new FormGroup({
      identityType: new FormControl(null, [
        Validators.required
      ]),
      identity: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern('[0-9]*')
      ]),
    });
    this.clearData();
  }

  // Clear form data 
  clearData(): void {
    this.formDataUser.reset();
    this.formDataUser.setValue({
      identityType: '',
      identity: ''
    });
  }
}
