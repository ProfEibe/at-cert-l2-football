import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

interface Standings {
  parameters: { league: string; season: string };
  response: any[];
}

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private http = inject(HttpClient);

  constructor() {}

  getStanding(id: string): Observable<Standings> {
    let headers = new HttpHeaders().set(
      'x-rapidapi-key',
      '359203fe2df2a42085dee19dbe500d21',
    );
    headers = headers.append('x-rapidapi-host', 'v3.football.api-sports.io');

    const loc = localStorage.getItem(`standings${id}`);
    if (loc) {
      const sta: Standings = JSON.parse(loc);
      return of(sta);
    }

    return this.http
      .get<Standings>(
        `https://v3.football.api-sports.io/standings?league=${id}&season=2023`,
        { headers },
      )
      .pipe(
        tap((standings) =>
          localStorage.setItem(
            `standings${standings.parameters.league}`,
            JSON.stringify(standings),
          ),
        ),
      );
  }
}
