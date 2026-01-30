import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page';
import { Header } from './shared/header/header';
import { SearchBar } from './shared/search-bar/search-bar';



export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '', component: Header },
  { path: '', component: SearchBar },
  { path: '**', redirectTo: '' },
];


// une route = une page