import { createContext } from 'react';
import { GlobalStatePlanets } from '../Types';

const GlobalContext = createContext({} as GlobalStatePlanets);

export default GlobalContext;
