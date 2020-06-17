export interface ICrumbData {
  type: ECrumbData;
  id: string;
  name: string;
}

export enum ECrumbData {
  HOME,
  COMPETITION,
  EVENT
}
