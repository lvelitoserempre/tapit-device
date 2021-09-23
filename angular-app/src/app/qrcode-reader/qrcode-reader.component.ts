import { Component, ViewChild, ViewEncapsulation, OnInit, Renderer2 } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DialogService } from '../dialog/dialog-service/dialog.service';
import { QrcodeReaderService } from './qrcode-reader.service';

@Component({
  selector: 'app-qrcode-reader',
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QRcodeReaderComponent implements OnInit {
  @ViewChild(QrScannerComponent) QrScannerComponent: QrScannerComponent;
  observerTokenSubs: Subscription = null;
  loading: boolean = false;

  constructor(
    private renderer: Renderer2,
    private qrcodeService: QrcodeReaderService,
    private dialogService: DialogService,
    private _authSvc: AuthService
  ) { }

  observerToken() {
    this.observerTokenSubs = this._authSvc.token$.subscribe(token => {
      this.qrcodeService.getHeaders(token);
    });
  }

  ngOnInit() {
    if (!this._authSvc.tokenCustom) {
      this.observerToken();
    } else {
      this.qrcodeService.getHeaders(this._authSvc.tokenCustom);
    }
  }

  ngAfterViewInit(): void {
    const _Qr: any = this.QrScannerComponent;
    this.startScanning(_Qr);
    _Qr.capturedQr
      .subscribe((result) => {
        //console.log('result', result);
        document.querySelector("#video > qr-scanner > div > video").setAttribute('style', 'display: none');
        this.loading = true;
        this.qrcodeService.sendCode(result).subscribe((res: any) => {
          this.loading = false;
          document.querySelector("#video > qr-scanner > div > video").setAttribute('style', 'display: block');
          const message: string = 'Obtuviste ' + res.data.points + ' puntos';
          this.dialogService.showMessage('information', message, '¡Has escaneado exitosamente tu código!', 'CONTINUAR');
        },
          (error: any) => {
            this.loading = false;
            document.querySelector("#video > qr-scanner > div > video").setAttribute('style', 'display: block');
            //console.log(JSON.stringify(error));
            switch (error.error.status) {
              case 422:
                return this.dialogService.showMessageError('¡Algo salió mal!', 'El código ingresado ya fue escaneado o expiró.', 'INTENTAR DE NUEVO');

              case 404:
                return this.dialogService.showMessageError('¡Algo salió mal!', 'No fue posible encontrar este código 🙁', 'INTENTAR DE NUEVO');

              default:
                console.error('error');
                return this.dialogService.showMessageError('¡Lo sentimos!', 'Hubo un error, inténtalo más tarde.', 'INTENTAR DE NUEVO');
            }
          }
        );
      });
  }

  startScanning(_Qr: any) {
    _Qr.foundCameras
      .subscribe((devices) => {
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
            videoDevices.push(device);
          }
        }
        //console.log('videoDevices', videoDevices);

        if (videoDevices.length > 0) {
          const constraints = {
            audio: false,
            video: {
              facingMode: 'environment',
              width: { ideal: 300 },
              height: { ideal: 300 }
            }
          }

          if (!_Qr.videoElement) {
            _Qr.videoElement = this.renderer.createElement('video');
            _Qr.videoElement.setAttribute('muted', 'true');
            _Qr.videoElement.setAttribute('autoplay', 'true');
            _Qr.videoElement.setAttribute('playsinline', 'true');
            //_Qr.videoWrapper.nativeElement.setAttribute('class', 'mirrored');
            this.renderer.appendChild(_Qr.videoWrapper.nativeElement, _Qr.videoElement);
          }

          navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
              _Qr.setStream(stream);
            });
        }
      });
  }
}
