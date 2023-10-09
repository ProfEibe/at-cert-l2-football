import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Standing } from './standing';
import { ApiResponse } from '../response';

interface StandingResponse {
  league: {
    standings: Standing[][];
  };
}

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private http = inject(HttpClient);
  private headers: HttpHeaders;
  private api = 'https://v3.football.api-sports.io';

  constructor() {
    this.headers = new HttpHeaders().set(
      'x-rapidapi-key',
      '359203fe2df2a42085dee19dbe500d21',
    );
    this.headers = this.headers.append(
      'x-rapidapi-host',
      'v3.football.api-sports.io',
    );
  }

  getStandings(leagueId: string): Observable<Standing[]> {
    return this.getCurrentSeason(leagueId).pipe(
      switchMap((season) => this.getCurrentStanding(leagueId, season)),
    );
  }

  getCurrentSeason(leagueId: string): Observable<string> {
    // try to fetch current season from local storage if it is newer than 24h
    const locSeason = localStorage.getItem(`current-season-${leagueId}`);
    if (locSeason) {
      const cs: { value: string; timestamp: number } = JSON.parse(locSeason);
      if (this.isLessThanXHoursAgo(cs.timestamp, 24)) {
        console.info('season-data from localstorage');
        return of(cs.value);
      }
    }

    // else fetch current season from API
    return this.http
      .get<ApiResponse<any[]>>(
        `${this.api}/leagues?id=${leagueId}&current=true`,
        { headers: this.headers },
      )
      .pipe(
        map((res: ApiResponse<any[]>) => {
          console.log(res);
          return res.response[0].seasons[0].year.toString();
        }),
        tap((cs) => {
          localStorage.setItem(
            `current-season-${leagueId}`,
            JSON.stringify({ value: cs, timestamp: Date.now() }),
          );
        }),
      );
  }

  getCurrentStanding(leagueId: string, season: string) {
    // try to fetch standings from local storage if they are newer than 24h
    const loc = localStorage.getItem(`standings-${leagueId}-${season}`);
    if (loc) {
      const cl: { value: Standing[]; timestamp: number } = JSON.parse(loc);
      if (this.isLessThanXHoursAgo(cl.timestamp, 24)) {
        console.info('league-data from localstorage');
        return of(cl.value);
      }
    }

    // else fetch standings from API
    return this.http
      .get<ApiResponse<StandingResponse[]>>(
        `${this.api}/standings?league=${leagueId}&season=${season}`,
        {
          headers: this.headers,
        },
      )
      .pipe(
        map((apiRes) => apiRes.response[0] as StandingResponse),
        tap((standings) =>
          localStorage.setItem(
            `standings-${leagueId}-${season}`,
            JSON.stringify({
              value: standings.league.standings[0],
              timestamp: Date.now(),
            }),
          ),
        ),
        map((standings) => standings.league.standings[0]),
      );
  }

  private isLessThanXHoursAgo(timestamp: number, hours: number) {
    return new Date(timestamp).getTime() > Date.now() - hours * 60 * 60 * 1000;
  }
}
