import { Component } from '@angular/core';
import { SearchBar } from '../../../shared/search-bar/search-bar';
import { SliderMoods } from '../slider-moods/slider-moods';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchBar, SliderMoods],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent {}