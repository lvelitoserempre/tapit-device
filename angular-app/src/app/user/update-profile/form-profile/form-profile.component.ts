import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {

  // FORM
  formDataUser: FormGroup;

  // VALIDATIONS
  validation_messages = {
    'type_document': [
      {type: 'required', message: 'Selecciona el tipo de documento.'}
    ],
    'document': [
      {type: 'required', message: 'Ingresa el número de documento.'},
      {type: 'minlength', message: 'El número de documento no puede ser menor de 4 digitos.'},
      {type: 'maxlength', message: 'El número de documento no puede tener más de 12 dígitos.'},
      {type: 'pattern', message: 'El número de documento no es válido.'}
    ],
  }

  constructor() {
    this.loadData();
  }

  ngOnInit(): void {
  }

  // This method is responsible for calling the service to save a user data
  saveDataUser() {
    alert(`DOCUMENT: ${this.formDataUser.value.type_document}   -   DOCUMENT: ${this.formDataUser.value.document}`);
    // this.uiService.loading();
    // this.userService.saveData().subscribe(res => {
    //   this.uiService.closeLoading();
    //   this.uiService.toastShow(`Se han actualizado los datos correctamente!`, 'success');
    // }, err => {
    //   this.uiService.showError(err, 'No se han podido actualizar tus datos.');
    // });
  }

  // This method is responsible for loading the form data
  loadData() {
    this.formDataUser = new FormGroup({
      type_document: new FormControl(null, [
        Validators.required
      ]),
      document: new FormControl(null, [
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
      type_document: '',
      document: ''
    });
  }
}
