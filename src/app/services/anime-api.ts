import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimeCollection } from '../models/animeModel';
import { GenreCollection } from '../models/animeModel';
import { MoodCollection } from '../models/animeModel';
import { PlatformCollection } from '../models/animeModel';
import { AnimeAuth } from './anime-auth';




@Injectable({
  providedIn: 'root',
})
export class AnimeApi {

  private apiUrl: string = "https://127.0.0.1:8000/api/";
  

  constructor(private http: HttpClient, private monAuthService: AnimeAuth) {}

    getAnimes(page: number = 1, animeIri?: string, genreIri?: string, moodIri?: string, platformIri?: string, search?: string): Observable<AnimeCollection> {
    let params = new HttpParams().set('page', page);

    if (animeIri) {
      params = params.set('animes', animeIri);
    }
    if (genreIri) {
      params = params.set('genres', genreIri);
    }

    if (moodIri) {
      params = params.set('moods', moodIri);
    }
    if (platformIri) {
      params = params.set('platforms', platformIri);
    }
    if (search) {
      params = params.set('title', search);
    }

    return this.http.get<AnimeCollection>(`${this.apiUrl}animes`, { params });
  }
  getGenres(): Observable<GenreCollection> {
    return this.http.get<GenreCollection>(`${this.apiUrl}genres`);
  }
  getMoods(): Observable<MoodCollection> {
    return this.http.get<MoodCollection>(`${this.apiUrl}moods`);
  }
  getPlatforms(): Observable<PlatformCollection> {
    return this.http.get<PlatformCollection>(`${this.apiUrl}platforms`);
  }
}
