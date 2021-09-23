import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'onboardingQuiz':
        return 'earn-points-orange.svg';
      case 'userCreated':
        return 'earn-points-orange.svg';
      case 'promocode':
        return 'earn-points-orange.svg';
      case 'promoCuponeraAguila':
        return 'earn-points-orange.svg';
      case 'referralByCode':
        return 'earn-points-orange.svg';
      case 'qrCode':
        return 'earn-points-orange.svg';
      case 'purchase':
        return 'earn-points-orange.svg';
      case 'Games':
        return 'earn-points-orange.svg';
      case 'quiz':
        return 'earn-points-orange.svg';
      case 'invoice':
        return 'earn-points-orange.svg';
      case 'other':
        return 'earn-points-orange.svg';
      case 'maltasMigration':
        return 'earn-points-orange.svg';
      case 'pcr_accumulation':
        return 'earn-points-orange.svg';
      case 'redemption':
        return 'earn-points-black.svg';
      case 'maltasExpiration':
        return 'earn-points-black.svg';
      case 'pcr_redemption':
        return 'earn-points-black.svg';
      case 'tapit_cuponera_product_refund':
        return 'earn-points-orange.svg';
      case 'tapit_cuponera_product_purchase':
        return 'earn-points-black.svg';
      default:
        return '';
    }
  }
}
