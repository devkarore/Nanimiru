import { Component, OnInit, signal } from '@angular/core';
import { AnimeApi } from '../../services/anime-api';
import { AnimeModel, GenreModel, MoodModel, PlatformModel} from '../../models/animeModel';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit {
  
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
  selectedMoodIri: string | undefined;

    // État du chargement
    isLoading = signal<boolean>(false);

    constructor(private monApiService: AnimeApi, private route: ActivatedRoute) {}

    ngOnInit(): void {
      const slug = this.route.snapshot.paramMap.get('slug');

      this.loadMoodsForFilter(slug);
      this.loadGenres();
      this.loadPlatforms();
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

    const genreIri = this.selectedGenreId
      ? `/api/genres/${this.selectedGenreId}`
      : undefined;

    const moodIri = this.selectedMoodIri;
      
    this.isLoading.set(true);
    this.monApiService.getAnimes(this.currentPage, animeIri, genreIri, moodIri).subscribe({
      next: (data) => {
        this.animes.set(data.member);
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

      const selectedMood = data.member.find(mood => mood.slug === slug);

      this.selectedMoodIri = selectedMood?.['@id'];

      this.currentPage = 1;
      this.loadAnimes();
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

  


