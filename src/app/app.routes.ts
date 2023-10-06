import { Routes } from '@angular/router';
import { LeagueComponent } from './league/league.component';

export const routes: Routes = [
  {
    path: ':id',
    component: LeagueComponent,
  },
];
