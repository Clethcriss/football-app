export interface ICompetition {
  id: number;
  area: {
    id: number;
    name: string;
  };
  name: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
}
