import { Component, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VerifyIdentityService } from './services/verify-identity.service';
import { AuthService } from '../services/auth/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import auth = firebase.auth;
import User = firebase.User;
import firestore = firebase.firestore;
import { UserDAO } from '../user/user-dao.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss']
})
export class VerifyIdentityComponent {

  closeResult: string;
  @ViewChild('verifyIdentity', { read: TemplateRef }) private verifyIdentity: TemplateRef<any>;

  // FORM
  formDataUser: FormGroup;

  // IS VALID
  isDocumentValid: boolean = false;

  isValidate: boolean = true;

  isErrorAny: boolean = false;
  textButtonErrorAny: string = 'Cerrar';
  textErrorAny: string = '¡Lo sentimos! No hemos podido completar la validación de tus datos. Por favor, inténtalo más tarde.';

  token: string;

  flagOpenModal: boolean = false;

  // INVALID DOCUMENT
  textError: string = null;

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
    'confirm_identity': [
      {type: 'required', message: 'Ingresa la confirmación del número de documento.'},
    ],
  }

  constructor(
    private modalService: NgbModal,
    private verifyIdentityService: VerifyIdentityService,
    private _authService: AuthService,
    private cookieService: CookieService
  ) {
    this.loadData();
  }

  changeIdentity(evt: any) {
    if (evt) {
      this.textError = null;
    }
  }
  
  openVerifyIdentity(user_id: string) {
    this._authService.getFireStoreUserDocument(user_id)
    .then(userDocument => {
      const userData = UserDAO.snapshotToUser(userDocument)
      if ((!userData.identity) && (userData.identityType === 'NO-ID')) {
        this.flagOpenModal = true;
        this.openModal(this.verifyIdentity)
      }
    })
    .catch(error => console.error(error))
  }

  openModal(content: any) {
    const modalConfig = {
      ariaLabelledBy: 'modal-basic-title',
      ignoreBackdropClick: true,
      keyboard: false
    }
    this.modalService.open(content, modalConfig).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
    this.flagOpenModal = false;
  }

  // This method is responsible for calling the service to update a user data
  updateDataUser() {
    this.token = this.cookieService.get('frbtkn');
    if (this.formDataUser.valid) {
      this.verifyIdentityService.updateDocument(this.formDataUser.value, this.token)
      .subscribe(() => {
        this.isValidate = true;
        this.textError = null;
        this.closeModal();
      }, err => {
        this.textError = err.error?.data?.message;
        this.isValidate = false;
        if (!err.error?.data?.message) {
          this.isErrorAny = true;
        }
      });
    }
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
      confirm_identity: new FormControl(null, [
        Validators.required
      ])
    }, { validators: this.verifyDocument });
    this.clearData();
  }

  // This method is responsible for verifying that two documents are equal
  verifyDocument: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const document = control.get('identity');
    const confirm_document = control.get('confirm_identity');
    return (document.value !== confirm_document.value) ? { verifyDocument: true } : null;
  };

  // Clear form data
  clearData(): void {
    this.formDataUser.reset();
    this.formDataUser.setValue({
      identityType: '',
      identity: '',
      confirm_identity: ''
    });
  }
}
