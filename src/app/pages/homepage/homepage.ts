import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Search } from '../../components/search/search';
import { Mood } from '../../components/mood/mood';
import { Suggestions } from '../../components/suggestions/suggestions';
import { Footer } from '../../components/footer/footer';
import { Results } from '../../components/results/results';




@Component({
  selector: 'app-homepage',
  imports: [Navbar, Search, Mood, Suggestions, Results, Footer],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {

}
