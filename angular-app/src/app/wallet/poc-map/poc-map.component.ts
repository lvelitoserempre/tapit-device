import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-poc-map',
  templateUrl: './poc-map.component.html',
  styleUrls: ['./poc-map.component.scss']
})
export class PocMapComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  infoContent = '';
  itemNumber: string = 'width: 100vw; transform: translateX(0);';
  margin: number = 0;
  idToGet: string;
  url: string;

  image: any = {
    url: "../../assets/images/pin.svg",
    scaledSize: new google.maps.Size(35, 35), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  bigImage: any = {
    url: "../../assets/images/pin.svg",
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  
  markers: Array<any>;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {
    icon: this.image
  }
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    this.markers = [
      {
        position: {
          lat: -12.040568,
          lng: -76.9229726,
        },
        info: 'Avenida Coayacán',
        title: 'La Chilanguita',
        image: 'https://co-tc-shopper.s3.amazonaws.com/Tipos%20de%20Tienda/Mini_mercado_3%20%281%29.jpg',
        tag: 'Bar',
        options: {
          icon: this.image
        },
        status: 'active'
      },
      {
        position: {
          lat: -12.065568,
          lng: -76.9229846,
        },
        info: 'Costa Verde S/N',
        title: 'Restaurant Cala',
        image: 'https://co-tc-shopper.s3.amazonaws.com/Tipos%20de%20Tienda/Mini_mercado_3%20%281%29.jpg',
        tag: 'Restaurant',
        options: {
          icon: this.image
        },
        status: ''
      },
      {
        position: {
          lat: -12.032068,
          lng: -76.9229726,
        },
        info: 'Avenida Grau 678, Miraflores',
        title: 'Las Brujas de Cachiche',
        image: 'https://co-tc-shopper.s3.amazonaws.com/Tipos%20de%20Tienda/Mini_mercado_3%20%281%29.jpg',
        tag: 'Bar',
        options: {
          icon: this.image
        },
        status: ''
      }
    ];

    this.itemNumber = 'width: '+this.markers.length * 100+'vw; transform: translateX('+this.margin+');';
  }

  getCenter(): void {
    console.log('this is the center: ',this.map.getCenter());
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.trackUser;
    });
    this.route.queryParams.subscribe(params => {
        this.idToGet = params.id;
        this.url = params.url;
      });
  }

  trackUser() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position): void {
    console.log('this is the actual position: ',position);
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  sliderMove(i:string) {
    let index = parseInt(i);
    if(index < this.markers.length - 1) {
      index = index + 1;
    } else {
      index = 0;
    }
    this.sliderChange(index.toString());
  }

  goBack() {
    this.router.navigate([this.url], { queryParams: {id: this.idToGet}});
  }

  sliderChange(i: string) {
    this.markers.forEach((marker) => marker.status = '');
    this.markers[i].status = 'active';
    this.itemNumber = 'width: '+this.markers.length * 100+'vw; transform: translateX(-'+parseInt(i) * 100+'vw);';
  }
}
