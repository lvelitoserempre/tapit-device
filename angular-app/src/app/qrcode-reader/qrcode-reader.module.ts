import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRcodeReaderComponent } from './qrcode-reader.component';
import { RouterModule, Routes } from '@angular/router';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { NgxLoadingModule } from 'ngx-loading';


const routes: Routes = [
  {
    path: '',
    component: QRcodeReaderComponent
  }
];

@NgModule({
  declarations: [
    QRcodeReaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgQrScannerModule,
    NgxLoadingModule
  ]
})
export class QrcodeReaderModule { }
