import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeDocument'
})
export class TypeDocumentPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'COL_CC':
        return 'Cédula de ciudadanía';
      case 'COL_CE':
        return 'Cédula de extranjería';
      default:
        return 'Otro';
    }
  }

}
