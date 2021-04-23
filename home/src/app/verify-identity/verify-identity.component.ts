import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss']
})
export class VerifyIdentityComponent implements OnInit {
  
  closeResult: string;
  @ViewChild('verifyIdentity', { read: TemplateRef }) private verifyIdentity: TemplateRef<any>;

  // FORM
  formDataUser: FormGroup;

  // IS VALID
  isDocumentValid: boolean = false;
  isValidating: boolean = true;
  isDone: boolean = false;

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

  constructor(
    private modalService: NgbModal
  ) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  public openVerifyIdentity() {
    this.openModal(this.verifyIdentity);
  }

  private openModal(content: any) {
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

  private getDismissReason(reason: any): string {
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
  }

  // This method is responsible for calling the service to update a user data
  updateDataUser() {
    if (this.formDataUser.valid) {
      setTimeout(() => {
        // alert(`DOCUMENT: ${this.formDataUser.value.type_document}   -   DOCUMENT: ${this.formDataUser.value.document}`);
        this.isValidating = false;
        this.isDocumentValid = true;
      }, 1000);
    }
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
