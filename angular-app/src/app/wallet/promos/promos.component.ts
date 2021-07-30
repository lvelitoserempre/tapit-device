import { Component, OnInit, OnDestroy } from '@angular/core';
import { PromosService } from './promos.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit, OnDestroy {
  totalPages: number;
  promos: any[];
  promosSubscription: Subscription;
  promoPage: number = 1;

  constructor(
    private promoService: PromosService,
    private loadingService: LoadingService
  ) { }

  // to add content from the next page of the API
  onScroll() {
    let currentPage = this.promoPage;
    if(currentPage < this.totalPages){
      this.promoService.getPromos(currentPage + 1).subscribe((res:any) => {
        let response = res;
        response.data.forEach(e => this.promos.push(e));
        this.promoPage = response.page;
      }, err => {
        console.log(err);
      });
    } else {
      return
    }
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.promosSubscription = this.promoService.getPromos(this.promoPage).subscribe((res:any) => {
      let response = res;
      this.promos = response.data;
      this.totalPages = response.pager_total;
      this.loadingService.hide();
    }, err => {
      this.loadingService.hide();
      console.log(err);
    })

  }

  ngOnDestroy(): void{
    this.promosSubscription.unsubscribe();
  }

}
