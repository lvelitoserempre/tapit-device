import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventDAO} from '../../event/event-dao.service';
import {BillDAO} from '../../bill/bill-dao.service';

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

  constructor(private eventDAO: EventDAO, private billDAO: BillDAO) {
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
      alert('Muy grande');
    }
  }

  sendFile() {
    this.billDAO.saveBill({
      eventId: this.selectedEvent.id,
      invoiceImageEncoded: this.selectedImage.base64.replace('data:image/png;base64,', ''),
      type: this.selectedImage.fileType,
      invoiceNumber: this.billNumber
    }).subscribe(res => console.log(res), error => console.error(error))
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
}
