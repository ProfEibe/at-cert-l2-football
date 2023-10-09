import { Team } from '../team';

export interface Standing {
  team: Team;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
  goalsDiff: number;
  points: number;
}
