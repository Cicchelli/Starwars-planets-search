export interface Planets {
  [key:string]:string | string[] | number;
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: number | string;
  population: number | string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface GlobalStatePlanets {
  apiResults: Planets[];
  filterResultsByText: (text: string) => void, // filPlanets
  filterResultsByValue: (filters: DataFiltersType) => void // modificar filterPerFilter
  loading:boolean
  setApiResults: React.Dispatch<React.SetStateAction<Planets[]>>
}
export interface DataFiltersType {
  column: string;
  filter: string;
  value: number;
}
