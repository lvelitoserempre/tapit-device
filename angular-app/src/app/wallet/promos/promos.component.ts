import { Component, OnInit, OnDestroy, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { PromosService } from './promos.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PromoCardComponent } from './promo-card/promo-card.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(PromoCardComponent) cards: QueryList<PromoCardComponent>
  totalPages: number;
  promos: any[];
  promosSubscription: Subscription;
  promoPage: number = 1;
  actualPage: number;
  idToCompare: string;
  noPromos: boolean = false;

  constructor(
    private promoService: PromosService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  // to add content from the next page of the API
  onScroll() {
    if (this.actualPage < this.totalPages) {
      this.promoService.getPromos(this.actualPage + 1).subscribe((res: any) => {
        let response = res;
        this.actualPage = parseInt(response.page);
        return response.data.forEach(e => this.promos.push(e));
      }, err => {
        console.log(err);
      });
    } else {
      return
    }
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.promosSubscription = this.promoService.getPromos(this.promoPage).subscribe((res: any) => {
      let response = res;
      
      if(response.length === 0){
        this.noPromos = true;
      } else {
        this.noPromos = false;
      }

      this.promos = response.data;
      this.totalPages = response.pager_total;
      this.actualPage = parseInt(response.page)
      this.loadingService.hide();
    }, err => {
      this.loadingService.hide();
      this.noPromos = true;
      console.log(err);
    })

    this.route.queryParams.subscribe(params => {
      if(params['id']){
        this.idToCompare = params.id;
      }
    });

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

  ngOnDestroy(): void {
    this.promosSubscription.unsubscribe();
  }

}
