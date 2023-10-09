import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private http = inject(HttpClient);

  constructor() {}

  getLast10Fixtures(leagueId: string, teamId: string) {
    let headers = new HttpHeaders().set(
      'x-rapidapi-key',
      '359203fe2df2a42085dee19dbe500d21',
    );
    headers = headers.append('x-rapidapi-host', 'v3.football.api-sports.io');

    const loc = localStorage.getItem(`fixtures-team-${teamId}`);
    if (loc) {
      const fix = JSON.parse(loc);
      return of(fix);
    }

    return this.http
      .get(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=2023&team=${teamId}&last=10`,
        { headers },
      )
      .pipe(
        tap((fixtures) =>
          localStorage.setItem(
            `fixtures-team-${teamId}`,
            JSON.stringify(fixtures),
          ),
        ),
      );
  }
}
