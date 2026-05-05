import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-search',
  imports: [RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchTerm = '';

  constructor(private router: Router) {}

  onSearch() {
    this.router.navigate(['/results'], {
      queryParams: { search: this.searchTerm }
    });
  }
}