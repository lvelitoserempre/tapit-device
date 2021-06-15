import { Component, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VerifyIdentityService } from './services/verify-identity.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss']
})
export class VerifyIdentityComponent implements OnDestroy {
  
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
    private _verifyDocument: VerifyIdentityService,
    private _authService: AuthService
  ) {
    this.loadData();
   
    this.subscriptionUserAuth();
    this.subscriptionTokenAuth();
  }

  ngOnDestroy(): void {
    this._authService.user$.unsubscribe();
    this._authService.token$.unsubscribe();
    this.flagOpenModal = false;
  }

  changeIdentity(evt: any) {
    if (evt) {
      this.textError = null;
    }
  }

  // Subscription to user auth
  subscriptionUserAuth(): void {    
   
    this._authService.user$.subscribe((user: any) => {
    
      if (user) {
       
        if ((!user.identity) && (user.identityType === 'NO-ID') && !this.flagOpenModal) {
         
          this.flagOpenModal = true;
          setTimeout(() => {
            this.openModal(this.verifyIdentity);
          }, 500);
        }
      }
    });
  }

  subscriptionTokenAuth() {
    this._authService.token$.subscribe(token => {
      this.token = token;
    });
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
    if (this.formDataUser.valid) {  
      this._verifyDocument.updateDocument(this.formDataUser.value, this.token).subscribe(res => {
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
