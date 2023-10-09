import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, of, tap } from 'rxjs';
import { Standing } from '../league/standing';
import { ApiResponse } from '../response';

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
      const fix: { value: any[]; timestamp: number } = JSON.parse(loc);
      if (this.isLessThanXHoursAgo(fix.timestamp, 24)) {
        console.info('fixture-data from localstorage');
        return of(fix.value);
      }
    }

    return this.http
      .get<ApiResponse<any[]>>(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=2023&team=${teamId}&last=10`,
        { headers },
      )
      .pipe(
        tap((fixtures) =>
          localStorage.setItem(
            `fixtures-team-${teamId}`,
            JSON.stringify({
              value: fixtures.response,
              timestamp: Date.now(),
            }),
          ),
        ),
        map((res) => res.response),
      );
  }

  private isLessThanXHoursAgo(timestamp: number, hours: number) {
    return new Date(timestamp).getTime() > Date.now() - hours * 60 * 60 * 1000;
  }
}
