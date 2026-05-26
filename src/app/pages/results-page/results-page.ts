import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Results } from '../../components/results/results';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-results-page',
  imports: [Results, Search],
  templateUrl: './results-page.html',
  styleUrl: './results-page.scss',
})
export class ResultsPage implements OnInit {
  activeFilterType: string = '';
  activeFilterValue: string = '';

  moodLabels: Record<string, string> = {
    cozy: 'Cosy',
    'feel-good': 'Feel good',
    emotional: 'Émouvant',
    epic: 'Épique',
    dark: 'Sombre',
    relaxing: 'Relaxant',
    tense: 'Tendu',
    wholesome: 'Bienveillant'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParamMap
    ]).subscribe(([params, queryParams]) => {
      const search = queryParams.get('search');
      const mood = params['slug'];
      const genre = params['genre'];
      const platform = params['platform'];

      this.activeFilterType = '';
      this.activeFilterValue = '';

      if (search) {
        this.activeFilterType = 'Mot-clé';
        this.activeFilterValue = search;
      } else if (mood) {
        this.activeFilterType = 'Moods';
        this.activeFilterValue = this.moodLabels[mood] ?? this.formatLabel(mood);
      } else if (genre) {
        this.activeFilterType = 'Genre';
        this.activeFilterValue = this.formatLabel(genre);
      } else if (platform) {
        this.activeFilterType = 'Plateforme';
        this.activeFilterValue = this.formatLabel(platform);
      }
    });
  }

  formatLabel(value: string): string {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}