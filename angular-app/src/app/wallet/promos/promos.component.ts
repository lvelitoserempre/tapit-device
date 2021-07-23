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
  promos: any[];
  promosSubscription: Subscription;
  promoPage: number = 1;

  constructor(
    private promoService: PromosService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.promosSubscription = this.promoService.getPromos(this.promoPage).subscribe((res:any) => {
      const response = res;
      this.promos = response.data;
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
