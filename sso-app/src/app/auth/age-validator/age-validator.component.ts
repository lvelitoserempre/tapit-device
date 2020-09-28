import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import SSOConfig from '../../single-sign-on/sso-config';
import {Title} from '@angular/platform-browser';
import {LoaderService} from '../../loader/loader-service/loader.service';
import {DialogService} from '../../dialog/dialog-service/dialog.service';
import {SSOConfigService} from '../../single-sign-on/sso-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidationMessages, Validations} from './age-validator.validations';

@Component({
  selector: 'app-age-validator',
  templateUrl: './age-validator.component.html',
  styleUrls: ['./age-validator.component.scss']
})
export class AgeValidatorComponent implements OnInit {
  form: FormGroup;
  validationMessages = ValidationMessages;
  config: SSOConfig;

  constructor(title: Title,
              private loaderService: LoaderService,
              private dialogService: DialogService,
              private formBuilder: FormBuilder,
              private configService: SSOConfigService,
              private router: Router,
              private route: ActivatedRoute) {
    title.setTitle('TapIt - Age')
    this.form = this.formBuilder.group(Validations, {updateOn: 'blur'});
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = config;
    });
  }

  submit() {
  }

  closePopup() {

  }
}
