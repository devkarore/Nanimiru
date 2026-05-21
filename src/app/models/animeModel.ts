export interface AnimeModel {

    id: number;
    title: string;
    synopsis: string;
    year: number;
    imageUrl: string;
    thumbnailUrl: string;    
    ageRating: number;   
    type:string;
    nbEpisodes: number;
    genres: GenreModel[];
    moods: MoodModel[];
    platforms: PlatformModel[]; 
}


export interface GenreModel {
    '@id': string;
    id: number;
    name: string;  
    slug: string;  
}


export interface MoodModel {
    '@id': string;
    id: number;
    slug: string;
    label: string;
    imageUrl: string;
    description: string;

}


export interface PlatformModel {

    id: number;
    name: string;
    iconUrl: string;
    imageUrl: string;      
}


export interface AnimeCollection {
  member: AnimeModel[];
  totalItems: number;
}

export interface GenreCollection {
  member: GenreModel[];
  totalItems: number;
}

export interface MoodCollection {
  member: MoodModel[];
  totalItems: number;
}

export interface PlatformCollection {
  member: PlatformModel[];
  totalItems: number;
}

export interface RouteResolution {
  type: 'mood' | 'genre' | 'search';
  response: MoodCollection | GenreCollection | null;
}