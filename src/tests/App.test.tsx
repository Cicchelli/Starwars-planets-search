import { render, screen, waitForElementToBeRemoved, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import GlobalContext from '../context/GlobalContext';
import Table from '../Components/Table';
import { Planets } from '../Types';
import userEvent from '@testing-library/user-event';
import Forms from '../Components/Forms';
import {vi} from 'vitest'
import * as ApiModule from '../utils/FetchApi'
import mockData from './Mocks/mockData.';


beforeEach(()=>{
vi.spyOn(ApiModule, 'fetchApi').mockResolvedValue(mockData.results);
})

afterEach(()=>{
vi.clearAllMocks();
})

 test('teste novo', async() =>{
  render(<App />)

  await waitFor(()=>{
    
    screen.getByRole('cell', {name: 'Tatooine'})
  },{timeout: 10000})

  screen.debug()
 }
  )


// test('Teste geral', () => {
//   const loading = false
//   render(
//     <App />
  
//     );
    
//  const test = screen.getByRole('textbox')
//  expect(test).toBeInTheDocument()
//  const search = screen.getByTestId('name-filter');
//  expect(search).toBeInTheDocument();
//  const filter = screen.getByRole('button', { name: /filter/i });
//  expect(filter).toBeInTheDocument();
// //  const namePlant = screen.getByText('Tatooine')
// //  expect(namePlant).toBeInTheDocument();
//  const terrain = screen.getByText('desert')
//  expect(terrain).toBeInTheDocument();
// } )

test('Verifica os campos existem', () => {
  render(<App />);
  const search = screen.getByTestId('name-filter');
  const inpNumber = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByRole('button', { name: /filter/i });
  

  expect(search).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();

  userEvent.type(inpNumber, '200000');
  userEvent.click(buttonFilter);
  
});

// // ...

test('Teste de filtro por nome', () => {
  const loading = false;
  render(
    
      <App />
    
  );

  const search = screen.getByTestId('name-filter');
  const filterButton = screen.getByRole('button', { name: /filter/i });

  userEvent.type(search, 'Tatooine');
  userEvent.click(filterButton);

  // const planetName = screen.getByText('Tatooine');
  // expect(planetName).toBeInTheDocument();

  // Verifique se os outros planetas não estão visíveis
  const otherPlanetName = screen.queryByText('Alderaan');
  expect(otherPlanetName).not.toBeInTheDocument();
});

test('Teste de filtro por valor', () => {
  const loading = false;
  render(
    
      <App/>
    
  );

  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByRole('button', { name: /filter/i });

  userEvent.type(valueFilter, '200000');
  userEvent.click(filterButton);

    // Verifique se os outros planetas não estão visíveis
  const otherPlanetName = screen.queryByText('Alderaan');
  expect(otherPlanetName).not.toBeInTheDocument();
});





// test('teste final', ()=>{
//   render(<App />)
//   const planets = ['Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino'];
//   const cres = screen.getByLabelText('Crescente');
//   const table = screen.getAllByTestId('planet-name');
  

// }
// )



