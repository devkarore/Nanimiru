import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { AnimeAuth } from './services/anime-auth';
import { HttpClient } from '@angular/common/http';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nanimiru');
  constructor(private animeAuth: AnimeAuth) {

    // this.animeAuth.fetchJwtToken().subscribe({
    //   next: () => {},
    //   error: (err) => {
    //     console.error('Impossible de récupérer le JWT:');
    //     console.log(err);
    //   }
    // });
  }
}
