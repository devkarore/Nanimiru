import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';



@Component({
  selector: 'app-root',
  imports: [Homepage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nanimiru');
}
