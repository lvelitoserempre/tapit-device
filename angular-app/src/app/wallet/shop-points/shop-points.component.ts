import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ShopsService } from './shops.service'
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service'
import { ActivatedRoute } from '@angular/router';
import { ShopCardComponent } from './shop-card/shop-card.component';

@Component({
  selector: 'app-shop-points',
  templateUrl: './shop-points.component.html',
  styleUrls: ['./shop-points.component.scss']
})
export class ShopPointsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(ShopCardComponent) cards: QueryList<ShopCardComponent>
  products: any[];
  productSubscription: Subscription;
  totalPages: number;
  productPage: number = 1;
  actualPage: number;
  idToCompare: string;
  noProducts: boolean = false;
  noLocationPermission = false;
  center: google.maps.LatLngLiteral;
  public onlineOffline: boolean = window.navigator.onLine;

  constructor(private productService: ShopsService, private loadingService: LoadingService, private route: ActivatedRoute) { 
  }

  onScroll(){
    if(this.actualPage < this.totalPages){
      this.productService.getProduct(this.actualPage + 1).subscribe((res:any) => {
        let response = res;
        this.actualPage = parseInt(response.page);
        return response.data.forEach(e => this.products.push(e))
      }, err => {
        console.log(err)
      });
    } else {
      return
    }
  }

  ngOnInit(): void {
    this.loadingService.show();
    if(localStorage.getItem('userLat')) {
      this.center = {
        lat: parseFloat(localStorage.getItem('userLat')),
        lng: parseFloat(localStorage.getItem('userLng'))
      };
      this.loadProducts();
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      localStorage.setItem('userLat', String(this.center.lat));
      localStorage.setItem('userLng', String(this.center.lng));
      this.loadProducts();
      }, (error) => {
        this.noLocationPermission = true;
        this.loadingService.hide();
      });
    }
    

    this.route.queryParams.subscribe(params => {
      if(params['id']){
        this.idToCompare = params.id;
      }
    });
  }

  loadProducts(): void {
    this.productSubscription = this.productService.getProductLocation(this.productPage, this.center.lat, this.center.lng).subscribe((res: any) => {
      let response = res;
      this.products = response.items;
      this.totalPages = response.pager_total;
      this.actualPage = parseInt(response.page);
      
      if(this.products.length === 0){
        this.noProducts = true;
        this.loadingService.hide();
      } else {
        this.noProducts = false;
      }

      this.loadingService.hide();
    }, err => {
      this.loadingService.hide();
      this.noProducts = true;
      console.error(err);
    })
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cards.changes.subscribe(cards => {
      cards.forEach(element => {
        if(element.id == this.idToCompare) {
          element.openModal('promo');
        }
      });
    });
  }


}
