import { Team } from '../team';

export interface Fixture {
  goals: {
    home: number;
    away: number;
  };
  teams: {
    home: Team;
    away: Team;
  };
}
