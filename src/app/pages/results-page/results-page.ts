import { Component } from '@angular/core';
import { Results } from '../../components/results/results';
import { Search } from "../../components/search/search";


@Component({
  selector: 'app-results-page',
  imports: [Results, Search],
  templateUrl: './results-page.html',
  styleUrl: './results-page.scss',
})
export class ResultsPage {

}
