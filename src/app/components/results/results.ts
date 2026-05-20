import { Component, OnInit, signal } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { AnimeModel, GenreModel, MoodModel, PlatformModel} from '../../models/animeModel';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterLink } from '@angular/router';

import { combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { SlugifyPipe } from '../../pipes/slugify-pipe';

import { RouteResolution } from '../../models/animeModel';
import { MoodCollection } from '../../models/animeModel';
import { GenreCollection } from '../../models/animeModel';

@Component({
  selector: 'app-results',
  imports: [RouterLink, SlugifyPipe],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit {

    searchTerm: string = '';
  
    animes = signal<AnimeModel[]>([]);
    genres = signal<GenreModel[]>([]);
    moods = signal<MoodModel[]>([]);
    platforms = signal<PlatformModel[]>([]);

      // Les variables qui vont nous aider à paginer
    totalItems: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 12;

      // La variable qui va contenir la valeur du select 
    selectedAnimeId: number | null = null;
    selectedGenreId: number | null = null;
    selectedGenreIri: string | undefined;
    selectedMoodIri: string | undefined;

    // État du chargement
    isLoading = signal<boolean>(false);

    constructor(private monApiService: AnimeApi, private route: ActivatedRoute) {}

    ngOnInit(): void {
      let slug = this.route.snapshot.paramMap.get('slug');

      this.loadMoodsForFilter(slug);
      this.loadGenres();
      this.loadPlatforms();

      // Pour ne déclencher qu'un rechargement à la fois, peu importe si on modifie la mood on le filtre de recherche
      combineLatest([
        this.route.params,
        this.route.queryParamMap
      ]).pipe(
        switchMap(([params, queryParams]) => {
          // On met à jour les états locaux
          this.searchTerm = queryParams.get('search') ?? '';
          this.currentPage = 1;

          const moodSlug = params['slug'];
          const genreSlug = params['genre'];

          if (moodSlug) {
            return this.monApiService.getMoodFromSlug(moodSlug).pipe(
              map((response): RouteResolution => ({ type: 'mood', response }))
            );
          } else if (genreSlug) {
            return this.monApiService.getGenreFromSlug(genreSlug).pipe(
              map((response): RouteResolution => ({ type: 'genre', response }))
            );
          } else {
            return of<RouteResolution>({ type: 'search', response: null });
          }
        })
      ).subscribe({
        next: (data: RouteResolution) => {
            this.selectedMoodIri = undefined;
            this.selectedGenreIri = undefined;

            if (data.type === 'mood' && data.response) {
              const response = data.response as MoodCollection;
              const slug = this.route.snapshot.params['slug'];
              const selectedMood = response.member.find((mood) => mood.slug === slug);
              this.selectedMoodIri = selectedMood?.['@id'];
            } else if (data.type === 'genre' && data.response) {
              const response = data.response as GenreCollection;
              const slug = this.route.snapshot.params['genre'];
              const selectedGenre = response.member.find((genre) => genre.slug === slug);
              console.log(selectedGenre);
              this.selectedGenreIri = selectedGenre?.['@id'];
            }
            this.loadAnimes();
        },
        error: (err) => console.error('Erreur récupération mood IRI', err)
      });
    }

  /********************************************
 * 
 * 
 *                API CALLS
 * 
 * 
 *******************************************/
    // Chargement des Animes
    
    loadGenres(): void {
      this.monApiService.getGenres().subscribe({
        next: (data) => {
          this.genres.set(data.member)
        },
        error: (err) => console.error('Erreur chargement des genres', err)
      });
    }
    loadMoods(): void {
      this.monApiService.getMoods().subscribe({
        next: (data) => {
          this.moods.set(data.member)
        },
        error: (err) => console.error('Erreur chargement des moods', err)
      });
    }
    loadPlatforms(): void {
      this.monApiService.getPlatforms().subscribe({
        next: (data) => {
          this.platforms.set(data.member)
        },
        error: (err) => console.error('Erreur chargement des plateformes', err)
      });
    }

    // Chargement des animés
  loadAnimes(): void {

    // Construction de l'IRI
    const animeIri = this.selectedAnimeId
      ? `/api/animes/${this.selectedAnimeId}`
      : undefined;

    const genreIri = this.selectedGenreIri
      ? this.selectedGenreIri
      : undefined;

    const moodIri = this.selectedMoodIri;
      
    console.log(moodIri);
    this.isLoading.set(true);
    this.monApiService.getAnimes(this.currentPage, animeIri, genreIri, moodIri, undefined, this.searchTerm).subscribe({
      next: (data) => {
        this.animes.set(data.member.filter(anime =>
        anime.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      ));
        this.totalItems = data.totalItems;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des animés', err);
        this.isLoading.set(false);
      }
    });
    
  }

  loadMoodsForFilter(slug: string | null): void {
  this.monApiService.getMoods().subscribe({
    next: (data) => {
      this.moods.set(data.member);

      // const selectedMood = data.member.find(mood => mood.slug === slug);

      // this.selectedMoodIri = selectedMood?.['@id'];

      // this.currentPage = 1;
      // this.loadAnimes();
    },
    error: (err) => console.error('Erreur chargement des moods', err)
  });
}


  /********************************************
   * 
   * 
   *                FILTRES
   * 
   * 
   *******************************************/

  // Méthode lancée dès que le select des animes est modifié
  onAnimeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedAnimeId = value ? Number(value) : null;
    this.currentPage = 1; 
    this.loadAnimes();
  }
  onGenreChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedGenreId = value ? Number(value) : null;
    this.currentPage = 1; 
    this.loadAnimes();
  }

   /********************************************
   * 
   * 
   *                PAGINATION
   * 
   * 
   *******************************************/
  

  goToPage(page: number): void {
    if (page < 1 || page > this.nbPages) return;
    this.currentPage = page;
    this.loadAnimes();
  }

  get nbPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }


    /********************************************
   * 
   * 
   *       AFFICHAGE / GESTION DE CLASSE
   * 
   * 
   *******************************************/

    getMoodIdFromSlug(slug: string | null): number | null {
          switch (slug) {
        case 'cozy':
          return 104;
        case 'feel-good':
          return 105;
        case 'wholesome':
          return 106;
        case 'emotional':
          return 107;
        case 'dark':
          return 108;
        case 'epic':
          return 109;
        case 'relaxing':
          return 110;
        case 'tense':
          return 111;
        default:
          return null;
      }
    }

  // getStockClass(part: Part): string {
  //   if (part.stock === 0) return 'danger';
  //   if (part.stock <= 3) return 'warning';
  //   return 'success';
  // }

  // getStockLabel(part: Part): string {
  //   if (part.stock === 0) return 'Rupture';
  //   if (part.stock <= 3) return `Stock faible (${part.stock})`;
  //   return `En stock (${part.stock})`;
  // }



}

  


