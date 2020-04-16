import {Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  @Output() stepAction = new EventEmitter<number>();

  steps = [
    {
      title: 'Consigue tu código',
      description: 'Júntate con tus amigos y reclama una Poker Roja Gratis.<br>*Consulta <a href="https://home.gettap.it/terminosPokerRoja" target="_blank">términos y condiciones</a>',
      image: {
        path: '/assets/images/steps/Poker_Step_1.png',
        title: 'CERVEZA GRATIS',
      },
      cta: {
        text: '<b>Clic aquí</b>',
        href: '#'
      }
    },
    // Se comenta por evento suspendido
    // {
    //   title: '¿Vas a Estéreo Picnic con el parche?',
    //   description: 'Espera noticias pronto.',
    //   image: {
    //     path: '/assets/images/steps/Poker_Step_2.png',
    //     title: 'Sitio no romantico',
    //   },
    //   cta: {
    //     text: '<b>Clic aquí</b>',
    //     href: '#'
    //   }
    // },
    {
      title: 'Rescata a un amigo',
      description: 'Envía esta promo al amigo que el amor te robó',
      image: {
        path: '/assets/images/steps/Poker_Step_3.jpg',
        title: 'Invita a esos amigos que el amor te robó',
      },
      cta: {
        text: '<b>Clic aquí</b>',
        href: '#'
      }
    },
  ];

  constructor() { }

  ngOnInit() { }

  onStepAction(event: MouseEvent, stepNumber: number) {
    event.preventDefault();
      console.log(stepNumber);

    // Se comenta por evento suspendido
    // if (stepNumber == 2) {
    //   document.querySelector('#eventos').scrollIntoView({
    //       behavior: 'smooth'
    //   });
    // }else  {
    //   this.stepAction.emit(stepNumber);
    // }
    this.stepAction.emit(stepNumber == 2?stepNumber+1:stepNumber);
  }

}
