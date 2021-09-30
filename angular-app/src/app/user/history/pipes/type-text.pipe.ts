import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeText'
})
export class TypeTextPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'onboardingQuiz':
        return 'Por onboarding quiz';
      case 'userCreated':
        return 'Por registro en Tap It';
      case 'promocode':
        return 'Por promo code';
      case 'promoCuponeraAguila':
        return ' Por cupón redimido de Aguila';
      case 'referralByCode':
        return 'Por referir a un amigo';
      case 'qrCode':
        return 'Por QR code';
      case 'purchase':
        return 'Por compra';
      case 'Games':
        return 'Por juego ó trivia';
      case 'quiz':
        return 'Por juego ó trivia';
      case 'invoice':
        return 'Por escanear recibo';
      case 'other':
        return 'Por otros';
      case 'redemption':
        return 'Por redención';
      case 'maltasMigration':
        return 'De Maltas a puntos';
      case 'pcr_accumulation':
        return 'Por servicio al cliente';
      case 'maltasExpiration':
        return 'Por Maltas vencidas';
      case 'pcr_redemption':
        return 'Por servicio al cliente';
      case 'tapit_cuponera_product_refund':
        return 'Por otros conceptos';
      case 'tapit_cuponera_product_purchase':
        return 'Por otros conceptos';
      case 'redemtionModoOn':
        return 'Por canjear una promoción';
      default:
        return '';
    }
  }
}
