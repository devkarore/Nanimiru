import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimeCollection } from '../models/animeModel';
import { GenreCollection } from '../models/animeModel';
import { MoodCollection } from '../models/animeModel';
import { PlatformCollection } from '../models/animeModel';




@Injectable({
  providedIn: 'root',
})
export class AnimeApi {

  private baseUrl: string = "https://127.0.0.1:8000/api/";
  // (api angular) private baseUrl: string = "http://api-nanimiru.loc:8080/";


  constructor(private http: HttpClient) {}

  // sendEmail(formValues: FormData) {
  //   return this.http.post(`${this.baseUrl}ticketing.php`, formValues, { 
  //     responseType: 'text' 
  //   });
  // }
  
  // getImageKitsu(title: string): string {
  //   const urlImage = `https://kitsu.io/api/edge/anime?filter[text]=${title}`;
  //   return urlImage;
  // }

  getAnimes(page: number = 1, animeIri?: string, genreIri?: string, moodIri?: string, platformIri?: string): Observable<AnimeCollection> {
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

    return this.http.get<AnimeCollection>(`${this.baseUrl}animes`, { params });
  }
  getGenres(): Observable<GenreCollection> {
    return this.http.get<GenreCollection>(`${this.baseUrl}genres`);
  }
  getMoods(): Observable<MoodCollection> {
    return this.http.get<MoodCollection>(`${this.baseUrl}moods`);
  }
  getPlatforms(): Observable<PlatformCollection> {
    return this.http.get<PlatformCollection>(`${this.baseUrl}platforms`);
  }
}
