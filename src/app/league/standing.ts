export interface Standing {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
  goalsDiff: number;
  points: number;
}
