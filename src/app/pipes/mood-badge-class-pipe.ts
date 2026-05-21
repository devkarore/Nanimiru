import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moodBadgeClass',
  standalone: true
})
export class MoodBadgeClassPipe implements PipeTransform {

  transform(slug: string): string {
    switch (slug) {
      case 'cozy':
        return 'cozy';
      case 'feel-good':
        return 'feel-good';
      case 'emotional':
        return 'emotional';
      case 'epic':
        return 'epic';
      case 'dark':
        return 'dark';
      case 'relaxing':
        return 'relaxing';
      case 'tense':
        return 'tense';
      case 'wholesome':
        return 'wholesome';
      default:
        return '';
    }
  }
}