import { Component, OnInit, signal } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { AnimeModel} from '../../models/animeModel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoodBadgeClassPipe } from '../../pipes/mood-badge-class-pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  imports: [RouterLink, MoodBadgeClassPipe, NgClass],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})
export class DetailPage implements OnInit{

  anime = signal<AnimeModel | null>(null);
  
  constructor(private monApiService: AnimeApi, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.monApiService.getAnimeById(Number(id)).subscribe({
      next: (data) => this.anime.set(data),
      error: (err) => console.error('Erreur chargement anime', err)
    });
  }
    
}

  


