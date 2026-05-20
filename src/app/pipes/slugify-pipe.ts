import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')                    // décompose les accents (é → e + ́)
      .replace(/[\u0300-\u036f]/g, '')     // supprime les diacritiques
      .replace(/[^a-z0-9\s-]/g, '')       // supprime les caractères spéciaux
      .trim()
      .replace(/\s+/g, '-')               // espaces → tirets
      .replace(/-+/g, '-');               // tirets multiples → un seul
  }
}