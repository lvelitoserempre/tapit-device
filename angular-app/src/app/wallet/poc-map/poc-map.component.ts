import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PocMapService } from './poc-map.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-poc-map',
  templateUrl: './poc-map.component.html',
  styleUrls: ['./poc-map.component.scss']
})
export class PocMapComponent implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChildren(MapMarker) mapMarkers: QueryList<MapMarker>;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  infoContent = '';
  itemNumber: string = 'width: 100vw; transform: translateX(0);';
  margin: number = 0;
  idToGet: string;
  url: string;
  offerTitle: string;

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
  zoom = 14;
  center: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {
    icon: this.image
  }
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 12,
    disableDefaultUI: true,
    styles: [
      {
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
  }

  constructor(private route: ActivatedRoute, private loadingService: LoadingService, private router: Router, private location: Location, private pocService: PocMapService) {
    this.loadingService.show();
    this.markers = [];
    if(localStorage.getItem('userLat')) {
      this.center = {
        lat: parseFloat(localStorage.getItem('userLat')),
        lng: parseFloat(localStorage.getItem('userLng'))
      };
    } else {
      this.center = {
        lat: parseFloat(localStorage.getItem('baseLat')),
        lng: parseFloat(localStorage.getItem('baseLng'))
      };
    }
    console.log(this.center);
  }

  getCenter(): void {
   
    console.log('this is the center: ',this.center);
  }

  getPocs(): void {
    this.pocService.getPocs(this.center.lat,this.center.lng,this.idToGet,5000).subscribe((res:any) => {
      res.data.items.forEach(element => {
        let item = {
          tag: element.categories,
          id: element.id,
          info: element.location.address,
          title: element.name,
          options: {
            icon: this.image
          },
          image: element.images,
          distance: (element.distance / 1000).toFixed(2) + " km",
          position: {
            lat: element.location.latitude,
            lng: element.location.longitude
          },
          status: '',
          phone: element.contactInformation.phoneNumber,
          cell: element.contactInformation.mobileNumber,
          mail: element.contactInformation.email,
          instagram: element.contactInformation.instagram,
        };
        this.markers.push(item);
      });
      if(this.markers.length) {
        this.markers[0].status = 'active';
        this.infoContent = this.markers[0].title;
      }
      this.itemNumber = 'width: '+this.markers.length * 100+'vw; transform: translateX('+this.margin+');';
      this.loadingService.hide();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.idToGet = params.id;
        this.url = params.url;
        this.offerTitle = params.title;
        this.getPocs();
      });
    this.trackUser();
  }

  ngAfterViewInit(): void {
    this.mapMarkers.changes.subscribe(markers => {
        if(markers.toArray().length > 0){
          this.infoWindow.open(this.mapMarkers.toArray()[0])
          this.mapMarkers.toArray()[0].marker.setIcon(this.bigImage);
        } else {
          this.infoWindow.close();
        }
    });
  }

  trackUser() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      return
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

  refresh() {
    this.loadingService.show();
    this.markers = [];
    this.infoWindow.close();
    this.infoContent = '';
      this.center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      this.getPocs();
  }
  
  setCenterMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }, (error) => {
      console.log(error);
      this.center = {
        lat: parseFloat(localStorage.getItem('baseLat')),
        lng: parseFloat(localStorage.getItem('baseLng'))
      }
    });
  }

  navigatePromo(lat,lng) {
    if(this.center.lat == lat && this.center.lng == lng) {
      return false;
    }
    let url = 'https://www.google.com/maps/dir/'+this.center.lat+','+this.center.lng+'/'+lat+','+lng;
    window.open(url, '_blank').focus();
  }

  sliderChange(i: string) {
    this.markers.forEach((marker) => marker.status = '');
    this.markers[i].status = 'active';
    this.itemNumber = 'width: '+this.markers.length * 100+'vw; transform: translateX(-'+parseInt(i) * 100+'vw);';
    this.center = this.markers[i].position;
    this.infoContent = this.mapMarkers.toArray()[i].marker.title;
    this.mapMarkers.toArray().forEach((marker) => {
      marker.marker.setIcon(this.image);
    });
    this.mapMarkers.toArray()[i].marker.setIcon(this.bigImage);
    this.infoWindow.open(this.mapMarkers.toArray()[i])
  }
}
