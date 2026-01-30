import { Component } from '@angular/core';
import { SearchBar } from '../../../shared/search-bar/search-bar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent {}