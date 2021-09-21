import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIcon'
})
export class TypeIconPipe implements PipeTransform {
//cases
  transform(value: string): string {
    switch (value) {
      case 'onboardingQuiz':
        return 'starship.svg';
      case 'userCreated':
        return 'starship.svg';
      case 'promoCode':
        return 'ticket.svg';
      case 'promoCuponeraAguila':
        return 'ticket.svg';  
      case 'referral':
        return 'users.svg';
      case 'qrCode':
        return 'qrcode.svg';
      case 'purchase':
        return 'cart.svg';
      case 'games':
        return 'trophy.svg';
      case 'invoice':
        return 'invoice.svg';
      case 'other':
        return 'heart.svg';
      case 'maltasMigration':
        return 'check.svg';
      case 'redemption':
        return 'close.svg';
      case 'maltasExpiration':
        return 'close.svg';
      case 'tapit_cuponera_product_refund':
        return 'heart.svg';
      case 'tapit_cuponera_product_purchase':
        return 'heart.svg';
      default:
        return '';
    }
  }
}
