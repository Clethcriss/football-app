export interface IMatch {
  id: string;
  utcDate: string;
  status: string;
  matchDay: number;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  }
}

export interface IDetailedMatch extends IMatch {
  competition: {
    id: string;
    name: string;
    area: string;
  };
  score: {
    "winner": null,
    "duration": "REGULAR",
    "fullTime": {
      "homeTeam": null,
      "awayTeam": null
    },
    "halfTime": {
      "homeTeam": null,
      "awayTeam": null
    },
    "extraTime": {
      "homeTeam": null,
      "awayTeam": null
    },
    "penalties": {
      "homeTeam": null,
      "awayTeam": null
    }
  }
}
