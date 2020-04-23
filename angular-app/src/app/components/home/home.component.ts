import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventDAO} from '../../event/event-dao.service';
import {BillDAO} from '../../bill/bill-dao.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog/dialog.service';
import {LoaderService} from '../../services/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('inputFile', {static: true})
  inputFile: ElementRef;
  events = [];
  selectedImage: { base64: string, fileType: string };
  selectedEvent: any;
  billNumber: string;
  isMobile: boolean;
  beersImages = [
    '../assets/images/beers/beer-Aguila.png',
    '../assets/images/beers/beer-Poker.png',
    '../assets/images/beers/beer-Club.png',
    '../assets/images/beers/beer-Corona.png',
    '../assets/images/beers/beer-Bud.png',
    '../assets/images/beers/beer-Stella.png',
    '../assets/images/beers/beer-Redds.png',
    '../assets/images/beers/beer-Pilsen.png',
    '../assets/images/beers/beer-Costenita.png',
  ];

  constructor(private eventDAO: EventDAO, private billDAO: BillDAO, private router: Router, private loaderService: LoaderService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.eventDAO.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => event.isSelected = true);
    });
    this.isMobile = this.detectMobile();
  }

  selectedBill(event: any) {
    const FIVE_MB = 5242880;
    const file: File = event.target.files[0];

    if (file && file.size < FIVE_MB) {
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = {
          base64: reader.result as string,
          fileType: file.type
        };
      };

      reader.readAsDataURL(file);
    } else {
      this.dialogService.showErrorDialog({
        message: 'Tu imagen ocupa mas de 5MB. Selecciona una imagen mas pequeña o de menos resolución',
        buttonOne: 'INTENTA DE NUEVO'
      });
      this.selectedImage = null;
    }
  }

  sendFile() {
    if (this.isFormValid()) {
      this.loaderService.show();

      this.billDAO.saveBill({
        eventId: this.selectedEvent.id,
        invoiceImageEncoded: this.selectedImage.base64.replace('data:image/png;base64,', ''),
        fileType: this.selectedImage.fileType,
        invoiceNumber: this.billNumber
      }).subscribe(res => {
          this.loaderService.hide();
          this.router.navigateByUrl('/final-message');
        },
        error => {
          this.loaderService.hide();
          this.dialogService.showErrorDialog({
            message: 'Hubo un error al enviar el archivo',
            buttonOne: 'INTENTA DE NUEVO'
          });
        });
    }
  }

  slideConfig = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  detectMobile() {
    const toMatch: any = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  selectEvent(i: number) {
    this.events.forEach(event => event.isSelected = false);
    this.events[i].isSelected = true;
    this.selectedEvent = this.events[i];
  }

  private isFormValid() {
    if (!this.selectedEvent) {
      this.dialogService.showErrorDialog({
        message: 'Debes seleccionar un evento',
        buttonOne: 'INTENTA DE NUEVO'
      });

      return false;
    }

    if (!this.billNumber || this.billNumber.trim() === '') {
      this.dialogService.showErrorDialog({
        message: 'Debes ingresar el número de factura',
        buttonOne: 'INTENTA DE NUEVO'
      });

      return false;
    }

    if (!this.selectedImage) {
      this.dialogService.showErrorDialog({
        message: 'Debes seleccionar una imagen',
        buttonOne: 'INTENTA DE NUEVO'
      });

      return false;
    }

    return true;
  }
}
