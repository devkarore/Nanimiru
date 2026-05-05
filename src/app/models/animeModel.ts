export interface AnimeModel {

    id: number;
    title: string;
    synopsis: string;
    year: number;
    imageUrl: string;
    thumbnailUrl: string;    
    ageRating: number;   
    type:string;
    episode: number;
    genres: GenreModel[];
    moods: MoodModel[];
    platforms: PlatformModel[]; 
}


export interface GenreModel {

    id: number;
    name: string;  
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
