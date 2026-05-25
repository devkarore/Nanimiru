import { Component, OnInit, signal } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { AnimeModel} from '../../models/animeModel';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { MoodBadgeClassPipe } from '../../pipes/mood-badge-class-pipe';
import { NgClass, Location } from '@angular/common';
import { SlugifyPipe } from '../../pipes/slugify-pipe';

@Component({
  selector: 'app-detail-page',
  imports: [RouterLink, MoodBadgeClassPipe, NgClass, SlugifyPipe],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})
export class DetailPage implements OnInit{

  anime = signal<AnimeModel | null>(null);
  
  constructor(private monApiService: AnimeApi, private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.monApiService.getAnimeById(Number(id)).subscribe({
      next: (data) => this.anime.set(data),
      error: (err) => console.error('Erreur chargement anime', err)
    });
  }
  
  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
    
}

  


