export interface Planets {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: number;
  population: number;
  residents?: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface GlobalStatePlanets {
  apiResults: Planets[];
  filterResultsByText: (text: string) => void,
  filterResultsByValue: (filters: DataFiltersType) => void
}
export interface DataFiltersType {
  column: string;
  filter: string;
  value: number;
}
