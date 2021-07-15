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
      case 'promoCode':
        return 'Por promo code';
      case 'promoCuponeraAguila':
        return ' Por cupón redimido de Aguila';
      case 'referral':
        return 'Por referir a un amigo';
      case 'qrCode':
        return 'Por QR code';
      case 'purchase':
        return 'Por compra';
      case 'games':
        return 'Por juego ó trivia';
      case 'invoice':
        return 'Por escanear recibo';
      case 'other':
        return 'Por otros';
      case 'redemption':
        return 'Por redención';
      case 'maltasMigration':
        return 'De Maltas a puntos';
      case 'maltasExpiration':
        return 'Por Maltas vencidas';
      default:
        return '';
    }
  }

}
