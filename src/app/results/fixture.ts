interface Team {
  name: string;
  logo: string;
}

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
