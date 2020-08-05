import {Component} from '@angular/core';
import {LoaderService} from 'src/app/loader/loader-service/loader.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
/**
 * Component for loading screen
 */
export class LoaderComponent {

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
  }
}
