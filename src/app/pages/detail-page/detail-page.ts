import { Component, OnInit, signal } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { AnimeModel, GenreModel, MoodModel, PlatformModel} from '../../models/animeModel';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  imports: [RouterLink],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})
export class DetailPage {

  animes = signal<AnimeModel[]>([]);
  
  constructor(private monApiService: AnimeApi, private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.loadAnimes(slug);
   }

  loadAnimes(slug: string | null): void {
    if (slug) {
      this.monApiService.getAnimes(1, slug).subscribe(response => {
        this.animes.set(response.member);
      });
    }
  }

}
