import { Routes } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  {
    path: ':id',
    component: LeagueComponent,
  },
  {
    path: ':id/:team',
    component: ResultsComponent,
  },
];
