import { useContext } from 'react';
import { Planets } from '../Types';
import GlobalContext from '../context/GlobalContext';
import Forms from './Forms';

export default function Table() {
  const { apiResults } = useContext(GlobalContext);

  return (
    <>
      <Forms />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {apiResults.map((result: Planets) => (
            <tr key={ result.name }>
              {/* <td>{result.name}</td> */}
              <td data-testid="planet-name">{result.name}</td>
              <td>{result.rotation_period}</td>
              <td>{result.orbital_period}</td>
              <td>{result.diameter}</td>
              <td>{result.gravity}</td>
              <td>{result.climate}</td>
              <td>{result.terrain}</td>
              <td>{result.surface_water}</td>
              <td>{result.population}</td>
              <td>{result.films.map((film) => film)}</td>
              <td>{result.created}</td>
              <td>{result.edited}</td>
              <td>{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
