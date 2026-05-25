import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { RouterLink } from '@angular/router';
import { MoodModel } from '../../models/animeModel';




@Component({
  selector: 'app-mood',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mood.html',
  styleUrl: './mood.scss',
})

export class Mood implements OnInit {
  moods = signal<MoodModel[]>([]);

  constructor(private monApiService: AnimeApi) {}

  ngOnInit(): void {
    this.loadMoods();
  }

  loadMoods(): void {
    this.monApiService.getMoods().subscribe({
      next: (data) => {
        this.moods.set(data.member);
      },
      error: (err) => console.error('Erreur chargement des moods', err)
    });
  }
    breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 12
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 16
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20
  }
};
  getMoodCardClass(mood: MoodModel): string {
    return `card Regular shadow ${mood.slug}`;
  }
}
