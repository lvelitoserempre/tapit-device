import { Component, ViewChild, ViewEncapsulation, OnInit, Renderer2 } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
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
  loading: boolean = false;
  isMobile: boolean = false;
  isDesktop: boolean = false;

  constructor(
    private renderer: Renderer2,
    private qrcodeService: QrcodeReaderService,
    private dialogService: DialogService,
  ) { }

  detectMobileDevice() {
    if (window.navigator.userAgent.match(/Android/i)) {
      this.isMobile = true;
    } else if (window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPad/i)) {
      this.isMobile = true;
    } else {
      this.isDesktop = true;
    }
  }

  ngOnInit() {
    this.detectMobileDevice();
  }

  ngAfterViewInit(): void {
    const _Qr: any = this.QrScannerComponent;
    this.startScanning(_Qr);
    _Qr.capturedQr.subscribe((result) => {
      _Qr.videoElement.setAttribute('style', 'display: none');
      this.loading = true;
      this.qrcodeService.sendCode(result).subscribe((res: any) => {
        this.loading = false;
        const message: string = 'Obtuviste ' + res.data.points + ' puntos';
        this.dialogService.showMessageOK('informationCodes', message, '¡Has escaneado exitosamente tu código!', 'CONTINUAR').afterClosed().subscribe(result => {
          this.reloadCam();
          _Qr.videoElement.setAttribute('style', 'display: block');
        });
      },
        (error: any) => {
          this.loading = false;
          switch (error.error.status) {
            case 422:
              this.dialogService.showMessageOK('errorCodes', '¡Algo salió mal!', 'El código ingresado ya fue escaneado o expiró.', 'INTENTAR DE NUEVO').afterClosed().subscribe(result => {
                this.reloadCam();
                _Qr.videoElement.setAttribute('style', 'display: block');
              });
              return true;

            case 404:
              this.dialogService.showMessageOK('errorCodes', '¡Algo salió mal!', 'No fue posible encontrar este código 🙁', 'INTENTAR DE NUEVO').afterClosed().subscribe(result => {
                this.reloadCam();
                _Qr.videoElement.setAttribute('style', 'display: block');
              });
              return true;

            default:
              console.error('error');
              this.dialogService.showMessageOK('errorCodes', '¡Lo sentimos!', 'Hubo un error, inténtalo más tarde.', 'INTENTAR DE NUEVO').afterClosed().subscribe(result => {
                this.reloadCam();
                _Qr.videoElement.setAttribute('style', 'display: block');
              });
              return true;
          }
        }
      );
    });
  }

  reloadCam() {
    const _Qr: any = this.QrScannerComponent;
    _Qr.canvasHidden = true;
    _Qr.videoElement.setAttribute("hidden", true);
    _Qr.getMediaDevices().then((devices) => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }

      if (videoDevices.length > 0) {
        let chosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            chosenDev = dev;
            break;
          }
        }
        if (chosenDev) {
          _Qr.chooseCamera.next(chosenDev);
        } else {
          _Qr.chooseCamera.next(videoDevices[0]);
        }
        const constraints = {
          audio: false,
          video: {
            zoom: 3.5,
            facingMode: 'environment',
            width: { ideal: 300 },
            height: { ideal: 300 }
          }
        }

        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            const [track] = stream.getVideoTracks();
            const settings = track.getSettings();

            if (!('zoom' in settings)) {
              console.warn('Zoom is not supported by ' + track.label + settings);
            } else {
              console.warn('Zoom is not supported by ' + track.label + settings);
            }

            _Qr.setStream(stream);
          })
      }
    });
  }

  startScanning(_Qr: any) {
    _Qr.foundCameras.subscribe((devices) => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }

      if (videoDevices.length > 0) {
        const constraints = {
          audio: false,
          video: {
            zoom: 3.5,
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
          this.renderer.appendChild(_Qr.videoWrapper.nativeElement, _Qr.videoElement);
        }

        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            const [track] = stream.getVideoTracks();
            const settings = track.getSettings();

            if (!('zoom' in settings)) {
              console.warn('Zoom is not supported by ' + track.label + settings);
            } else {
              console.warn('Zoom is not supported by ' + track.label + settings);
            }

            _Qr.setStream(stream);
          });
      }
    });
  }

  ngOnDestroy() {
    this.QrScannerComponent.videoElement;
  }
}
