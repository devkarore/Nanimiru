import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { ResultsPage } from './pages/results-page/results-page';
import { DetailPage } from './pages/detail-page/detail-page';






export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'results/:slug', component: ResultsPage },
    { path: 'results', component: ResultsPage }
    // { path: 'detail', component: DetailPage },
];


// une route = une page