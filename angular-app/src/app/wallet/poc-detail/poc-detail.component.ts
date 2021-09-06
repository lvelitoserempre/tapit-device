import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-poc-detail',
  templateUrl: './poc-detail.component.html',
  styleUrls: ['./poc-detail.component.scss']
})
export class PocDetailComponent implements OnInit {

  poc: any = {
      name: 'Tienda Tres Esquinas',
      identityCode: '17668',
      address: 'KR 87 D 129 C -43 - BOGOT? D.C.',
      categories: ['Restaurante', 'Bar', 'Variedad'],
      lat: 4.7246544,
      lng: -74.1563444,
      contactInformation: {
        phoneNumber: '12345678',
        mobileNumber: '098765432',
        email: 'email@email.com',
        pocInstagram: 'https://www.instagram.com/pocUser',
      },
      workingHours: 'L-V 8AM-12M / L-V 2PM-6PM',
      pocDescriptions: {},
      pocURL: 'https://www.google.com',
  }

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

}
