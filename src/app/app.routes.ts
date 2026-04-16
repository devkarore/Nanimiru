import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
// import { Results } from './components/results/results';
import { ResultsPage } from './pages/results-page/results-page';





export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'results/:slug', component: ResultsPage }
];


// une route = une page